/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff6b00",
        secondary: "#22c55e",
        surface: "#171a1e",
        "surface-low": "#111318",
        "surface-high": "#1d2025",
        "surface-bright": "#292c32",
        "text-dim": "#848995",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 107, 0, 0.2)",
        premium: "0 20px 40px rgba(0, 0, 0, 0.4)",
        luxe: "0 20px 40px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
