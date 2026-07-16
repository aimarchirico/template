import tsConfig from '@aimarchirico/commons-ts/eslint';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import eslintPluginToml from 'eslint-plugin-toml';
import eslintPluginYml from 'eslint-plugin-yml';


export default [
  ...tsConfig,
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
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
