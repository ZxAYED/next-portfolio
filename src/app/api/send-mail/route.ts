import { readPayload } from "@/lib/read-contact-payload";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  buildContactEmail,
  CONTACT_LIMITS,
  contactFieldErrors,
  contactSchema,
} from "@/lib/contact";

export const runtime = "nodejs";

const requests = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function rateLimit(key: string) {
  const now = Date.now();
  for (const [address, entry] of requests) {
    if (entry.resetAt <= now) requests.delete(address);
  }
  const entry = requests.get(key);
  if (entry && entry.count >= MAX_REQUESTS) return false;
  // This bounded, per-instance safeguard complements the host's global limits.
  if (!entry && requests.size >= 1000)
    requests.delete(requests.keys().next().value!);
  requests.set(key, {
    count: (entry?.count ?? 0) + 1,
    resetAt: entry?.resetAt ?? now + WINDOW_MS,
  });
  return true;
}

function failure(
  message: string,
  status: number,
  fields?: Record<string, string>,
) {
  return NextResponse.json({ success: false, message, fields }, { status });
}

const sitesOrigin = "https://zayed-iqbal-techquell-portfolio.flowy-bun-1694.chatgpt.site";

export function GET(request: NextRequest) {
  if (request.headers.get("origin") !== sitesOrigin)
    return failure("Please submit the contact form.", 405);
  return NextResponse.json({ receipt: true }, {
    headers: { "Access-Control-Allow-Origin": sitesOrigin, Vary: "Origin", "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  const fromHostedPortfolio = request.headers.get("origin") === sitesOrigin;
  const response = await sendMessage(request, fromHostedPortfolio);
  if (fromHostedPortfolio) {
    response.headers.set("Access-Control-Allow-Origin", sitesOrigin);
    response.headers.append("Vary", "Origin");
  }
  return response;
}

async function sendMessage(request: NextRequest, fromHostedPortfolio: boolean) {
  if (request.headers.get("sec-fetch-site") === "cross-site" && !fromHostedPortfolio) {
    return failure(
      "Please send your message from the portfolio contact form.",
      403,
    );
  }
  const type = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (type !== "application/json" && !(fromHostedPortfolio && type === "text/plain")) {
    return failure("Please send a JSON contact request.", 415);
  }

  let payload: unknown;
  try {
    payload = await readPayload(request, CONTACT_LIMITS.payloadBytes);
  } catch (error) {
    return failure(
      error instanceof RangeError
        ? "Your message is too large."
        : "Please check your message and try again.",
      error instanceof RangeError ? 413 : 400,
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return failure(
      "Please check the highlighted fields.",
      400,
      contactFieldErrors(parsed.error),
    );
  }

  const user = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASS;
  const recipient = process.env.EMAIL_TO || user;
  if (!user || !password) {
    return failure(
      "The contact form is temporarily unavailable. Please email me directly.",
      503,
    );
  }

  const requestKey =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unavailable";
  if (!rateLimit(requestKey)) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please wait a few minutes before sending another message, or email me directly.",
      },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  if (host && (!Number.isInteger(port) || port < 1 || port > 65535)) {
    return failure(
      "The contact form is temporarily unavailable. Please email me directly.",
      503,
    );
  }

  const transporter = nodemailer.createTransport({
    ...(host
      ? {
          host,
          port,
          secure: process.env.SMTP_SECURE
            ? process.env.SMTP_SECURE === "true"
            : port === 465,
        }
      : { service: "gmail" }),
    auth: { user, pass: password },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });

  try {
    const result = await transporter.sendMail({
      from: { name: parsed.data.name, address: user },
      to: recipient,
      ...buildContactEmail(parsed.data),
    });
    if (!result.accepted?.length) throw new Error("Message not accepted");
    return NextResponse.json({
      success: true,
      message: "Your message is on its way. Thank you for reaching out.",
    });
  } catch (error) {
    // Never expose SMTP credentials, server responses, or visitor messages.
    console.error("Portfolio mail delivery failed", {
      type: error instanceof Error ? error.name : "UnknownError",
      ...(process.env.NODE_ENV === "development" && error instanceof Error
        ? { message: error.message }
        : {}),
    });
    return failure(
      "Your message could not be sent. Please try again or email me directly.",
      502,
    );
  } finally {
    transporter.close();
  }
}
