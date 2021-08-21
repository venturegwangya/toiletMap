module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        'side-menu-open': 'calc(50% + 12rem)',
      },
      zIndex: {
        'over-map': 1010,
        'over-menu': 1020,
      },
      height: {
        max: 'max-content',
      },
      boxShadow: {
        default: 'rgba(0, 0, 0, 0.12) 0px 6px 20px',
        hover: 'rgba(0, 0, 0, 0.2) 0px 6px 20px',
      },
      translate: {
        twice: '200%',
        'neg-300': '-300%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
