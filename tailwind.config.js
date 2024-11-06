/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', 'index.html'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fdf2f4',
          100: '#fde6e9',
          800: '#800020',
          900: '#600018',
        },
      },
    },
  },
  plugins: [require('daisyui'),],
}

