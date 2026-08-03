import {defineConfig, mergeConfig} from 'vitest/config';
import config from '@aimarchirico/commons-ts/vitest-base';

/** Vitest configuration. */
export default defineConfig(
  mergeConfig(config, {
    test: {
      coverage: {
        exclude: ['src/services/generated/**'],
      },
    },
  }),
);
