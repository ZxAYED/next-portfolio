'use client'
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";
import { Bounce, ToastContainer } from "react-toastify";
import Loading from "./loading";

const MoskFont = {
    fontFamily: "Mosk, sans-serif",
};

export default function App({
    children,
    theme
}: {
    children: React.ReactNode;
    theme: "light" | "dark"
}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" sizes="any" />
            </head>
            <body className={`${MoskFont} antialiased`}>
                <ThemeProvider initialTheme={theme}>
                    <AnimatedCursor
                        innerSize={10}
                        outerSize={35}
                        color="147, 51, 234"
                        outerAlpha={0.4}
                        innerScale={0.9}
                        outerScale={1.5}
                    />
                    {loading ? <Loading /> : children}
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
