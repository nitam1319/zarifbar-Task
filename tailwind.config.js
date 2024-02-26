/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {

    extend: {
      colors: {
        dark_bg: '#2b3743',
        dark_bg2: '#202d36',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}