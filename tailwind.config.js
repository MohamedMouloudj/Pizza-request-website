/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      colors: {
        pizza: {
          100: "#f8f1f0",
          200: "#f1e3e1",
          300: "#e9d4d2",
          400: "#dcb6b4",
          500: "#cf9896",
          600: "#b28380",
          700: "#8c6566",
          800: "#5e4343",
          900: "#2f2121",
        },
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
