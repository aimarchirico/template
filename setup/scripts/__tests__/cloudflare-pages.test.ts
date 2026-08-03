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

describe('cloudflare-pages script', () => {
  it('creates the pages project using the configured domain', async () => {
    getConfigString.mockReturnValue('my-app');
    getRepoName.mockReturnValue('my-repo');
    process.env.GH_PACKAGES_TOKEN = 'gh-token';
    process.env.CLOUDFLARE_SETUP_TOKEN = 'cf-token';
    process.env.BASE_DOMAIN = 'example.com';

    await import('../cloudflare-pages.js');

    expect(loadEnvs).toHaveBeenCalled();
    expect(process.env.NODE_AUTH_TOKEN).toBe('gh-token');
    expect(process.env.CLOUDFLARE_API_TOKEN).toBe('cf-token');
    expect(process.env.PAGES_PROJECT_NAME).toBe('my-repo');
    expect(process.env.PAGES_CUSTOM_DOMAIN).toBe('my-app.example.com');
    expect(runCommand).toHaveBeenCalledWith('pnpm', [
      'exec',
      'commons-cloudflare',
      'create-pages-project',
    ]);
  });
});
