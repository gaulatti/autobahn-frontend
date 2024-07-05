/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'radio-canada': ['"Radio Canada"', 'sans-serif'],
      },
      colors: {
        'gray-900': '#111',
        'gray-600': '#999',
      },
      spacing: {
        4: '1rem',
      },
    },
  },
  variants: {
    extend: {
      margin: ['last'],
    },
  },
  plugins: [],
};
