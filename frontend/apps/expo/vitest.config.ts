import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {vitestBase} from '@aimarchirico/template-expo-test-utils/vitest-base';

const __dirname = dirname(fileURLToPath(import.meta.url));
const setupFile = join(
  __dirname,
  '../../packages/shared/expo-test-utils/src/lib/setup.ts',
);

/** Vitest configuration. */
export default vitestBase(setupFile);
