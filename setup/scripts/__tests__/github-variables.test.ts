import fs from 'fs';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const {loadEnvs, runCommand, getConfigString} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  runCommand: vi.fn(),
  getConfigString: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({loadEnvs, runCommand, getConfigString}));

const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');

const originalEnv = {...process.env};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  getConfigString.mockReset();
  readFileSyncSpy.mockReset();
  process.env = {...originalEnv};
});

describe('github-variables script', () => {
  it('syncs variables derived from config and environments.json', async () => {
    getConfigString.mockReturnValue('my-app');
    readFileSyncSpy.mockReturnValue(
      JSON.stringify({
        environments: [
          {name: 'staging', variables: ['A']},
          {name: 'production', variables: ['B', 'C']},
        ],
      }),
    );
    process.env.GH_PACKAGES_TOKEN = 'gh-token';
    process.env.API_HOST = 'api.example.com';
    process.env.BASE_DOMAIN = 'example.com';

    await import('../github-variables.js');

    expect(loadEnvs).toHaveBeenCalled();
    expect(getConfigString).toHaveBeenCalledWith('slug');
    expect(process.env.NODE_AUTH_TOKEN).toBe('gh-token');
    expect(process.env.API_URL).toBe('https://api.example.com/my-app');
    expect(process.env.APP_URL).toBe('https://my-app.example.com');
    expect(process.env.GITHUB_VARIABLES).toBe('API_URL,CF_ACCESS_CLIENT_ID');
    expect(process.env.GITHUB_ENVIRONMENT_VARIABLES).toBe(
      'staging=A;production=B,C',
    );
    expect(runCommand).toHaveBeenCalledWith('pnpm', [
      'exec',
      'commons-github',
      'sync-variables',
    ]);
  });
});
