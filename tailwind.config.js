module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      padding: (theme) => ({
        ...theme('spacing'),
        full: '100%',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
