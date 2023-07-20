module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-refresh/only-export-components': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-unused-expressions': 'error',
    'no-console': 'warn',
    'no-undef': 'error',
  },
  globals: {
    process: 'readonly',
  },
};
