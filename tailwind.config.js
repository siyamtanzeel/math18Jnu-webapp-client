/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
      bengali: ["Noto Serif Bengali", "serif"],
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#0ea5e9",
          secondary: "#e11d48",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#0ea5e9",
          secondary: "#e11d48",
        },
      },
    ],
  },
};
