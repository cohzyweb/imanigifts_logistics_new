import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00442d",
        "primary-dark": "#0f5d41",
        "on-primary": "#fff9eb",
        accent: "#8cd4b0",
        secondary: "#506357",
        background: "#fff9eb",
        surface: "#fff9eb",
        "surface-variant": "#f0ede4",
        "surface-container": "#f2ecd9",
        "surface-container-low": "#faf3df",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e4dbc0",
        "surface-container-highest": "#dbd2b5",
        highlight: "#fdf4d3",
        "highlight-deep": "#ebe3c2",
        "highlight-mid": "#f1e8c8",
        "on-surface": "#1f1c08",
        "on-surface-variant": "#506357",
        outline: "#506357",
        error: "#ba1a1a",
      },
      fontFamily: {
        headline: ["var(--font-manrope)", "ui-sans-serif", "sans-serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "sans-serif"],
        label: ["var(--font-inter)", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
