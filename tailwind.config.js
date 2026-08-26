/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        propolis: {
          green: "#2D5A27",
          light: "#4A7C40",
          dark: "#1A3A18",
        },
        honey: {
          amber: "#D4A853",
          dark: "#A67C2A",
        },
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        display: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
