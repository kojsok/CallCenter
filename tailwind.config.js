/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        appBg: "var(--appBg)", //dark theme: #000319
        secondaryBg: "#253662",
        primary: {
          main: "#0ea5e9",
          light: "#1455967d",
          dark: "#6366f1",
        },
      },
      textColor: {
        app: "var(--textColor)", //dark theme: #ffffff
        second: "#7c8fac",
      },
    },
  },
  plugins: [],
};
