const { spacing, fontFamily } = require('tailwindcss/defaultTheme');

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
        sans: ['Raleway Sans', ...fontFamily.sans],
        // heading: ['Poppins', 'sans-serif'],
        heading: ['Raleway Sans', ...fontFamily.sans],
      },
      colors: {
        gray: {
          0: '#fff',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[12],
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
