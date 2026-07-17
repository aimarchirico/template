import tsConfig from '@aimarchirico/commons-ts/eslint';
import eslintPluginYml from 'eslint-plugin-yml';

export default [
  ...tsConfig,
  ...eslintPluginYml.configs['flat/recommended'],

  {
    ignores: [
      '**/frontend/apps/**',
      '**/frontend/packages/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/pnpm-lock.yaml',
      '**/*.lock',
      '**/frontend/functions/**',
    ],
  },
  {
    files: ['**/*.config.ts'],
    rules: {
      'import/no-default-export': 'off',
      'check-file/filename-naming-convention': 'off',
    },
  },
];
