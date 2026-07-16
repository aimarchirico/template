import {defineConfig} from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat.js';
import baseConfig from '@aimarchirico/commons-ts/eslint';

const dedupedConfig = baseConfig.map(config => {
  if (!config?.plugins) return config;
  const { '@typescript-eslint': _tsPlugin, import: _importPlugin, ...plugins } = config.plugins;
  return {...config, plugins};
});

export default defineConfig([
  { ignores: ['android/**', 'ios/**', 'dist/**'] },
  ...expoConfig,
  ...dedupedConfig,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  },
  {
    files: ['*.js', '*.mjs', '*.ts', '*.d.ts', 'scripts/**/*.js', 'functions/**/*.js', 'scripts/**/*.mjs', 'functions/**/*.mjs'],
    rules: { 'check-file/filename-naming-convention': 'off' },
  },
  {
    files: ['app.config.ts', 'metro.config.ts'],
    rules: { 'import/no-default-export': 'off' },
  },
  {
    files: ['src/app/**/*.{js,ts,jsx,tsx}', 'src/lib/firebase.ts'],
    rules: {
      'import/no-default-export': 'off',
      'import/no-unresolved': ['error', {ignore: ['^@/assets/google-services\\.json$']}],
    },
  },
  {
    files: ['**/_layout.{js,ts,jsx,tsx}'],
    rules: { 'check-file/filename-naming-convention': 'off' },
  },
]);
