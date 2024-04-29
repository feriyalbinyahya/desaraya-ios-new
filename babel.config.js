/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      }
    ],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['react-native-paper/babel'],
  ]
};