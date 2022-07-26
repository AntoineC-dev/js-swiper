/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/main.ts", "./src/**/*.ts"],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
};
