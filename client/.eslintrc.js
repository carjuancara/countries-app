module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['standard'],
  ignorePatterns: ['dist'],
  parser: '@typescript-eslint/parser',
  plugins: ['react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  }
}
