import {defineConfig} from 'eslint/config';
import baseConfig from '@aimarchirico/commons-eslint';

export default defineConfig([
  {
    ignores: ['src/generated/**'],
  },
  ...baseConfig,
]);
