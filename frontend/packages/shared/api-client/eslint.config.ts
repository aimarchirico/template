import baseConfig from '@aimarchirico/commons-ts/eslint';
import architectureConfig from '@aimarchirico/commons-ts/eslint-architecture';

export default [
  ...baseConfig,
  ...architectureConfig,
  {
    ignores: ['src/services/generated/**'],
  },
];
