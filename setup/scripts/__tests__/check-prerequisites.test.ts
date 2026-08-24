import fs from 'fs';
import {spawnSync} from 'child_process';
import {beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('child_process', () => ({spawnSync: vi.fn()}));

const {loadEnvs, getOutputsPath} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  getOutputsPath: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({loadEnvs, getOutputsPath}));

const existsSyncSpy = vi.spyOn(fs, 'existsSync');
const unlinkSyncSpy = vi.spyOn(fs, 'unlinkSync').mockImplementation(() => {});
const exitSpy = vi.spyOn(process, 'exit').mockImplementation(code => {
  throw new Error(`exit:${code}`);
});
const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

const requiredEnv = {
  CLOUDFLARE_ACCOUNT_ID: 'a',
  CLOUDFLARE_SETUP_TOKEN: 'b',
  CLOUDFLARE_DEPLOY_TOKEN: 'c',
  BASE_DOMAIN: 'example.com',
  API_HOST: 'api.example.com',
  TUNNEL_ID: 'd',
  ACCESS_POLICY_ID: 'e',
  VPS_HOST: 'host',
  VPS_USER: 'user',
  VPS_SSH_KEY_FILE: '/keys/vps.pem',
  GH_PACKAGES_TOKEN: 'f',
  EXPO_TOKEN: 'g',
};

const originalEnv = {...process.env};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  getOutputsPath.mockReturnValue('/setup/.outputs.env');
  existsSyncSpy.mockReset();
  unlinkSyncSpy.mockClear();
  vi.mocked(spawnSync).mockReset();
  exitSpy.mockClear();
  errorSpy.mockClear();
  logSpy.mockClear();
  process.env = {...originalEnv};
});

describe('check-prerequisites script', () => {
  it('removes a stale outputs file and passes when everything is present', async () => {
    existsSyncSpy.mockReturnValue(true);
    vi.mocked(spawnSync).mockReturnValue({status: 0} as never);
    process.env = {...originalEnv, ...requiredEnv};

    await import('../check-prerequisites.js');

    expect(unlinkSyncSpy).toHaveBeenCalledWith('/setup/.outputs.env');
    expect(loadEnvs).toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('= prerequisites: already present');
  });

  it('does not attempt to remove the outputs file when it does not exist', async () => {
    existsSyncSpy.mockImplementation(
      (target: unknown) => target !== '/setup/.outputs.env',
    );
    vi.mocked(spawnSync).mockReturnValue({status: 0} as never);
    process.env = {...originalEnv, ...requiredEnv};

    await import('../check-prerequisites.js');

    expect(unlinkSyncSpy).not.toHaveBeenCalled();
  });

  it('exits and reports missing tools, gh auth, env vars, and ssh key file', async () => {
    existsSyncSpy.mockImplementation(
      (target: unknown) => target !== requiredEnv.VPS_SSH_KEY_FILE,
    );
    vi.mocked(spawnSync).mockImplementation((cmd: unknown, args?: unknown) => {
      if (cmd === 'gh' && Array.isArray(args) && args[0] === 'auth') {
        return {status: 1} as never;
      }
      if (Array.isArray(args) && args[0] === 'pnpm') {
        return {status: 1} as never;
      }
      return {status: 0} as never;
    });
    process.env = {
      ...originalEnv,
      ...requiredEnv,
      BASE_DOMAIN: '',
    };

    await expect(import('../check-prerequisites.js')).rejects.toThrow('exit:1');

    expect(errorSpy).toHaveBeenCalledWith('setup cannot run yet:');
    const messages = errorSpy.mock.calls.map(call => call[0]).join('\n');
    expect(messages).toContain('pnpm is not on PATH');
    expect(messages).toContain('gh is not authenticated (run: gh auth login)');
    expect(messages).toContain('BASE_DOMAIN is not set in setup/.env');
    expect(messages).toContain(
      `VPS_SSH_KEY_FILE does not point at a file (${requiredEnv.VPS_SSH_KEY_FILE})`,
    );
  });
});
