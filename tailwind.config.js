/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.35)",
        "light-color": "#f5abe9",
        "medium-color": "#cc74be",
        "dark-color": "#d14dbc",
      },
    },
  },
  plugins: [],
};
