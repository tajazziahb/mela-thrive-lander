/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', 'index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',

        pink: {
          500: '#ec4899',
          300: '#f9a8d4'
        },

        purple: {
          300: '#d8b4fe',
        },

        gray: {
          300: '#9ca3af'
        }
      },
    },
  },
  plugins: [require('daisyui'),],
}

