import {vitestBase} from '@aimarchirico/template-expo-test-utils/vitest-base';
import {mergeConfig} from 'vitest/config';

/** Vitest configuration. */
export default mergeConfig(
  vitestBase('@aimarchirico/template-expo-test-utils/setup-base'),
  {
    test: {
      server: {
        deps: {
          // nativewind/metro and react-native-css use __dirname (CJS) internally;
          // externalizing prevents ESM/CJS conflicts when vitest imports metro.config.ts
          external: [/nativewind/, /react-native-css/],
        },
      },
    },
  },
);
