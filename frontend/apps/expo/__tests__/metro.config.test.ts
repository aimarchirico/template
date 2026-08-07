import {describe, expect, it, vi} from 'vitest';
import metroConfig from '../metro.config';

vi.mock('nativewind/metro', () => ({
  withNativewind: <T>(config: T): T => config,
}));

describe('metro.config', () => {
  it('exports valid Metro configuration', () => {
    expect(metroConfig).toBeDefined();
    expect((metroConfig as {resolver: unknown}).resolver).toBeDefined();
  });

  it('watches the monorepo workspace root', () => {
    expect(
      (metroConfig as {watchFolders: unknown[]}).watchFolders,
    ).toHaveLength(1);
  });

  it('resolves node_modules from both the app and workspace root', () => {
    expect(
      (metroConfig as {resolver: {nodeModulesPaths: unknown[]}}).resolver
        .nodeModulesPaths,
    ).toHaveLength(2);
  });

  it('disables hierarchical lookup for monorepo isolation', () => {
    expect(
      (metroConfig as {resolver: {disableHierarchicalLookup: boolean}}).resolver
        .disableHierarchicalLookup,
    ).toBe(true);
  });
});
