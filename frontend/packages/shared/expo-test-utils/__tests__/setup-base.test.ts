import {describe, expect, it} from 'vitest';
import '../src/lib/setup-base';

describe('setup-base', () => {
  it('defines the __DEV__ global', () => {
    // @ts-expect-error global mock for __DEV__
    expect(globalThis.__DEV__).toBe(true);
  });
});
