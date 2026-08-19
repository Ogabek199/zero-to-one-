import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette (sampled from the design)
        brand: {
          red: "#C43B45",
          "red-dark": "#B2333C",
          black: "#0D0D0D",
          gray: "#F0F0F0",
          "gray-line": "#111111",
          muted: "#8A8A8A",
        },
      },
      fontFamily: {
        // Heavy geometric display for headings, humanist sans for body
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        // Site container width
        shell: "1440px",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
