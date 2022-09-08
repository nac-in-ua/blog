const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Roboto', 'sans-serif'],
        sans: ['Raleway Sans', ...defaultTheme.fontFamily.sans],
        // heading: ['Poppins', 'sans-serif'],
        heading: ['Raleway Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
