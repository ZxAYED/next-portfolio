import {
  contactSchema,
  contactFieldErrors,
  CONTACT_LIMITS,
} from "../src/lib/contact";
import { readPayload } from "../src/lib/read-contact-payload";

export const endpoint = "https://zayed-portfolio-app.netlify.app/api/send-mail";
const recent = new Map<string, { count: number; until: number }>();

function error(message: string, status: number) {
  return Response.json({ success: false, message }, { status });
}

export async function forwardContact(request: Request, send = fetch) {
  if (request.method !== "POST")
    return error("Please submit the contact form.", 405);
  const origin = request.headers.get("origin");
  if (
    (origin && origin !== new URL(request.url).origin) ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return error("Please submit the form from this portfolio.", 403);
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .includes("application/json")
  )
    return error("Please send a JSON contact request.", 415);
  let data: unknown;
  try {
    data = await readPayload(request, CONTACT_LIMITS.payloadBytes);
  } catch (e) {
    return error(
      "Please check your message and try again.",
      e instanceof RangeError ? 413 : 400,
    );
  }
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success)
    return Response.json(
      {
        success: false,
        fields: contactFieldErrors(parsed.error),
        message: "Please check the highlighted fields.",
      },
      { status: 400 },
    );
  const now = Date.now();
  for (const [key, value] of recent) if (value.until <= now) recent.delete(key);
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const bucket = recent.get(ip) ?? { count: 0, until: now + 600_000 };
  if (bucket.count >= 5 || (!recent.has(ip) && recent.size >= 2000))
    return error("Please wait a few minutes before trying again.", 429);
  bucket.count++;
  recent.set(ip, bucket);
  // Check reachability with a deliberately empty payload before forwarding a
  // visitor's message. Only this pre-send failure can safely use another path.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    let reachable = false;
    try {
      const probe = await send(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
        redirect: "error",
        signal: controller.signal,
      });
      const reply = await probe.json();
      reachable = probe.status === 400 && reply.success === false;
    } catch {
      // No visitor data has left the Worker.
    }
    if (!reachable)
      return Response.json({ success: false, code: "direct_contact", endpoint }, { status: 503 });
    const response = await send(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      redirect: "error",
      signal: controller.signal,
    });
    const result = await response.json();
    // The original archive also returned success for demo mode. Accept only
    // the delivery messages from the original and current Nodemailer handlers.
    if (
      response.ok &&
      result.success === true &&
      [
        "Message transmitted successfully",
        "Your message is on its way. Thank you for reaching out.",
      ].includes(result.message)
    )
      return Response.json({ success: true });
    if (response.status === 429)
      return error("Please wait a few minutes before trying again.", 429);
  } catch {
    /* Keep upstream responses and visitor details private. */
  } finally {
    clearTimeout(timeout);
  }
  return error(
    "Your message could not be sent. Your draft is still here. Please email me directly.",
    503,
  );
}
