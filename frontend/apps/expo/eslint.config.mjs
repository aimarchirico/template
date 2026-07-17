import expoConfig from '@aimarchirico/commons-expo/eslint';

export default [
  {ignores: ['android/**', 'ios/**', 'dist/**']},
  ...expoConfig,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  },
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
  {
    files: ['app.config.ts', 'metro.config.ts', 'tailwind.config.ts'],
    rules: {'import/no-default-export': 'off'},
  },
  {
    files: ['src/app/**/*.{js,ts,jsx,tsx}', 'src/lib/firebase.ts'],
    rules: {
      'import/no-default-export': 'off',
      'import/no-unresolved': [
        'error',
        {ignore: ['^@/assets/google-services\\.json$']},
      ],
    },
  },
  {
    files: ['**/_layout.{js,ts,jsx,tsx}'],
    rules: {'check-file/filename-naming-convention': 'off'},
  },
];
