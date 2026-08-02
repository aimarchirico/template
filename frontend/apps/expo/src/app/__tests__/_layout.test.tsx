import { describe, expect, it, vi } from 'vitest';

vi.mock('expo-router', () => ({
  Stack: () => null,
}));

import RootLayout from '../_layout';

describe('RootLayout', () => {
  it('is a function', () => {
    expect(typeof RootLayout).toBe('function');
  });

  it('renders Stack layout component', () => {
    const result = RootLayout();
    expect(result).toBeDefined();
  });
});
