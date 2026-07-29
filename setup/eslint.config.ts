import baseConfig from '@aimarchirico/commons-ts/eslint-core';

export default [
  ...baseConfig,
  {
    ignores: ['manifest.resolved.json'],
  },
];
