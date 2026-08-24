import {beforeEach, describe, expect, it, vi} from 'vitest';

const {loadEnvs, runCommand, getConfigString, getRepoName} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  runCommand: vi.fn(),
  getConfigString: vi.fn(),
  getRepoName: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({
  loadEnvs,
  runCommand,
  getConfigString,
  getRepoName,
}));

const originalEnv = {...process.env};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  getConfigString.mockReset();
  getRepoName.mockReset();
  process.env = {...originalEnv};
});

describe('cloudflare-env script', () => {
  it('sets pages env vars derived from config and runs the command', async () => {
    getConfigString.mockReturnValue('my-app');
    getRepoName.mockReturnValue('my-repo');
    process.env.GH_PACKAGES_TOKEN = 'gh-token';
    process.env.CLOUDFLARE_SETUP_TOKEN = 'cf-token';
    process.env.API_HOST = 'api.example.com';

    await import('../cloudflare-env.js');

    expect(loadEnvs).toHaveBeenCalled();
    expect(getConfigString).toHaveBeenCalledWith('slug');
    expect(process.env.NODE_AUTH_TOKEN).toBe('gh-token');
    expect(process.env.CLOUDFLARE_API_TOKEN).toBe('cf-token');
    expect(process.env.PAGES_PROJECT_NAME).toBe('my-repo');
    expect(process.env.API_URL).toBe('https://api.example.com/my-app');
    expect(process.env.PAGES_VARIABLES).toBe('API_URL');
    expect(process.env.PAGES_SECRETS).toBe('PROXY_SECRET');
    expect(runCommand).toHaveBeenCalledWith('pnpm', [
      'exec',
      'commons-cloudflare',
      'set-pages-env',
    ]);
  });
});
