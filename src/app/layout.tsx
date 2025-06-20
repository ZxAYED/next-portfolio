import { ThemeProvider } from "@/components/theme/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import AnimatedCursor from "react-animated-cursor";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get("theme")?.value as "light" | "dark") || "dark";

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" sizes="any" />
      </head>
      <body className={`${InterFont.variable} antialiased`}>
        <ThemeProvider initialTheme={theme}>
          <AnimatedCursor
            innerSize={10}
            outerSize={35}
            color="147, 51, 234"
            outerAlpha={0.4}
            innerScale={0.9}
            outerScale={1.5}
          />
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
