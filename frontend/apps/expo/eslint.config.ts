import {defineConfig} from 'eslint/config';
import baseConfig from '@aimarchirico/commons-expo/eslint-app';

/** ESLint configuration. */
export default defineConfig([
  ...baseConfig,
  {
    files: ['functions/api/\\[\\[path\\]\\].ts'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
  {
    files: ['nativewind-env.d.ts'],
    rules: {
      'commons/public-jsdoc-only': 'off',
    },
  },
]);
