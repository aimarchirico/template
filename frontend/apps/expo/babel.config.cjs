/**
 * Babel configuration.
 * @param {import('@babel/core').ConfigAPI} api
 * @returns The babel configuration object.
 */
module.exports = function (api) {
  api.cache.forever();
  return {
    presets: [
      ['babel-preset-expo', {jsxImportSource: 'nativewind'}],
      'nativewind/babel',
    ],
  };
};
