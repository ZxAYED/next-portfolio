import assert from "node:assert/strict";
import { test } from "node:test";
import { forwardContact } from "../sites/contact";

function inquiry() {
  return new Request("https://portfolio.example/api/send-mail", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Test",
      email: "test@example.com",
      message: "A portfolio inquiry.",
    }),
  });
}

test("Sites forwards validated inquiries to the owner's endpoint", async () => {
  const response = await forwardContact(inquiry(), async (url, options) => {
    assert.equal(url, "https://zayed-portfolio-app.netlify.app/api/send-mail");
    assert.equal(options?.method, "POST");
    if (options?.body === "{}") return Response.json({ success: false }, { status: 400 });
    return Response.json({
      success: true,
      message: "Message transmitted successfully",
    });
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
});

test("the original archive's demo success and unavailable endpoints preserve an error", async () => {
  const demo = await forwardContact(inquiry(), async (_url, options) =>
    options?.body === "{}" ? Response.json({ success: false }, { status: 400 }) : Response.json({
      success: true,
      message: "Message received (Demo mode — email configuration pending)",
    }),
  );
  assert.equal(demo.status, 503);
  assert.equal((await demo.json()).code, undefined);
  const offline = await forwardContact(inquiry(), async (_url, options) => {
    assert.equal(options?.body, "{}");
    throw new Error("Unavailable");
  });
  assert.equal(offline.status, 503);
  assert.equal((await offline.json()).code, "direct_contact");
});

test("an ambiguous failure after forwarding never instructs the form to resend", async () => {
  const result = await forwardContact(inquiry(), async (_url, options) => {
    if (options?.body === "{}") return Response.json({ success: false }, { status: 400 });
    throw new Error("No response");
  });
  assert.equal(result.status, 503);
  assert.equal((await result.json()).code, undefined);
});
