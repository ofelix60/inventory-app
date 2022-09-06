/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      primary: '#202225',
      secondary: '#5865f2',
    },
  },
  plugins: [],
};
