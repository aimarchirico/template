let baseConfig;
try {
  baseConfig = (await import('@aimarchirico/commons-ts/eslint')).default;
} catch {
  baseConfig = [];
}

export default [
  ...baseConfig,
  {
    ignores: [
      '../backend/**/*',
      '../frontend/**/*',
      '../**/pnpm-lock.yaml',
      '**/pnpm-lock.yaml',
      '**/commitlint.config.js',
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
