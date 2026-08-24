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
      animation: {
        shimmer: "shimmer 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-150%) skewX(-15deg)" },
          "100%": { transform: "translateX(250%) skewX(-15deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.88", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
