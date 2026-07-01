import {defineConfig} from 'eslint/config';
import baseConfig from '@aimarchirico/core-expo/eslint';

export default defineConfig([
  ...baseConfig,
  {
    files: ['**/app/**/*.{js,ts,jsx,tsx}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['**/_layout.{js,ts,jsx,tsx}'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
  {
    files: ['app.config.js'],
    languageOptions: {
      sourceType: 'module',
    },
    rules: {
      'import/no-default-export': 'off',
      'check-file/filename-naming-convention': 'off',
    },
  },
]);
