import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        body: "15px",
        base: "15px",
        sm: "10px",
        lg: "20px",
        xl: "24px",
        "2xl": "28px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "58px",
      },
    },
  },
  plugins: [],
};
export default config;
