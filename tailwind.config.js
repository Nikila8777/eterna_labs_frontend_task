/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        textPrimary: "#F1F5F9",
        textSecondary: "#94A3B8",
        surface: "#0D1526",
        surfaceLight: "#1A2333",
        border: "#1E293B",
        highlight: "#3B82F6",
      },
    },
  },
  plugins: [],
};
