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
  authors: [{ name: "Zayed Iqbal" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zayed Iqbal",
    title: "Zayed Iqbal — Full Stack Developer",
    description:
      "Full-stack developer open to new opportunities. Explore real projects, technical skills, and experience across the software development lifecycle.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-active-theme="dark" suppressHydrationWarning>
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
