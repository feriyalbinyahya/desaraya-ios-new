module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  env: {
      'react-native/react-native': true,
  },
  rules: {
    'no-console': 'off'
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
};
