import baseConfig from '@aimarchirico/commons-expo/eslint';

export default [
  ...baseConfig,
  {
    files: ['functions/**/*'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
];
