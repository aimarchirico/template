import eslintBaseConfig from '@aimarchirico/commons-ts/eslint-core';

function defineEslintConfig(config: typeof eslintBaseConfig) {
  return config;
}

/** ESLint configuration. */
export default defineEslintConfig([
  ...eslintBaseConfig,
  {
    ignores: ['manifest.resolved.json'],
  },
]);
