module.exports = {
  extends: ['alloy', 'alloy/react'],
  plugins: ['react-hooks'],
  env: {
    browser: true,
    jest: true,
  },
  globals: {},
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
