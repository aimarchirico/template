import {defineConfig} from 'eslint/config';
import baseConfig from '@aimarchirico/commons-expo/eslint-app';

/** ESLint configuration. */
export default defineConfig([
  ...baseConfig,
  {
    ignores: ['**/coverage/**'],
  },
  {
    files: ['**/babel.config.cjs', '**/\\[\\[path\\]\\].ts'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
]);
