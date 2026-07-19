import baseConfig from '@aimarchirico/commons-ts/eslint';

export default [
  ...baseConfig,
  {
    ignores: ['src/generated/**'],
  },
];
