import ClientCursor from "@/components/shared/ClientCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070a12",
};

export const metadata: Metadata = {
  title: "Zayed | Full Stack Engineer & UI Architect",
  description:
    "Portfolio of Zayed — Full Stack Software Engineer specializing in high-performance Next.js web applications, TypeScript, Node.js, Nest.js, and distributed backend systems.",
  keywords: [
    "Zayed",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Nest.js",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "Portfolio",
  ],
  authors: [{ name: "Zayed Iqbal" }],
  creator: "Zayed Iqbal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zayed.me",
    title: "Zayed | Full Stack Engineer & UI Architect",
    description:
      "Engineering digital products with speed, scalability, and craftsmanship. Explore case studies and technical architecture.",
    siteName: "Zayed's Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dhl04adhz/image/upload/v1747754112/next-portfolio/portfolio.png.png",
        width: 1200,
        height: 630,
        alt: "Zayed Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zayed | Full Stack Engineer & UI Architect",
    description:
      "Engineering digital products with speed, scalability, and craftsmanship.",
    images: [
      "https://res.cloudinary.com/dhl04adhz/image/upload/v1747754112/next-portfolio/portfolio.png.png",
    ],
  },
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = "dark";

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-[#070a12] text-slate-100 selection:bg-purple-500/30 selection:text-cyan-200">
        <ThemeProvider initialTheme={theme}>
          <ClientCursor />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
            toastStyle={{
              backgroundColor: "#0f172a",
              color: "#e2e8f0",
              border: "1px solid #334155",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}