import ClientCursor from "@/components/shared/ClientCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import type { Metadata } from "next";
import { Bounce, ToastContainer } from "react-toastify";
import "./globals.css";

const MoskFont = {
  fontFamily: "Mosk, sans-serif",
};

export const metadata: Metadata = {
  title: "Zayed's Portfolio",
  description: "Zayed's portfolio app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = "dark";

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" sizes="any" />
      </head>
      <body style={MoskFont} className="antialiased">
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