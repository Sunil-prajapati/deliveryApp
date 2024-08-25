module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@assets': './src/assets',
          '@service': './src/service',
          '@state': './src/state',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@features': './src/features',
          '@styles': './src/styles',
        },
      },
    ],
  ],
};
