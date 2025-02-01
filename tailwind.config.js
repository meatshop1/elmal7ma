/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kufam: ["Kufam", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        gmono: ["Geist Mono", "monospace"],
        square: ["Nova Square", "serif"],
      },
      colors: {
        // Add your custom colors here
        'primary': '#8E1616', 
        'secondary': '#D84040',
        'accent': '#EEEEEE', 
        'custom': '#1D1616',
        'custom-light': '#2E2E2E', 
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

