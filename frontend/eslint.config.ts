import tsConfig from '@aimarchirico/commons-ts/eslint';

export default [
  ...tsConfig,

  {
    ignores: [
      'packages/**/*',
      'apps/**/*',
      'functions/**/*',
      '**/.turbo/**',
      '**/pnpm-lock.yaml',
    ],
  },
  {
    files: ['**/eslint.config.ts'],
    rules: {
      'import/no-default-export': 'off',
      'check-file/filename-naming-convention': 'off',
    },
  },
];
