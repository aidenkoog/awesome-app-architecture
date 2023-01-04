module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['prettier', 'airbnb-base'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
