import {defineConfig} from 'eslint/config';
import baseConfig from '@aimarchirico/commons-expo/eslint';

export default defineConfig([
  {
    ignores: ['expo-env.d.ts'],
  },
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
    files: ['app.config.ts', 'metro.config.ts', 'tailwind.config.ts'],
    languageOptions: {
      sourceType: 'module',
    },
    rules: {
      'import/no-default-export': 'off',
      'check-file/filename-naming-convention': 'off',
    },
  },
  {
    files: [
      'babel.config.js',
      'metro.config.ts',
      'tailwind.config.ts',
      'nativewind-env.d.ts',
    ],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
]);
