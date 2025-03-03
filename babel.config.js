module.exports = function (api) {
  api.cache(true);
  const plugins = [
    'react-native-reanimated/plugin',//estar de ultimo
  ];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
