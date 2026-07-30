/* eslint-disable check-file/filename-naming-convention -- Babel config requires fixed filename */
/* eslint-disable jsdoc/require-jsdoc -- Babel config exports default CJS function */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {jsxImportSource: 'nativewind'}],
      'nativewind/babel',
    ],
  };
};
