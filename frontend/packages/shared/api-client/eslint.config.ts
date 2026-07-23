import baseConfig from '@aimarchirico/commons-ts/eslint-architecture';

export default [
  ...baseConfig,
  {
    ignores: ['src/services/generated/**'],
  },
];
