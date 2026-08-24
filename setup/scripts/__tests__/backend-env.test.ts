import {beforeEach, describe, expect, it, vi} from 'vitest';

const {
  loadEnvs,
  runCommand,
  getConfigString,
  getRepoName,
  getOutputsPath,
  context,
} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  runCommand: vi.fn(),
  getConfigString: vi.fn(),
  getRepoName: vi.fn(),
  getOutputsPath: vi.fn(),
  context: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({
  loadEnvs,
  runCommand,
  getConfigString,
  getRepoName,
  getOutputsPath,
}));
vi.mock('@aimarchirico/commons-project', () => ({context}));

const originalEnv = {...process.env};

const requiredEnv = {
  VPS_HOST: 'host',
  VPS_USER: 'user',
  VPS_SSH_KEY_FILE: '/keys/vps.pem',
};

const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
const exitSpy = vi.spyOn(process, 'exit').mockImplementation(code => {
  throw new Error(`exit:${code}`);
});

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  getConfigString.mockReset();
  getConfigString.mockReturnValue('my-app');
  getRepoName.mockReset();
  getRepoName.mockReturnValue('my-repo');
  getOutputsPath.mockReset();
  getOutputsPath.mockReturnValue('/setup/.outputs.env');
  context.mockClear();
  errorSpy.mockClear();
  exitSpy.mockClear();
  process.env = {...originalEnv};
});

describe('backend-env script', () => {
  it('exits when required environment variables are missing', async () => {
    delete process.env.VPS_HOST;
    delete process.env.VPS_USER;
    delete process.env.VPS_SSH_KEY_FILE;

    await expect(import('../backend-env.js')).rejects.toThrow('exit:1');

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Missing required environment variables'),
    );
    expect(runCommand).not.toHaveBeenCalled();
  });

  it('syncs the remote env and copies compose files', async () => {
    process.env = {...originalEnv, ...requiredEnv};

    await import('../backend-env.js');

    expect(context).toHaveBeenCalledWith(
      'VPS',
      'user@host',
      'from VPS_HOST/VPS_USER',
    );
    expect(process.env.OUTPUT_FILE).toBe('/setup/.outputs.env');
    expect(process.env.SSH_HOST).toBe('host');
    expect(process.env.SSH_USER).toBe('user');
    expect(process.env.SSH_KEY_FILE).toBe('/keys/vps.pem');
    expect(process.env.REMOTE_ENV_PATH).toBe('~/docker/my-repo/.env');
    expect(process.env.ENV_VALUES).toBe('DB_HOST=my-app-db:5432');
    expect(process.env.ENV_DEFAULTS).toBe('DB_USER=my-app');
    expect(process.env.ENV_SECRET_KEYS).toBe('DB_PASSWORD,PROXY_SECRET');
    expect(process.env.OUTPUT_KEYS).toBe('PROXY_SECRET');
    expect(process.env.REMOTE_DIR).toBe('~/docker/my-repo');
    expect(process.env.LOCAL_FILES).toBe(
      '../backend/compose.yaml,../backend/compose.prod.yaml',
    );

    expect(runCommand).toHaveBeenNthCalledWith(1, 'pnpm', [
      'exec',
      'commons-ssh',
      'sync-env',
    ]);
    expect(runCommand).toHaveBeenNthCalledWith(2, 'pnpm', [
      'exec',
      'commons-ssh',
      'copy-files',
    ]);
  });
});
