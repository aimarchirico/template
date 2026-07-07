const baseConfig = require('@aimarchirico/commons-tools/markdownlint');

module.exports = {
  ...baseConfig,
  globs: ['../**/*.md'],
  ignores: ['**/CHANGELOG.md']
};
