import {defineConfig} from 'eslint/config';
import eslintBaseConfig from '@aimarchirico/commons-ts/eslint-core';

/** ESLint configuration. */
export default defineConfig([
  ...eslintBaseConfig,
  {
    ignores: ['manifest.resolved.json'],
  },
]);
