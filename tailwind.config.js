/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        "main": "#04356B",
      },
    },
  },
  plugins: [require("daisyui")],
};
