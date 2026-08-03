import fs from 'fs';
import {execSync} from 'child_process';
import {beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('child_process', () => ({execSync: vi.fn()}));

const {loadEnvs} = vi.hoisted(() => ({loadEnvs: vi.fn()}));
vi.mock('../utils/common.js', () => ({loadEnvs}));

const existsSyncSpy = vi.spyOn(fs, 'existsSync');
const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');
const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

const originalEnv = {...process.env};

beforeEach(() => {
  vi.resetModules();
  loadEnvs.mockReset();
  existsSyncSpy.mockReset();
  readFileSyncSpy.mockReset();
  logSpy.mockClear();
  vi.mocked(execSync).mockReset();
  process.env = {...originalEnv};
});

describe('summary script', () => {
  it('prints a provisioning summary without an outputs file', async () => {
    vi.mocked(execSync).mockImplementation((command: unknown) =>
      String(command).includes('nameWithOwner') ? 'me/my-app\n' : 'my-app\n',
    );
    existsSyncSpy.mockReturnValue(false);
    process.env.NAME = 'My App';
    process.env.SLUG = 'my-app';
    process.env.ENVIRONMENTS = 'staging,production';
    process.env.BACKEND_PORT = '8080';
    process.env.BASE_DOMAIN = 'example.com';
    process.env.API_HOST = 'api.example.com';
    process.env.VPS_USER = 'user';
    process.env.VPS_HOST = 'host';

    await import('../summary.js');

    expect(loadEnvs).toHaveBeenCalled();
    const printed = logSpy.mock.calls.map(call => call.join(' ')).join('\n');
    expect(printed).toContain('Provisioned me/my-app');
    expect(printed).toContain('app url          https://my-app.example.com');
    expect(printed).toContain(
      'api url          https://api.example.com/my-app',
    );
    expect(printed).not.toContain('Values produced during this run');
  });

  it('masks sensitive output values and prints the rest as-is', async () => {
    vi.mocked(execSync).mockReturnValue('my-app\n');
    existsSyncSpy.mockReturnValue(true);
    readFileSyncSpy.mockReturnValue(
      ['PROXY_SECRET=abcdefgh', 'API_URL=https://api.example.com'].join('\n'),
    );
    process.env.OUTPUTS = '/setup/.outputs.env';

    await import('../summary.js');

    const printed = logSpy.mock.calls.map(call => call.join(' ')).join('\n');
    expect(printed).toContain('PROXY_SECRET=<8 characters>');
    expect(printed).toContain('API_URL=https://api.example.com');
  });
});
