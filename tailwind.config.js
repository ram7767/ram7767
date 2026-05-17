/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        brand: {
          50: "#e6f2ff",
          100: "#cce5ff",
          200: "#99cbff",
          300: "#66b1ff",
          400: "#3398ff",
          500: "#007AFF",
          600: "#0062cc",
          700: "#004999",
          800: "#003166",
          900: "#001833",
        },
        accent: {
          orange: "#FF9500",
          cyan: "#22d3ee",
          pink: "#FF9500",
          violet: "#8b5cf6",
        },
        ink: {
          0: "#ffffff",
          50: "#f4f5fb",
          100: "#e6e8f3",
          200: "#c5c9dd",
          300: "#9ea3bf",
          400: "#6f7595",
          500: "#4b5170",
          600: "#2f3450",
          700: "#1d2138",
          800: "#121530",
          900: "#0b0b18",
        },
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(900px 500px at 15% 0%, rgba(0,122,255,0.14) 0%, transparent 65%), radial-gradient(800px 500px at 90% 10%, rgba(255,149,0,0.10) 0%, transparent 65%)",
        "brand-gradient":
          "linear-gradient(135deg, #007AFF 0%, #FF9500 100%)",
      },
      boxShadow: {
        glass:
          "0 8px 32px 0 rgba(8, 8, 24, 0.45), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        glow: "0 0 0 1px rgba(0,122,255,0.28), 0 10px 30px -10px rgba(255,149,0,0.55)",
      },
      backdropBlur: {
        xs: "4px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-20px,20px) scale(0.97)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shine: "shine 6s linear infinite",
        blob: "blob 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
