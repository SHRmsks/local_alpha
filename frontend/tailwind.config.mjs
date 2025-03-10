/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "iper-blue": "#124A9D",
                "iper-white": "#F9F4E9",
            },
            fontFamily: {
                krub: ["Krub", "sans-serif"],
            },
        },
    },
    plugins: [],
};
