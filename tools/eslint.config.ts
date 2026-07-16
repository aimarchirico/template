import tsConfig from '@aimarchirico/commons-eslint';

export default [
  ...tsConfig,
  {
    ignores: [
      '../npm/packages/**/*',
      '../npm/apps/**/*',
      '../backend/**/*',
      '../frontend/**/*',
      '../**/.turbo/**',
      '../**/Taskfile.yml',
      '**/pnpm-lock.yaml',
      '../**/pnpm-lock.yaml',
      '**/commitlint.config.js',
      '../**/commitlint.config.js',
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
