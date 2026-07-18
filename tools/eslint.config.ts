import eslintPluginToml from 'eslint-plugin-toml';
import eslintPluginYml from 'eslint-plugin-yml';
import tsConfig from '@aimarchirico/commons-ts/eslint';

export default [
  ...tsConfig,
  ...eslintPluginToml.configs['flat/recommended'],
  ...eslintPluginYml.configs['flat/recommended'],
  {
    ignores: [
      '**/frontend/apps/**',
      '**/frontend/packages/**',
      '**/frontend/functions/**',
      '**/pnpm-lock.yaml',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.toml'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
];
