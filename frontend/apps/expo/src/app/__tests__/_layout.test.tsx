import {describe, expect, it, vi} from 'vitest';

import RootLayout from '../_layout';

vi.mock('expo-router', () => ({
  Stack: () => null,
}));

describe('RootLayout', () => {
  it('is a function', () => {
    expect(typeof RootLayout).toBe('function');
  });

  it('renders Stack layout component', () => {
    const result = RootLayout();
    expect(result).toBeDefined();
  });
});
