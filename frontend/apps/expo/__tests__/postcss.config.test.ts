import {describe, expect, it} from 'vitest';
import postcssConfig from '../postcss.config.mjs';

describe('postcss.config', () => {
  it('exports valid PostCSS configuration with @tailwindcss/postcss plugin', () => {
    expect(postcssConfig).toBeDefined();
    expect(postcssConfig.plugins).toBeDefined();
    expect(postcssConfig.plugins['@tailwindcss/postcss']).toBeDefined();
  });
});
