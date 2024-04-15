module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          assets: './assets',
          api: './src/api',
          components: './src/components',
          hooks: './src/hooks',
          libs: './src/libs',
          navigators: './src/navigators',
          screens: './src/screens',
          stores: './src/stores',
          utils: './src/utils',
          'moti-skeleton': 'moti/skeleton/react-native-linear-gradient',
        },
      },
    ],
  ],
};
