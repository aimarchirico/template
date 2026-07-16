let tsConfig;
let toolsConfig;

try {
  tsConfig = (await import('@aimarchirico/commons-ts/eslint')).default;
  toolsConfig = (await import('@aimarchirico/commons-tools/eslint')).default;
} catch {
  tsConfig = [];
  toolsConfig = [];
}

export default [
  ...tsConfig,
  ...toolsConfig,
  {
    ignores: [
      '../frontend/apps/**/*',
      '../frontend/packages/**/*',
      '../frontend/functions/**/*',
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
