"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, LoaderCircle, Plus } from "lucide-react";
import type { Profile } from "@/lib/portfolio";
import { requestSound } from "@/components/experience/audio-engine";
import {
  CONTACT_LIMITS,
  contactFieldErrors,
  contactSchema,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/contact";

type FormStatus = "idle" | "sending" | "success" | "submitted" | "error";
const emptyForm = { name: "", email: "", message: "", website: "" };

function ConversationDrawing() {
  return (
    <div className="contact-drawing" aria-hidden="true">
      <svg viewBox="0 0 300 180" fill="none">
        <path
          className="contact-drawing__orbit"
          d="M24 92C24 31 111 20 177 30C244 39 290 77 266 119C245 157 162 165 102 146C52 130 24 113 24 92Z"
        />
        <path
          className="contact-drawing__signal"
          d="M24 92C24 31 111 20 177 30C244 39 290 77 266 119C245 157 162 165 102 146C52 130 24 113 24 92Z"
          pathLength="100"
        />
        <g className="contact-drawing__back">
          <rect x="69" y="45" width="104" height="70" rx="14" />
          <path d="M89 69H148M89 81H130M89 93H142" />
        </g>
        <g className="contact-drawing__front">
          <path d="M130 76H217C225 76 231 82 231 90V130C231 138 225 144 217 144H162L139 157V144H130C122 144 116 138 116 130V90C116 82 122 76 130 76Z" />
          <path
            d="M151 110L165 123L195 95"
            className="contact-drawing__check"
          />
        </g>
      </svg>
      <span>A conversation. A possibility.</span>
    </div>
  );
}

export function ContactSection({
  profile,
}: {
  profile: Pick<Profile, "location" | "email" | "socials">;
}) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [feedback, setFeedback] = useState("");
  const activeRequest = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      activeRequest.current?.abort();
    };
  }, []);

  function updateField(field: ContactField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "idle" && status !== "sending") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeRequest.current) return;
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const nextErrors = contactFieldErrors(result.error);
      setErrors(nextErrors);
      setStatus("error");
      setFeedback("Please check the highlighted fields.");
      const firstField = Object.keys(nextErrors)[0];
      const input = firstField
        ? formRef.current?.elements.namedItem(firstField)
        : null;
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 40_000);
    setErrors({});
    setStatus("sending");
    setFeedback("");
    try {
      let response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: controller.signal,
      });
      let payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
        fields?: ContactFieldErrors;
        code?: string;
        endpoint?: string;
      } | null;
      if (!mounted.current) return;
      if (response.status === 503 && payload?.code === "direct_contact" &&
          payload.endpoint === "https://zayed-portfolio-app.netlify.app/api/send-mail") {
        const endpoint = payload.endpoint;
        // New Node deployments offer a readable receipt to this specific origin.
        // An empty capability check never transmits or retries the inquiry.
        const receiptAvailable = await fetch(endpoint, {
          credentials: "omit", signal: controller.signal,
        }).then(async (reply) => reply.ok && (await reply.json()).receipt === true)
          .catch(() => false);
        response = await fetch(endpoint, {
          method: "POST",
          mode: receiptAvailable ? "cors" : "no-cors",
          credentials: "omit",
          redirect: receiptAvailable ? "error" : "follow",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(result.data),
          signal: controller.signal,
        });
        if (!mounted.current) return;
        if (response.type === "opaque") {
          setStatus("submitted");
          setFeedback("Submission requested. The mail service could not confirm delivery here. Your draft is still on this page.");
          return;
        }
        payload = await response.json().catch(() => null);
        if (!mounted.current) return;
      }
      if (response.ok && payload?.success === true) {
        setStatus("success");
        setFeedback("Message sent successfully.");
        setForm(emptyForm);
        requestSound("confirmation");
      } else {
        setStatus("error");
        setFeedback(
          payload?.message ||
            "Your message could not be sent. Please email me directly.",
        );
        if (payload?.fields) setErrors(payload.fields);
      }
    } catch {
      if (!mounted.current) return;
      setStatus("error");
      setFeedback(
        "I couldn’t send your message just now. Your draft is still here—try again or email me directly.",
      );
    } finally {
      window.clearTimeout(timeout);
      activeRequest.current = null;
      if (mounted.current)
        setStatus((current) => (current === "sending" ? "idle" : current));
    }
  }

  return (
    <section
      id="contact"
      className="contact-section"
      data-theme="dark"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="contact-topline" data-reveal>
          <span>Open to developer opportunities</span>
          <span>{profile.location}</span>
        </div>
        <div className="contact-layout">
          <div className="contact-intro" data-reveal>
            <h2 id="contact-heading" className="contact-heading">
              Let’s talk
              <br />
              <span className="serif">about your</span>
              <br />
              team.
            </h2>
            <p className="contact-description">
              Hiring a full-stack developer? I’d be glad to discuss the role,
              your product, and how I can contribute to the team.
            </p>
            <ConversationDrawing />
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="contact-socials" aria-label="Social profiles">
              {profile.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                  <Plus size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            className="contact-form"
            onSubmit={submit}
            noValidate
            data-reveal
            aria-busy={status === "sending"}
          >
            <div className="contact-form__heading">
              <span>Discuss an opportunity</span>
              <p>A little about the role and your team.</p>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="What should I call you?"
                maxLength={CONTACT_LIMITS.name}
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                disabled={status === "sending"}
              />
              {errors.name && (
                <span id="contact-name-error" className="contact-field__error">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@company.com"
                maxLength={CONTACT_LIMITS.email}
                required
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                disabled={status === "sending"}
              />
              {errors.email && (
                <span id="contact-email-error" className="contact-field__error">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">About the role</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Tell me about the position, your tech stack, and the team…"
                maxLength={CONTACT_LIMITS.message}
                minLength={10}
                required
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message
                    ? "contact-message-error"
                    : "contact-message-note"
                }
                disabled={status === "sending"}
              />
              {errors.message ? (
                <span
                  id="contact-message-error"
                  className="contact-field__error"
                >
                  {errors.message}
                </span>
              ) : (
                <span id="contact-message-note" className="contact-field__note">
                  A few sentences are a great start.
                </span>
              )}
            </div>
            <div className="contact-honeypot" aria-hidden="true" inert>
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                value={form.website}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    website: event.target.value,
                  }))
                }
              />
            </div>
            <button
              type="submit"
              className="button button--primary contact-submit"
              disabled={status === "sending" || status === "submitted"}
            >
              <span>
                {status === "sending"
                  ? "Sending your message"
                  : status === "submitted"
                    ? "Submission requested"
                    : status === "success"
                    ? "Message sent"
                    : "Send message"}
              </span>
              <span className="button__icon" aria-hidden="true">
                {status === "sending" ? (
                  <LoaderCircle className="contact-spinner" size={20} />
                ) : status === "success" ? (
                  <Check size={20} />
                ) : (
                  <Plus size={20} />
                )}
              </span>
            </button>
            <div
              className="contact-feedback"
              data-visible={Boolean(feedback)}
              data-status={status}
            >
              <div>
                <p role="status" aria-live="polite" aria-atomic="true">
                  {feedback}
                </p>
                {status === "error" && (
                  <a href={`mailto:${profile.email}`}>Email me directly</a>
                )}
              </div>
            </div>
            <p className="contact-form__privacy">
              Your details are used only to respond to your inquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
