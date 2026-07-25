import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1622",
          soft: "#142233",
          muted: "#5A6B7D",
          faint: "#8A97A6",
        },
        canvas: {
          DEFAULT: "#E8EEF4",
          warm: "#DEE6EF",
          deep: "#CDD7E3",
          white: "#F5F8FB",
        },
        signal: {
          DEFAULT: "#1E7AD8",
          deep: "#155FAF",
          bright: "#3B95F0",
        },
        steel: {
          DEFAULT: "#1A2B3D",
          light: "#5A6B7D",
        },
        chrome: {
          black: "#0B1622",
          white: "#F5F8FB",
          gray: {
            100: "#E8EEF4",
            200: "#CDD7E3",
            400: "#8A97A6",
            600: "#5A6B7D",
            900: "#142233",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        jp: ["var(--font-noto-jp)", "var(--font-dm-sans)", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3.75rem, 13vw, 9.5rem)",
          { lineHeight: "0.88", letterSpacing: "-0.045em", fontWeight: "800" },
        ],
        "display-lg": [
          "clamp(2.5rem, 6vw, 4.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        "display-md": [
          "clamp(1.85rem, 3.6vw, 2.85rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "fade-up": "fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "ken-burns": "ken-burns 22s ease-out forwards",
        "slow-drift": "slow-drift 28s ease-in-out infinite alternate",
        "scale-in": "scale-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-line": "pulse-line 2.4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        "slow-drift": {
          "0%": { transform: "scale(1.04) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.1) translate3d(-1.5%, -1%, 0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-line": {
          "0%, 100%": { opacity: "0.35", transform: "scaleY(0.7)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      transitionTimingFunction: {
        outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
