/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        gelasio: ["'Gelasio'", "serif"],
        caveat: ["'Caveat'", "sans-serif"],
        montserrat: ["'Montserrat'", "sans-serif"]

      },
    },
  },
  plugins: [],
}
