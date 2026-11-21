import { z } from "zod";

export const CONTACT_LIMITS = {
  name: 100,
  email: 150,
  message: 5000,
  payloadBytes: 32_768,
} as const;

export const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Please add your name.")
      .max(CONTACT_LIMITS.name, "Please keep your name under 100 characters.")
      .refine(
        (value) => !/[\u0000-\u001f\u007f]/.test(value),
        "Please enter a valid name.",
      ),
    email: z
      .string()
      .trim()
      .max(CONTACT_LIMITS.email, "Please enter a valid email address.")
      .email("Please enter a valid email address."),
    message: z
      .string()
      .trim()
      .min(10, "Tell me a little more—at least 10 characters.")
      .max(
        CONTACT_LIMITS.message,
        "Please keep your message under 5,000 characters.",
      ),
    // Invisible to visitors, deliberately empty for legitimate submissions.
    website: z.string().max(0, "Please try again.").optional().default(""),
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "message";
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function contactFieldErrors(error: z.ZodError): ContactFieldErrors {
  const fields: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      (field === "name" || field === "email" || field === "message") &&
      !fields[field]
    )
      fields[field] = issue.message;
  }
  return fields;
}

export function escapeHtml(value: string): string {
  const replacements: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (character) => replacements[character]);
}

export function buildContactEmail(input: ContactInput) {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const message = escapeHtml(input.message).replace(/\r?\n/g, "<br />");
  return {
    subject: `💌 New Portfolio Message from ${input.name}`,
    replyTo: { name: input.name, address: input.email },
    text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    html: `
        <div style="
          background: linear-gradient(135deg, #1E1B2E, #0F172A);
          color: #F3F4F6;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 30px;
          border-radius: 12px;
          border: 1px solid #9333EA33;
          max-width: 600px;
          margin: 20px auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        ">
          <h2 style="
            text-align: center;
            background: linear-gradient(90deg, #9333EA, #3B82F6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 24px;
            margin-bottom: 20px;
          ">
            ✨ New Message from Portfolio
          </h2>

          <div style="margin-bottom: 20px;">
            <p style="font-size: 15px; line-height: 1.6; margin: 6px 0;">
              <strong style="color: #A855F7;">Sender:</strong> ${name}
            </p>
            <p style="font-size: 15px; line-height: 1.6; margin: 6px 0;">
              <strong style="color: #A855F7;">Email:</strong> <a href="mailto:${email}" style="color:#60A5FA;text-decoration:none;">${email}</a>
            </p>
          </div>

          <div style="
            background: #111827;
            border-radius: 8px;
            padding: 16px;
            border-left: 4px solid #9333EA;
            margin-bottom: 20px;
          ">
            <p style="font-size: 15px; line-height: 1.8; color: #E5E7EB; margin: 0;">
              ${message}
            </p>
          </div>

          <p style="text-align:center; font-size:12px; color:#9CA3AF; margin-top: 24px;">
            Transmitted securely via Zayed's Portfolio Contact Form.
          </p>
        </div>
      `,
  };
}
