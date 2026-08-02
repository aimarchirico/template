import {describe, expect, it} from 'vitest';
import metroConfig from '../metro.config';

describe('metro.config', () => {
  it('exports valid Metro configuration', () => {
    expect(metroConfig).toBeDefined();
    expect(metroConfig.resolver).toBeDefined();
  });

  it('watches the monorepo workspace root', () => {
    expect(metroConfig.watchFolders).toHaveLength(1);
  });

  it('resolves node_modules from both the app and workspace root', () => {
    expect(metroConfig.resolver?.nodeModulesPaths).toHaveLength(2);
  });

  it('disables hierarchical lookup for monorepo isolation', () => {
    expect(metroConfig.resolver?.disableHierarchicalLookup).toBe(true);
  });
});
