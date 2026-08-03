import {beforeEach, describe, expect, it, vi} from 'vitest';

const {loadEnvs, runCommand, getConfigString} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  runCommand: vi.fn(),
  getConfigString: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({loadEnvs, runCommand, getConfigString}));

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  getConfigString.mockReset();
  delete process.env.PROJECT_TITLE;
});

describe('github-project script', () => {
  it('creates the project board using the configured name', async () => {
    getConfigString.mockReturnValue('My App');

    await import('../github-project.js');

    expect(loadEnvs).toHaveBeenCalled();
    expect(getConfigString).toHaveBeenCalledWith('name');
    expect(process.env.PROJECT_TITLE).toBe('My App');
    expect(runCommand).toHaveBeenCalledWith('pnpm', [
      'exec',
      'commons-github',
      'create-project',
    ]);
  });
});
