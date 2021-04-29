module.exports = {
  plugins: ['styled-components-a11y'],
  extends: ['plugin:styled-components-a11y/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': 0,
  },
};
