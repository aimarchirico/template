import {beforeEach, describe, expect, it, vi} from 'vitest';

const {loadEnvs, runCommand, getConfigString, getOutputsPath} = vi.hoisted(
  () => ({
    loadEnvs: vi.fn(),
    runCommand: vi.fn(),
    getConfigString: vi.fn(),
    getOutputsPath: vi.fn(),
  }),
);
vi.mock('../utils/common.js', () => ({
  loadEnvs,
  runCommand,
  getConfigString,
  getOutputsPath,
}));

const originalEnv = {...process.env};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  getConfigString.mockReset();
  getOutputsPath.mockReset();
  process.env = {...originalEnv};
});

describe('cloudflare-token script', () => {
  it('creates a service token named after the slug', async () => {
    getConfigString.mockReturnValue('my-app');
    getOutputsPath.mockReturnValue('/setup/.outputs.env');
    process.env.GH_PACKAGES_TOKEN = 'gh-token';
    process.env.CLOUDFLARE_SETUP_TOKEN = 'cf-token';

    await import('../cloudflare-token.js');

    expect(loadEnvs).toHaveBeenCalled();
    expect(getConfigString).toHaveBeenCalledWith('slug');
    expect(process.env.NODE_AUTH_TOKEN).toBe('gh-token');
    expect(process.env.CLOUDFLARE_API_TOKEN).toBe('cf-token');
    expect(process.env.OUTPUT_FILE).toBe('/setup/.outputs.env');
    expect(process.env.SERVICE_TOKEN_NAME).toBe('my-app-ci');
    expect(runCommand).toHaveBeenCalledWith('pnpm', [
      'exec',
      'commons-cloudflare',
      'create-service-token',
    ]);
  });
});
