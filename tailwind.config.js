/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "picasso-gold": "#c9a227",
        "picasso-black": "#0a0a0a",
        "picasso-gray": "#f5f5f5",
      },
    },
  },
  plugins: [],
}