module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        'over-map': 500,
      },
      height: {
        max: 'max-content',
      },
      boxShadow: {
        default: 'rgba(0, 0, 0, 0.12) 0px 6px 20px',
        hover: 'rgba(0, 0, 0, 0.2) 0px 6px 20px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
