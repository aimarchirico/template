import baseConfig from '@aimarchirico/commons-ts/eslint-folders';

export default [
  ...baseConfig,
  {
    ignores: ['src/services/generated/**'],
  },
];
