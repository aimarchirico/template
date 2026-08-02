import {defineConfig} from 'vitest/config';
import config from '@aimarchirico/commons-ts/vitest-base';

/** Vitest configuration. */
export default defineConfig({
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      exclude: [...(config.test?.coverage?.exclude || []), 'scripts/**'],
    },
  },
});
