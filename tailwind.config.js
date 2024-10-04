/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      xs: "0px",
      // => @media (min-width: 0px) { ... }
      sm: "600px",
      // => @media (min-width: 600px) { ... }
      md: "900px",
      // => @media (min-width: 900px) { ... }
      lg: "1200px",
      // => @media (min-width: 1200px) { ... }
      xl: "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        appBg: "var(--appBg)",
        secondaryBg: "var(--secondaryBg)",
        primary: {
          main: "var(--primary-main)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
        },
      },
      textColor: {
        app: "var(--textApp)",
        second: "var(--text-second)",
      },
    },
  },
  plugins: [],
};
