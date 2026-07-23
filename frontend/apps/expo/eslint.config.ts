import baseConfig from '@aimarchirico/commons-expo/eslint-app';
export default [
  ...baseConfig,
  {
    files: ['**/\\[\\[path\\]\\].ts'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
];

