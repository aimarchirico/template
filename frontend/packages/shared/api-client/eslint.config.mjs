import {defineConfig} from 'eslint/config';
import baseConfig from '@aimarchirico/commons-ts/eslint';

export default defineConfig([
  {
    ignores: ['src/generated/**'],
  },
  ...baseConfig,
]);
