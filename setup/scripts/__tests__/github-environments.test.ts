import fs from 'fs';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const {loadEnvs, runCommand} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  runCommand: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({loadEnvs, runCommand}));

const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  readFileSyncSpy.mockReset();
});

describe('github-environments script', () => {
  it('creates environments using the names from environments.json', async () => {
    readFileSyncSpy.mockReturnValue(
      JSON.stringify({
        environments: [{name: 'staging'}, {name: 'production'}],
      }),
    );

    await import('../github-environments.js');

    expect(loadEnvs).toHaveBeenCalled();
    expect(process.env.GITHUB_ENVIRONMENTS).toBe('staging,production');
    expect(runCommand).toHaveBeenCalledWith('pnpm', [
      'exec',
      'commons-github',
      'create-environments',
    ]);
  });
});
