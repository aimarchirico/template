import fs from 'fs';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
const exitSpy = vi.spyOn(process, 'exit').mockImplementation(code => {
  throw new Error(`exit:${code}`);
});
const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
const writeSpy = vi
  .spyOn(process.stdout, 'write')
  .mockImplementation(() => true);

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  readFileSyncSpy.mockReset();
  exitSpy.mockClear();
  errorSpy.mockClear();
  writeSpy.mockClear();
});

describe('environments-list script', () => {
  it('writes a comma-separated list of environment names', async () => {
    readFileSyncSpy.mockReturnValue(
      JSON.stringify({environments: [{name: 'staging'}, {name: 'production'}]}),
    );
    await import('../environments-list.js');
    expect(writeSpy).toHaveBeenCalledWith('staging,production');
  });

  it('exits when no environments are found', async () => {
    readFileSyncSpy.mockReturnValue(JSON.stringify({environments: []}));
    await expect(import('../environments-list.js')).rejects.toThrow('exit:1');
    expect(errorSpy).toHaveBeenCalledWith(
      'No environments found in environments.json',
    );
  });
});
