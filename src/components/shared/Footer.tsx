"use client";

import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import PrimaryButton from "./PrimaryButton";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

const initialFormData: ContactFormState = {
  name: "",
  email: "",
  message: "",
};

const socialLinks = [
  {
    href: "https://github.com/ZxAYED",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/zayed-iqbal",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://www.facebook.com/ZxAYED/",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://www.instagram.com/zzayed0",
    label: "Instagram",
    icon: Instagram,
  },
] as const;

export default function Footer() {
  const [formData, setFormData] = useState<ContactFormState>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (response.ok && payload.success === true) {
        toast.success(
          "Message transmitted successfully! I will reach out shortly.",
        );
        setFormData(initialFormData);
      } else {
        toast.error(
          "Transmission failed. Please reach out directly via email.",
        );
      }
    } catch (error) {
      console.error("Footer form submission failed:", error);
      toast.error("Transmission failed. Please reach out directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="contact"
      className="relative z-10 w-full overflow-hidden pt-36 pb-16 md:pt-40 lg:min-h-[900px]"
    >
      {/* Background Image: Brightened by 40% with balanced ambient contrast */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="https://res.cloudinary.com/dhl04adhz/image/upload/v1787228448/footer_myexvj.jpg"
          alt="Footer Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        {/* Softened darkening overlays (40% brighter) */}
        <div className="absolute inset-0 bg-[#070b14]/35 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/70 via-transparent to-[#070b14]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14]/50 via-transparent to-[#070b14]/50" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#070b14] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#070b14] to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-[#9333EA] via-purple-300 to-[#3B82F6] bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm font-light leading-relaxed text-gray-300 sm:text-base md:text-lg">
            Share the product, the constraints, and the timeline. I&apos;ll
            reply with a practical path forward.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-md border border-white/10 bg-[#0a1120] p-6 shadow-2xl sm:p-8 md:p-9">
              <div className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full bg-[#3B82F6]/10 blur-3xl" />

              <form onSubmit={handleSubmit} className="relative space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Connor"
                    className="w-full rounded-md border border-white/10 bg-[#060c18] px-4 py-3 text-sm text-white shadow-inner outline-none transition-all placeholder:text-gray-400 autofill:shadow-[inset_0_0_0_1000px_#060c18] autofill:[-webkit-text-fill-color:#fff] focus:border-cyan-400 focus:bg-[#070e1b] focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@enterprise.com"
                    className="w-full rounded-md border border-white/10 bg-[#060c18] px-4 py-3 text-sm text-white shadow-inner outline-none transition-all placeholder:text-gray-400 autofill:shadow-[inset_0_0_0_1000px_#060c18] autofill:[-webkit-text-fill-color:#fff] focus:border-cyan-400 focus:bg-[#070e1b] focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-gray-300">
                    Project Details / Inquiry
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your product requirements, tech stack, and timeline..."
                    className="w-full resize-none rounded-md border border-white/10 bg-[#060c18] px-4 py-3 text-sm text-white shadow-inner outline-none transition-all placeholder:text-gray-400 autofill:shadow-[inset_0_0_0_1000px_#060c18] autofill:[-webkit-text-fill-color:#fff] focus:border-cyan-400 focus:bg-[#070e1b] focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <PrimaryButton
                  type="submit"
                  disabled={isSubmitting}
                  title={isSubmitting ? "Transmitting..." : "Send Message"}
                  icon={
                    isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )
                  }
                  className="mt-2 w-full !rounded-md py-2.5 text-sm font-medium"
                />
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end lg:pt-60 xl:pt-72">
            <div className="grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2 lg:max-w-[490px]">
              <div className="flex min-h-[72px] items-center gap-3 rounded-md border border-white/10 bg-[#0a1120] px-3.5 py-2.5 text-left shadow-lg transition-all duration-300 group hover:border-cyan-400/40 hover:bg-[#0d1629]">
                <div className="rounded-md border border-white/10 bg-[#060c18] p-2.5 text-cyan-300 transition-colors group-hover:bg-cyan-500/20 group-hover:text-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-300">
                    Location
                  </p>
                  <p className="text-sm font-medium text-white">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <a
                href="mailto:zzayediqbalofficial@gmail.com"
                className="flex min-h-[72px] items-center gap-3 rounded-md border border-white/10 bg-[#0a1120] px-3.5 py-2.5 text-left shadow-lg transition-all duration-300 group hover:border-cyan-400/40 hover:bg-[#0d1629]"
              >
                <div className="rounded-md border border-white/10 bg-[#060c18] p-2.5 text-cyan-300 transition-colors group-hover:bg-cyan-500/20 group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-300">
                    Email
                  </p>
                  <p className="truncate text-xs sm:text-sm font-medium text-white" title="zzayediqbalofficial@gmail.com">
                    zzayediqbalofficial@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+8801902320296"
                className="flex min-h-[72px] items-center gap-3 rounded-md border border-white/10 bg-[#0a1120] px-3.5 py-2.5 text-left shadow-lg transition-all duration-300 group hover:border-cyan-400/40 hover:bg-[#0d1629]"
              >
                <div className="rounded-md border border-white/10 bg-[#060c18] p-2.5 text-cyan-300 transition-colors group-hover:bg-cyan-500/20 group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-300">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-white">
                    +880 1902-320296
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/zayed-iqbal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[72px] items-center gap-3 rounded-md border border-white/10 bg-[#0a1120] px-3.5 py-2.5 text-left shadow-lg transition-all duration-300 group hover:border-cyan-400/40 hover:bg-[#0d1629]"
              >
                <div className="rounded-md border border-white/10 bg-[#060c18] p-2.5 text-cyan-300 transition-colors group-hover:bg-cyan-500/20 group-hover:text-white">
                  <Linkedin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-300">
                    LinkedIn
                  </p>
                  <p className="truncate text-sm font-medium text-white">
                    in/zayed-iqbal
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-xs font-mono text-gray-300 sm:flex-row">
          <p>&copy; 2026 Zayed. All rights reserved.</p>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-lg p-2 transition-all hover:bg-white/10 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
