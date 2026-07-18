import expoConfig from '@aimarchirico/commons-expo/eslint';

export default [
  ...expoConfig,
  {
    files: [
      '*.js',
      '*.mjs',
      '*.ts',
      '*.d.ts',
      'scripts/**/*.js',
      'functions/**/*.js',
      'scripts/**/*.mjs',
      'functions/**/*.mjs',
    ],
    rules: {'check-file/filename-naming-convention': 'off'},
  },
];
