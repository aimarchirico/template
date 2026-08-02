import {describe, expect, it} from 'vitest';
import IndexScreen from '../index';

describe('IndexScreen', () => {
  it('is a function', () => {
    expect(typeof IndexScreen).toBe('function');
  });

  it('renders correctly', () => {
    const result = IndexScreen();
    expect(result).toBeDefined();
  });
});
