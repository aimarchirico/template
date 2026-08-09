import fs from 'fs';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const {loadEnvs, runCommand} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  runCommand: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({loadEnvs, runCommand}));

const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
const existsSyncSpy = vi.spyOn(fs, 'existsSync');

const originalEnv = {...process.env};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  readFileSyncSpy.mockReset();
  existsSyncSpy.mockReset();
  process.env = {...originalEnv};
});

const environments = {
  environments: [
    {name: 'staging', secrets: ['A', 'B']},
    {name: 'production', secrets: ['C']},
  ],
};

describe('github-secrets script', () => {
  it('sets secrets without reading a VPS key file when none is configured', async () => {
    delete process.env.VPS_SSH_KEY_FILE;
    readFileSyncSpy.mockReturnValue(JSON.stringify(environments));
    process.env.GH_PACKAGES_TOKEN = 'gh-token';
    process.env.CLOUDFLARE_DEPLOY_TOKEN = 'cf-token';

    await import('../github-secrets.js');

    expect(loadEnvs).toHaveBeenCalled();
    expect(process.env.NODE_AUTH_TOKEN).toBe('gh-token');
    expect(process.env.CLOUDFLARE_API_TOKEN).toBe('cf-token');
    expect(process.env.VPS_SSH_KEY).toBeUndefined();
    expect(process.env.GITHUB_SECRETS).toBe(
      'CF_ACCESS_CLIENT_SECRET,GH_PACKAGES_TOKEN,PROJECT_TOKEN',
    );
    expect(process.env.GITHUB_ENVIRONMENT_SECRETS).toBe(
      'staging=A,B;production=C',
    );
    expect(runCommand).toHaveBeenCalledWith('pnpm', [
      'exec',
      'commons-github',
      'set-secrets',
    ]);
  });

  it('reads and trims the VPS SSH key file when configured', async () => {
    process.env.VPS_SSH_KEY_FILE = '/keys/vps.pem';
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockImplementation((file: unknown) =>
      file === '/keys/vps.pem'
        ? '  key-contents  \n'
        : JSON.stringify(environments),
    );

    await import('../github-secrets.js');

    expect(existsSyncSpy).toHaveBeenCalledWith('/keys/vps.pem');
    expect(process.env.VPS_SSH_KEY).toBe('key-contents');
  });
});
