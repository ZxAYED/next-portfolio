import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import nodemailer from "nodemailer";
import { NextRequest } from "next/server";
import {
  buildContactEmail,
  CONTACT_LIMITS,
  contactFieldErrors,
  contactSchema,
  escapeHtml,
} from "../src/lib/contact";
import { POST } from "../src/app/api/send-mail/route";

const inquiry = {
  name: "Alex Example",
  email: "alex@example.com",
  message: "I would like to discuss a web application.",
};

test("contact validation trims a valid message and defaults the honeypot", () => {
  const result = contactSchema.parse({
    name: "  Alex Example  ",
    email: " alex@example.com ",
    message: `  ${inquiry.message}  `,
  });
  assert.deepEqual(result, { ...inquiry, website: "" });
});

test("empty fields and malformed email return errors for each visible field", () => {
  const result = contactSchema.safeParse({
    name: " ",
    email: "not-an-email",
    message: "short",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    const errors = contactFieldErrors(result.error);
    assert.equal(errors.name, "Please add your name.");
    assert.ok(errors.email);
    assert.ok(errors.message);
    assert.equal(Object.keys(errors).length, 3);
  }
});

test("a name cannot inject a newline into an email subject", () => {
  assert.equal(
    contactSchema.safeParse({
      ...inquiry,
      name: "Alex\r\nBcc: someone@example.com",
    }).success,
    false,
  );
});

test("header control characters are rejected", () => {
  for (const name of [
    "Alex\u0000Example",
    "Alex\tExample",
    "Alex\u007fExample",
  ]) {
    assert.equal(contactSchema.safeParse({ ...inquiry, name }).success, false);
  }
});

test("values of the wrong type and a null request are rejected", () => {
  assert.equal(
    contactSchema.safeParse({ ...inquiry, name: { value: "Alex" } }).success,
    false,
  );
  assert.equal(contactSchema.safeParse(null).success, false);
});

test("name and message bounds are enforced at their boundary", () => {
  assert.equal(
    contactSchema.safeParse({
      ...inquiry,
      name: "x".repeat(CONTACT_LIMITS.name),
      message: "x".repeat(CONTACT_LIMITS.message),
    }).success,
    true,
  );
  assert.equal(
    contactSchema.safeParse({
      ...inquiry,
      name: "x".repeat(CONTACT_LIMITS.name + 1),
    }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({
      ...inquiry,
      message: "x".repeat(CONTACT_LIMITS.message + 1),
    }).success,
    false,
  );
});

test("an overlong email address is rejected", () => {
  assert.equal(
    contactSchema.safeParse({
      ...inquiry,
      email: `${"a".repeat(CONTACT_LIMITS.email)}@example.com`,
    }).success,
    false,
  );
});

test("filled honeypot is rejected without revealing an invisible field error", () => {
  const result = contactSchema.safeParse({
    ...inquiry,
    website: "https://spam.example",
  });
  assert.equal(result.success, false);
  if (!result.success) assert.deepEqual(contactFieldErrors(result.error), {});
});

test("the sender cannot supply a recipient or arbitrary mail options", () => {
  assert.equal(
    contactSchema.safeParse({ ...inquiry, to: "other@example.com" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...inquiry, attachments: [] }).success,
    false,
  );
});

test("email HTML escapes all HTML delimiters", () => {
  assert.equal(
    escapeHtml(`<a title="x">Tom & 'Jerry'</a>`),
    "&lt;a title=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/a&gt;",
  );
});

test("HTML message safely preserves line breaks and an honest plain-text alternative", () => {
  const input = contactSchema.parse({
    ...inquiry,
    name: "Alex & Co",
    message: '<script>alert("test")</script>\nA second line.',
  });
  const result = buildContactEmail(input);
  assert.ok(result.html.includes("Alex &amp; Co"));
  assert.ok(
    result.html.includes(
      "&lt;script&gt;alert(&quot;test&quot;)&lt;/script&gt;<br />A second line.",
    ),
  );
  assert.equal(result.html.includes("<script>"), false);
  assert.ok(result.text.includes(input.message));
  assert.deepEqual(result.replyTo, { name: input.name, address: input.email });
  assert.equal("to" in result, false);
  assert.equal("from" in result, false);
});

test("payload budget includes a fully escaped Unicode message within the field limit", () => {
  const serialized = JSON.stringify({
    ...inquiry,
    message: "\u0000".repeat(CONTACT_LIMITS.message),
  });
  assert.ok(
    Buffer.byteLength(serialized, "utf8") < CONTACT_LIMITS.payloadBytes,
  );
});

// All transport creation is intercepted. These tests cannot send real mail.
function mailHarness(
  context: TestContext,
  options: { configured?: boolean; accepted?: string[]; fail?: boolean } = {},
) {
  const keys = [
    "EMAIL_USER",
    "EMAIL_PASS",
    "EMAIL_TO",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_SECURE",
  ];
  const previous = new Map(keys.map((key) => [key, process.env[key]]));
  keys.forEach((key) => {
    delete process.env[key];
  });
  context.after(() =>
    previous.forEach((value, key) => {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }),
  );
  if (options.configured) {
    process.env.EMAIL_USER = "sender@example.com";
    process.env.EMAIL_PASS = "test-only-placeholder";
    process.env.EMAIL_TO = "owner@example.com";
  }
  const sendMail = context.mock.fn(async (mail: Record<string, unknown>) => {
    if (options.fail) throw new Error("Simulated SMTP failure");
    return { accepted: options.accepted ?? [mail.to] };
  });
  const close = context.mock.fn();
  const createTransport = context.mock.method(
    nodemailer,
    "createTransport",
    () =>
      ({ sendMail, close }) as unknown as ReturnType<
        typeof nodemailer.createTransport
      >,
  );
  context.mock.method(console, "error", () => {});
  return { sendMail, close, createTransport };
}

let requestSequence = 0;
function contactRequest(payload: unknown, headers?: Record<string, string>) {
  requestSequence += 1;
  return new NextRequest("https://portfolio.example/api/send-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `203.0.113.${requestSequence}`,
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

test("a valid request returns503 when SMTP is unconfigured, never demo success", async (context) => {
  const transport = mailHarness(context);
  const response = await POST(contactRequest(inquiry));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
  assert.equal(transport.createTransport.mock.callCount(), 0);
});

test("invalid, cross-site and non-JSON requests are rejected before transport creation", async (context) => {
  const transport = mailHarness(context);
  assert.equal(
    (await POST(contactRequest({ ...inquiry, message: "short" }))).status,
    400,
  );
  assert.equal(
    (await POST(contactRequest({ ...inquiry, website: "bot.example" }))).status,
    400,
  );
  assert.equal(
    (await POST(contactRequest(inquiry, { "sec-fetch-site": "cross-site" })))
      .status,
    403,
  );
  assert.equal(
    (await POST(contactRequest(inquiry, { "Content-Type": "text/plain" })))
      .status,
    415,
  );
  assert.equal(transport.createTransport.mock.callCount(), 0);
});

test("oversized request streams return413", async (context) => {
  const transport = mailHarness(context);
  assert.equal(
    (
      await POST(
        contactRequest({
          ...inquiry,
          message: "x".repeat(CONTACT_LIMITS.payloadBytes),
        }),
      )
    ).status,
    413,
  );
  assert.equal(transport.createTransport.mock.callCount(), 0);
});

test("mail uses server-controlled sender and recipient and succeeds only after transport acceptance", async (context) => {
  const transport = mailHarness(context, { configured: true });
  const response = await POST(contactRequest(inquiry));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  const mail = transport.sendMail.mock.calls[0].arguments[0];
  assert.equal(mail.to, "owner@example.com");
  assert.deepEqual(mail.from, {
    name: inquiry.name,
    address: "sender@example.com",
  });
  assert.deepEqual(mail.replyTo, {
    name: inquiry.name,
    address: inquiry.email,
  });
  assert.equal(transport.close.mock.callCount(), 1);
});

test("SMTP rejection reports failure and closes the transport", async (context) => {
  const transport = mailHarness(context, { configured: true, accepted: [] });
  const response = await POST(contactRequest(inquiry));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).success, false);
  assert.equal(transport.close.mock.callCount(), 1);
});

test("SMTP errors do not expose internal responses or credentials", async (context) => {
  const transport = mailHarness(context, { configured: true, fail: true });
  const response = await POST(contactRequest(inquiry));
  assert.equal(response.status, 502);
  const body = await response.text();
  assert.equal(body.includes("Simulated SMTP failure"), false);
  assert.equal(body.includes("test-only-placeholder"), false);
  assert.equal(transport.close.mock.callCount(), 1);
});

test("a burst of contact requests is rate limited before sending more mail", async (context) => {
  const transport = mailHarness(context, { configured: true });
  const headers = { "x-forwarded-for": "198.51.100.100" };
  for (let index = 0; index < 5; index += 1)
    assert.equal((await POST(contactRequest(inquiry, headers))).status, 200);
  const limited = await POST(contactRequest(inquiry, headers));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "600");
  assert.equal(transport.sendMail.mock.callCount(), 5);
});
