/* eslint-disable check-file/filename-naming-convention */
/**
 * @param {any} api
 * @returns {any} The Babel configuration object.
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
