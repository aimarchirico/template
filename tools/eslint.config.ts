import tsConfig from '@aimarchirico/commons-eslint';
import jsonConfig from '@aimarchirico/commons-eslint/json';
import ymlConfig from '@aimarchirico/commons-eslint/yaml';
import tomlConfig from '@aimarchirico/commons-eslint/toml';

export default [
  ...tsConfig,
  ...jsonConfig,
  ...ymlConfig,
  ...tomlConfig,
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
