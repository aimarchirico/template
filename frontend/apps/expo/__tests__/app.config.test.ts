import {describe, expect, it} from 'vitest';
import appConfig from '../app.config';

describe('app.config', () => {
  it('exports valid expo configuration', () => {
    expect(appConfig).toBeDefined();
    expect(appConfig.expo).toBeDefined();
    expect(appConfig.expo.name).toBe('Template');
    expect(appConfig.expo.scheme).toBe('template');
    expect(appConfig.expo.ios.bundleIdentifier).toBe('no.chirico.template');
    expect(appConfig.expo.android.package).toBe('no.chirico.template');
  });
});
