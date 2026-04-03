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
        primary: "#00442d",
        "on-primary": "#fff9eb",
        secondary: "#506357",
        background: "#fff9eb",
        surface: "#fff9eb",
        "surface-variant": "#f0ede4",
        "surface-container": "#f2ecd9",
        "surface-container-low": "#faf3df",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e4dbc0",
        "surface-container-highest": "#dbd2b5",
        "on-surface": "#1f1c08",
        "on-surface-variant": "#506357",
        outline: "#506357",
        error: "#ba1a1a",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
