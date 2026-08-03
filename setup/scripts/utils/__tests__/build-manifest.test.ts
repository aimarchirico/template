import fs from 'fs';
import path from 'path';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

const {readJson} = vi.hoisted(() => ({readJson: vi.fn()}));
vi.mock('../common.js', async importOriginal => {
  const actual = await importOriginal<typeof import('../common.js')>();
  return {...actual, readJson, setupDir: '/setup'};
});

const writeFileSyncSpy = vi
  .spyOn(fs, 'writeFileSync')
  .mockImplementation(() => undefined);
const exitSpy = vi.spyOn(process, 'exit').mockImplementation(code => {
  throw new Error(`exit:${code}`);
});
const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

const manifest = {
  values: {
    appName: {path: 'name'},
    backendPort: {path: 'modules.backend.port', format: 'port:{}'},
  },
};

beforeEach(() => {
  vi.resetModules();
  readJson.mockReset();
});

afterEach(() => {
  writeFileSyncSpy.mockClear();
  exitSpy.mockClear();
  errorSpy.mockClear();
  logSpy.mockClear();
});

const byFile = (files: Record<string, unknown>) => {
  readJson.mockImplementation((file: string) => {
    for (const [name, value] of Object.entries(files)) {
      if (file.endsWith(name)) return value;
    }
    throw new Error(`unexpected file: ${file}`);
  });
};

describe('build-manifest script', () => {
  it('writes a resolved manifest when the configuration is complete', async () => {
    byFile({
      'manifest.json': manifest,
      'default.json': {name: 'Template', modules: {backend: {port: 8080}}},
      'config.json': {name: 'My App', modules: {backend: {port: 9090}}},
    });

    await import('../build-manifest.js');

    expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    const [target, contents] = writeFileSyncSpy.mock.calls[0];
    expect(target).toBe(path.join('/setup', 'manifest.resolved.json'));
    expect(JSON.parse(contents as string)).toEqual({
      values: {
        appName: {from: 'Template', to: 'My App'},
        backendPort: {from: 'port:8080', to: 'port:9090'},
      },
      replacements: [],
      moves: [],
      deletes: [],
    });
    expect(logSpy).toHaveBeenCalled();
  });

  it('exits when default.json has an invalid backend port', async () => {
    byFile({
      'manifest.json': manifest,
      'default.json': {name: 'Template', modules: {backend: {port: 80}}},
      'config.json': {name: 'My App', modules: {backend: {port: 9090}}},
    });

    await expect(import('../build-manifest.js')).rejects.toThrow('exit:1');
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('default.json: modules.backend.port'),
    );
  });

  it('exits when config.json has an invalid backend port', async () => {
    byFile({
      'manifest.json': manifest,
      'default.json': {name: 'Template', modules: {backend: {port: 8080}}},
      'config.json': {name: 'My App', modules: {backend: {port: 'nope'}}},
    });

    await expect(import('../build-manifest.js')).rejects.toThrow('exit:1');
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('config.json: modules.backend.port'),
    );
  });

  it('exits when values are missing from default.json or config.json', async () => {
    byFile({
      manifest: {
        values: {
          appName: {path: 'name'},
        },
      },
      'manifest.json': {
        values: {
          appName: {path: 'name'},
        },
      },
      'default.json': {modules: {backend: {port: 8080}}},
      'config.json': {name: 'My App', modules: {backend: {port: 9090}}},
    });

    await expect(import('../build-manifest.js')).rejects.toThrow('exit:1');
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('default.json is missing name'),
    );
  });
});
