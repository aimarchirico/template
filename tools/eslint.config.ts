import tsConfig from '@aimarchirico/commons-ts/eslint';
import eslintPluginToml from 'eslint-plugin-toml';
import eslintPluginYml from 'eslint-plugin-yml';


export default [
  ...tsConfig,
  ...eslintPluginToml.configs['flat/recommended'],
  ...eslintPluginYml.configs['flat/recommended'],

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
      '**/*config.ts',
      '../**/*config.ts',
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
