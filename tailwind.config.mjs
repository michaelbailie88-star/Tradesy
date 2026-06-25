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
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
        },
        accent: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        success: "#059669",
        warning: "#D97706",
        error: "#DC2626",
        info: "#0284C7",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        badge: "4px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        "card-elevated": "0 4px 12px rgba(0,0,0,0.12)",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};