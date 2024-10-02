/** @type {import('tailwindcss').Config} */
export default {
  // content: [],
  content: [ "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {
    extend: {
      colors: {
        'primary-color': '#000319',
      },
    },
  },
  plugins: [],
}

