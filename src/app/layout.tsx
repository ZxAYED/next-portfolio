import type { Metadata, Viewport } from "next";
import "@fontsource-variable/big-shoulders-display";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import "@/styles/motion.css";
import "@/styles/navigation.css";
import "@/styles/brand.css";
import "@/styles/process.css";
import "@/styles/personal.css";
import "@/styles/projects.css";
import "@/styles/resume.css";
import "@/styles/contact.css";
import "@/styles/login.css";
import { BrandIntro } from "@/components/experience/BrandIntro";
import { siteUrl } from "@/lib/site-url";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101014",
};
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zayed Iqbal — Full Stack Developer",
    template: "%s · Zayed Iqbal",
  },
  description:
    "Zayed Iqbal is a full-stack developer in Dhaka, Bangladesh, working with Next.js, TypeScript, Node.js, and NestJS. Explore his projects, experience, and developer skills.",
  keywords: [
    "Zayed Iqbal",
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript",
    "NestJS",
    "React Developer",
    "Software Developer",
    "Dhaka Bangladesh",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Zayed Iqbal", url: siteUrl }],
  creator: "Zayed Iqbal",
  publisher: "Zayed Iqbal",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zayed Iqbal",
    title: "Zayed Iqbal — Full Stack Developer",
    description:
      "Full-stack developer open to new opportunities. Explore real projects, technical skills, and experience across the software development lifecycle.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zayed Iqbal — Full Stack Developer",
    description:
      "Full-stack developer open to new opportunities. Explore real projects, technical skills, and experience across the software development lifecycle.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Zayed Iqbal",
      jobTitle: "Full Stack Developer",
      url: siteUrl,
      image: `${siteUrl}/images/portfolio.webp`,
      email: "zzayediqbalofficial@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "Bangladesh",
      },
      sameAs: [
        "https://github.com/ZxAYED",
        "https://www.linkedin.com/in/zayed-iqbal",
        "https://www.facebook.com/ZxAYED/",
      ],
      knowsAbout: [
        "Next.js",
        "TypeScript",
        "React",
        "Node.js",
        "NestJS",
        "GSAP",
        "Full Stack Development",
        "REST APIs",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Zayed Iqbal — Full Stack Developer",
      description:
        "Personal portfolio of Zayed Iqbal, full-stack developer specializing in Next.js, TypeScript, and NestJS.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-active-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <BrandIntro />
        {children}
      </body>
    </html>
  );
}
