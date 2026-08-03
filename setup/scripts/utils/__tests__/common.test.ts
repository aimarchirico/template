import fs from 'fs';
import path from 'path';
import {spawnSync} from 'child_process';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {
  atPath,
  getConfigString,
  getConfigValue,
  getOutputsPath,
  getRepoName,
  loadEnvs,
  readJson,
  rootDir,
  runCommand,
  setupDir,
} from '../common.js';

vi.mock('child_process', () => ({spawnSync: vi.fn()}));

const existsSyncSpy = vi.spyOn(fs, 'existsSync');
const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
const exitSpy = vi
  .spyOn(process, 'exit')
  .mockImplementation(() => undefined as never);
const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

beforeEach(() => {
  delete process.env.SETUP_TEST_KEY;
  delete process.env.SETUP_TEST_QUOTED;
});

afterEach(() => {
  existsSyncSpy.mockReset();
  readFileSyncSpy.mockReset();
  exitSpy.mockClear();
  errorSpy.mockClear();
  vi.mocked(spawnSync).mockReset();
  delete process.env.SETUP_TEST_KEY;
  delete process.env.SETUP_TEST_QUOTED;
});

describe('setupDir / rootDir', () => {
  it('resolve to real directories on disk', () => {
    expect(fs.existsSync(setupDir)).toBe(true);
    expect(fs.existsSync(rootDir)).toBe(true);
  });
});

describe('readJson', () => {
  it('parses a JSON file from disk', () => {
    const file = path.join(setupDir, 'package.json');
    const parsed = readJson<{name: string}>(file);
    expect(parsed.name).toBe('setup');
  });
});

describe('atPath', () => {
  it('reads a nested property via a dotted path', () => {
    expect(atPath({a: {b: {c: 1}}}, 'a.b.c')).toBe(1);
  });

  it('returns undefined when a segment is missing', () => {
    expect(atPath({a: {}}, 'a.b.c')).toBeUndefined();
  });

  it('returns undefined when the data is undefined', () => {
    expect(atPath(undefined, 'a.b')).toBeUndefined();
  });

  it('returns undefined when traversing into an array', () => {
    expect(atPath({a: [1, 2]}, 'a.b')).toBeUndefined();
  });

  it('returns undefined when traversing into a scalar', () => {
    expect(atPath({a: 1}, 'a.b')).toBeUndefined();
  });
});

describe('loadEnvs', () => {
  it('does nothing when no env files exist', () => {
    existsSyncSpy.mockReturnValue(false);
    loadEnvs();
    expect(process.env.SETUP_TEST_KEY).toBeUndefined();
  });

  it('parses key=value lines, skipping blanks, comments, and malformed lines', () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(
      [
        '# a comment',
        '',
        'SETUP_TEST_KEY=value',
        'SETUP_TEST_QUOTED="quoted value"',
        'not-a-valid-line',
      ].join('\n'),
    );
    loadEnvs();
    expect(process.env.SETUP_TEST_KEY).toBe('value');
    expect(process.env.SETUP_TEST_QUOTED).toBe('quoted value');
  });
});

describe('runCommand', () => {
  it('runs the command and returns the result on success', () => {
    vi.mocked(spawnSync).mockReturnValue({status: 0} as never);
    const result = runCommand('echo', ['hi']);
    expect(spawnSync).toHaveBeenCalledWith(
      'echo',
      ['hi'],
      expect.objectContaining({stdio: 'inherit', shell: true}),
    );
    expect(result.status).toBe(0);
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('exits with the command status on failure', () => {
    vi.mocked(spawnSync).mockReturnValue({status: 2} as never);
    runCommand('false');
    expect(exitSpy).toHaveBeenCalledWith(2);
  });

  it('exits with 1 when the status is missing', () => {
    vi.mocked(spawnSync).mockReturnValue({status: null} as never);
    runCommand('false');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});

describe('getRepoName', () => {
  it('returns the trimmed repo name on success', () => {
    vi.mocked(spawnSync).mockReturnValue({
      status: 0,
      stdout: 'my-repo\n',
    } as never);
    expect(getRepoName()).toBe('my-repo');
  });

  it('exits when the gh CLI call fails', () => {
    vi.mocked(spawnSync).mockReturnValue({status: 1, stdout: ''} as never);
    getRepoName();
    expect(errorSpy).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});

describe('getConfigValue / getConfigString', () => {
  it('exits when config.json is missing', () => {
    existsSyncSpy.mockReturnValue(false);
    getConfigValue('name');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('reads a plain value by dotted path', () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(JSON.stringify({name: 'My App'}));
    expect(getConfigValue('name')).toBe('My App');
  });

  it('derives a slug from the name', () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(JSON.stringify({name: 'My Cool App!'}));
    expect(getConfigValue('slug')).toBe('mycoolapp');
  });

  it('returns a scalar as a string', () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(
      JSON.stringify({modules: {backend: {port: 8080}}}),
    );
    expect(getConfigString('modules.backend.port')).toBe('8080');
  });

  it('exits when the value is missing or an object', () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(JSON.stringify({modules: {}}));
    getConfigString('modules');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});

describe('getOutputsPath', () => {
  it('points at .outputs.env inside the setup directory', () => {
    expect(getOutputsPath()).toBe(path.join(setupDir, '.outputs.env'));
  });
});
