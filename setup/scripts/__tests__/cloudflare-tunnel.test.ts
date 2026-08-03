import {beforeEach, describe, expect, it, vi} from 'vitest';

const {loadEnvs, runCommand, getConfigString} = vi.hoisted(() => ({
  loadEnvs: vi.fn(),
  runCommand: vi.fn(),
  getConfigString: vi.fn(),
}));
vi.mock('../utils/common.js', () => ({loadEnvs, runCommand, getConfigString}));

const originalEnv = {...process.env};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  runCommand.mockReset();
  getConfigString.mockReset();
  process.env = {...originalEnv};
});

describe('cloudflare-tunnel script', () => {
  it('adds a tunnel route to the configured backend port', async () => {
    getConfigString.mockImplementation((key: string) =>
      key === 'modules.backend.port' ? '8080' : 'my-app',
    );
    process.env.API_HOST = 'api.example.com';

    await import('../cloudflare-tunnel.js');

    expect(loadEnvs).toHaveBeenCalled();
    expect(process.env.TUNNEL_HOSTNAME).toBe('api.example.com');
    expect(process.env.TUNNEL_SERVICE).toBe('http://localhost:8080');
    expect(process.env.TUNNEL_PATH).toBe('my-app');
    expect(runCommand).toHaveBeenCalledWith('pnpm', [
      'exec',
      'commons-cloudflare',
      'add-tunnel-route',
    ]);
  });
});
