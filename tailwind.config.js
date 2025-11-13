/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add this block to define 'font-dm'
      fontFamily: {
        'dm': ['"DM Sans"', 'sans-serif']
      },
    },
  },
  plugins: [],
}