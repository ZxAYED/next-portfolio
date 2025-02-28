import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const InterFont = Inter({
  subsets: ["latin"],
  variable: "--font-I",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zayed's Portfolio",
  description: "Zayed's portfolio app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/logo.png" sizes="any" />
      <body className={`${InterFont.variable}  antialiased`}>{children}</body>
    </html>
  );
}
