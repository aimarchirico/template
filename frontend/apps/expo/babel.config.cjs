/**
 * Babel configuration.
 * @param api
 * @returns The babel configuration object.
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {jsxImportSource: 'nativewind'}],
      'nativewind/babel',
    ],
  };
};
