/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    extend: {
      borderRadius: {
        primary: '24px',
        secondary: '8px',
        tertiary: '4px'
      },
      colors: {},
      fontFamily: {},
      backgroundImage: {},
      gridTemplateColumns: {},
      gridTemplateRows: {},
      gridTemplateAreas: {}
    },
    screens: {
      '2xl': { max: '1536px' },
      xl: { max: '1280px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '600px' }
    }
  },
  plugins: []
};
