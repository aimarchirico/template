import path from 'path';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const {loadEnvs, runCommand, getOutputsPath} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  runCommand: vi.fn(),
  getOutputsPath: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({
  loadEnvs,
  runCommand,
  getOutputsPath,
  rootDir: path.resolve('root'),
}));

const originalEnv = {...process.env};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  getOutputsPath.mockReset();
  process.env = {...originalEnv};
});

describe('android-keystore script', () => {
  it('creates the EAS project and imports the keystore from the expo app directory', async () => {
    getOutputsPath.mockReturnValue('/setup/.outputs.env');
    process.env.GH_PACKAGES_TOKEN = 'gh-token';

    await import('../android-keystore.js');

    const expoDir = path.resolve('root', 'frontend', 'apps', 'expo');

    expect(loadEnvs).toHaveBeenCalled();
    expect(process.env.NODE_AUTH_TOKEN).toBe('gh-token');
    expect(process.env.OUTPUT_FILE).toBe('/setup/.outputs.env');
    expect(runCommand).toHaveBeenNthCalledWith(
      1,
      'pnpm',
      ['exec', 'commons-expo', 'create-project'],
      {cwd: expoDir},
    );
    expect(runCommand).toHaveBeenNthCalledWith(
      2,
      'pnpm',
      ['exec', 'commons-expo', 'import-keystore'],
      {cwd: expoDir},
    );
  });
});
