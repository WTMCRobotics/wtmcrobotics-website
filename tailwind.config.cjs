/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],

  plugins: [require("flowbite/plugin")],

  darkMode: "media",

  theme: {
    extend: {
      colors: {
        // Robotics Red
        primary: {
          50: "#feebee",
          100: "#fdcdd2",
          200: "#ec9b9b",
          300: "#e17474",
          400: "#ea5553",
          500: "#ef463a",
          600: "#e13f39",
          700: "#ce3533",
          800: "#c12f2c",
          900: "#b22621",
        },

        // True gray (not blueish)
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
    },
  },
};

module.exports = config;
