import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {

            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Merriweather", "serif"]
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
                "3xl": "2rem"
            }
        }
    },
    plugins: []
} satisfies Config;
