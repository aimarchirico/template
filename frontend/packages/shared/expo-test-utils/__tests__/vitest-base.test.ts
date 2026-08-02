import {describe, expect, it} from 'vitest';
import {vitestBase} from '../src/lib/vitest-base';

describe('vitestBase', () => {
  it('aliases react-native to react-native-web', () => {
    const config = vitestBase('./setup-base.ts');
    expect(config.test?.alias).toMatchObject({
      'react-native': 'react-native-web',
    });
  });

  it('sets the jsdom test environment', () => {
    const config = vitestBase('./setup-base.ts');
    expect(config.test?.environment).toBe('jsdom');
  });

  it('wires the given setup file', () => {
    const config = vitestBase('./setup-base.ts');
    expect(config.test?.setupFiles).toEqual(['./setup-base.ts']);
  });
});
