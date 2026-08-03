import path from 'path';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const {loadEnvs, runCommand, rootDir, setupDir} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  runCommand: vi.fn(),
  rootDir: '/repo',
  setupDir: '/repo/setup',
}));
vi.mock('../utils/common.js', () => ({
  loadEnvs,
  runCommand,
  rootDir,
  setupDir,
}));

const originalEnv = {...process.env};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  process.env = {...originalEnv};
});

describe('init-project script', () => {
  it('builds the manifest, renames the project, then installs frontend deps', async () => {
    process.env.GH_PACKAGES_TOKEN = 'gh-token';

    await import('../init-project.js');

    expect(loadEnvs).toHaveBeenCalled();
    expect(runCommand).toHaveBeenNthCalledWith(
      1,
      'pnpm',
      ['exec', 'tsx', 'scripts/utils/build-manifest.ts'],
      {cwd: setupDir},
    );
    expect(process.env.NODE_AUTH_TOKEN).toBe('gh-token');
    expect(process.env.MANIFEST_PATH).toBe(
      path.join(setupDir, 'manifest.resolved.json'),
    );
    expect(runCommand).toHaveBeenNthCalledWith(2, 'pnpm', [
      'exec',
      'commons-project',
      'rename-project',
    ]);
    expect(runCommand).toHaveBeenNthCalledWith(3, 'pnpm', [
      '--dir',
      path.join(rootDir, 'frontend'),
      'install',
      '--lockfile-only',
    ]);
  });
});
