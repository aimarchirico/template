const baseConfig = require('@aimarchirico/commons-tools/markdownlint');

module.exports = {
  ...baseConfig,
  gitignore: false,
  globs: ['../**/*.md'],
  ignores: ['../**/CHANGELOG.md', '../**/node_modules/**']
};
