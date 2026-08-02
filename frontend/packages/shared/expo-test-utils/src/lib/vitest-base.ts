import {defineConfig, mergeConfig} from 'vitest/config';
import commonsVitestConfig from '@aimarchirico/commons-ts/vitest-base';

const ALIASES = {
  'react-native': 'react-native-web',
};

/**
 * Vitest configuration for Expo apps, resolving react-native to react-native-web for jsdom.
 * @param setupFile Path to the test setup file to load before each test file.
 * @returns Merged Vitest configuration.
 */
export function vitestBase(setupFile: string) {
  return mergeConfig(
    commonsVitestConfig,
    defineConfig({
      define: {
        __DEV__: 'true',
      },
      resolve: {
        alias: ALIASES,
      },
      test: {
        alias: ALIASES,
        setupFiles: [setupFile],
        globals: true,
        environment: 'jsdom',
      },
    }),
  );
}
