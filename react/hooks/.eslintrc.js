module.exports = {
  'extends': [
    'react-app',
    'eslint:recommended',
  ],
  'plugins': ['react-hooks'],
  'rules': {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'semi': 'error',
    'quotes': ['error', 'single']
  },
}