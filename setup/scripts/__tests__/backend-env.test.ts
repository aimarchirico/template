import fs from 'fs';
import {spawnSync} from 'child_process';
import {beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('child_process', () => ({spawnSync: vi.fn()}));

const {loadEnvs, getConfigString, getRepoName} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  getConfigString: vi.fn(),
  getRepoName: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({loadEnvs, getConfigString, getRepoName}));

const appendFileSyncSpy = vi
  .spyOn(fs, 'appendFileSync')
  .mockImplementation(() => {});
const exitSpy = vi.spyOn(process, 'exit').mockImplementation(code => {
  throw new Error(`exit:${code}`);
});
const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

const originalEnv = {...process.env};

const requiredEnv = {
  SLUG: 'my-app',
  BACKEND_PORT: '8080',
  VPS_HOST: 'host',
  VPS_USER: 'user',
  VPS_SSH_KEY_FILE: '/keys/vps.pem',
  REPO: 'my-repo',
};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  getConfigString.mockReset();
  getRepoName.mockReset();
  appendFileSyncSpy.mockClear();
  vi.mocked(spawnSync).mockReset();
  exitSpy.mockClear();
  errorSpy.mockClear();
  logSpy.mockClear();
  process.env = {...originalEnv};
});

describe('backend-env script', () => {
  it('exits when required environment variables are missing', async () => {
    process.env.SLUG = 'my-app';

    await expect(import('../backend-env.js')).rejects.toThrow('exit:1');

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Missing required environment variables'),
    );
    expect(spawnSync).not.toHaveBeenCalled();
  });

  it('reuses existing values, writes the remote env file, and copies compose files', async () => {
    process.env = {...originalEnv, ...requiredEnv, OUTPUT_FILE: '/out.env'};

    const isReadCall = (args: unknown) =>
      Array.isArray(args) &&
      args.some(a => typeof a === 'string' && a.startsWith('cat '));

    vi.mocked(spawnSync).mockImplementation((cmd: unknown, args?: unknown) => {
      if (cmd === 'ssh' && isReadCall(args)) {
        return {
          status: 0,
          stdout: 'DB_USER="existing"\nDB_PASSWORD="existing-pw"\n',
          stderr: '',
        } as never;
      }
      if (cmd === 'ssh') {
        return {status: 0, stdout: '', stderr: ''} as never;
      }
      if (cmd === 'scp') {
        return {status: 0, stderr: ''} as never;
      }
      throw new Error(`unexpected command: ${String(cmd)}`);
    });

    await import('../backend-env.js');

    expect(appendFileSyncSpy).toHaveBeenCalledWith(
      '/out.env',
      expect.stringContaining('PROXY_SECRET='),
      {mode: 0o600},
    );
    const printed = logSpy.mock.calls.map(call => call.join(' ')).join('\n');
    expect(printed).toContain('DB_USER: reused');
    expect(printed).toContain('DB_PASSWORD: reused');
    expect(printed).toContain('PROXY_SECRET: generated');
  });

  it('exits when the ssh binary itself fails to run', async () => {
    process.env = {...originalEnv, ...requiredEnv};
    vi.mocked(spawnSync).mockReturnValue({
      error: new Error('ssh not found'),
    } as never);

    await expect(import('../backend-env.js')).rejects.toThrow('exit:1');

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Could not run ssh: ssh not found'),
    );
  });

  it('exits when writing the remote env file fails', async () => {
    process.env = {...originalEnv, ...requiredEnv};
    const isReadCall = (args: unknown) =>
      Array.isArray(args) &&
      args.some(a => typeof a === 'string' && a.startsWith('cat '));
    vi.mocked(spawnSync).mockImplementation((cmd: unknown, args?: unknown) => {
      if (cmd === 'ssh' && isReadCall(args)) {
        return {status: 0, stdout: '', stderr: ''} as never;
      }
      if (cmd === 'ssh') {
        return {status: 1, stdout: '', stderr: 'permission denied'} as never;
      }
      throw new Error(`unexpected command: ${String(cmd)}`);
    });

    await expect(import('../backend-env.js')).rejects.toThrow('exit:1');

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Could not write'),
    );
  });

  it('exits when copying compose files fails', async () => {
    process.env = {...originalEnv, ...requiredEnv};
    const isReadCall = (args: unknown) =>
      Array.isArray(args) &&
      args.some(a => typeof a === 'string' && a.startsWith('cat '));
    vi.mocked(spawnSync).mockImplementation((cmd: unknown, args?: unknown) => {
      if (cmd === 'ssh' && isReadCall(args)) {
        return {status: 0, stdout: '', stderr: ''} as never;
      }
      if (cmd === 'ssh') {
        return {status: 0, stdout: '', stderr: ''} as never;
      }
      if (cmd === 'scp') {
        return {status: 1, stderr: 'connection refused'} as never;
      }
      throw new Error(`unexpected command: ${String(cmd)}`);
    });

    await expect(import('../backend-env.js')).rejects.toThrow('exit:1');

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Could not copy docker compose files'),
    );
  });
});
