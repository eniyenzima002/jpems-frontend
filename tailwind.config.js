/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "permanent": ["Permanent Marker", "sans-serif"],
        "shadows": ["Shadows Into Light", "sans-serif"]
      }
    },
  },
  plugins: [],
}
