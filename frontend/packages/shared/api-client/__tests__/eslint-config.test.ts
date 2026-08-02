import {describe, expect, it} from 'vitest';
import eslintConfig from '../eslint.config';

describe('eslint.config', () => {
  it('exports valid eslint configuration array', () => {
    expect(Array.isArray(eslintConfig)).toBe(true);
    expect(eslintConfig.length).toBeGreaterThan(0);
  });
});
