/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lilita: ["Lilita One", "sans-serif"],
      },
    },
  },
  plugins: [],
}
