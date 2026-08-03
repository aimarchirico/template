import {describe, expect, it} from 'vitest';
import appConfig, {buildExpoConfig} from '../app.config';

describe('app.config', () => {
  it('exports valid expo configuration', () => {
    expect(appConfig).toBeDefined();
    expect(appConfig.expo).toBeDefined();
    expect(appConfig.expo.name).toBe('Template');
    expect(appConfig.expo.scheme).toBe('template');
  });

  it('uses production identifiers when isDev is false', () => {
    const config = buildExpoConfig(false, '');

    expect(config.expo.name).toBe('Template');
    expect(config.expo.ios.bundleIdentifier).toBe('no.chirico.template');
    expect(config.expo.android.package).toBe('no.chirico.template');
  });

  it('uses dev identifiers when isDev is true', () => {
    const config = buildExpoConfig(true, '');

    expect(config.expo.name).toBe('Template (Dev)');
    expect(config.expo.ios.bundleIdentifier).toBe('no.chirico.template.dev');
    expect(config.expo.android.package).toBe('no.chirico.template.dev');
  });

  it('embeds the given apiUrl', () => {
    const config = buildExpoConfig(false, 'https://api.example.com');

    expect(config.expo.extra.apiUrl).toBe('https://api.example.com');
  });
});
