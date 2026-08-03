import {describe, expect, it} from 'vitest';
import tailwindConfig from '../tailwind.config';

describe('tailwind.config', () => {
  it('exports valid Tailwind configuration', () => {
    expect(tailwindConfig).toBeDefined();
    expect(tailwindConfig.content).toContain('./src/**/*.{js,jsx,ts,tsx}');
    expect(tailwindConfig.presets).toHaveLength(1);
    expect(tailwindConfig.plugins).toEqual([]);
  });
});
