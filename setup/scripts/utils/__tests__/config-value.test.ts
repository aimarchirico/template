import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

const {getConfigValue} = vi.hoisted(() => ({getConfigValue: vi.fn()}));
vi.mock('../common.js', () => ({getConfigValue}));

const exitSpy = vi.spyOn(process, 'exit').mockImplementation(code => {
  throw new Error(`exit:${code}`);
});
const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
const writeSpy = vi
  .spyOn(process.stdout, 'write')
  .mockImplementation(() => true);

const originalArgv = process.argv;

beforeEach(() => {
  vi.resetModules();
  getConfigValue.mockReset();
});

afterEach(() => {
  exitSpy.mockClear();
  errorSpy.mockClear();
  writeSpy.mockClear();
  process.argv = originalArgv;
});

describe('config-value script', () => {
  it('exits when no key argument is given', async () => {
    process.argv = ['node', 'config-value.ts'];
    await expect(import('../config-value.js')).rejects.toThrow('exit:1');
    expect(errorSpy).toHaveBeenCalledWith(
      'Usage: config-value.ts <dotted.path|slug>',
    );
  });

  it('exits when the resolved value is missing', async () => {
    process.argv = ['node', 'config-value.ts', 'missing.path'];
    getConfigValue.mockReturnValue(undefined);
    await expect(import('../config-value.js')).rejects.toThrow('exit:1');
    expect(errorSpy).toHaveBeenCalledWith(
      'config.json has no value at "missing.path".',
    );
  });

  it('writes the resolved value to stdout', async () => {
    process.argv = ['node', 'config-value.ts', 'name'];
    getConfigValue.mockReturnValue('My App');
    await import('../config-value.js');
    expect(writeSpy).toHaveBeenCalledWith('My App');
  });
});
