import fs from 'fs';
import path from 'path';
import {spawnSync, type SpawnSyncOptions} from 'child_process';

const here = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'),
);
export const setupDir = path.resolve(here, '..');
export const rootDir = path.resolve(here, '../..');

export type JsonValue =
  string | number | boolean | null | JsonValue[] | {[key: string]: JsonValue};

export function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
}

export function atPath(
  data: JsonValue | undefined,
  dotted: string,
): JsonValue | undefined {
  return dotted
    .split('.')
    .reduce<JsonValue | undefined>(
      (node, part) =>
        node && typeof node === 'object' && !Array.isArray(node)
          ? node[part]
          : undefined,
      data,
    );
}

export function loadEnvs(): void {
  const envFiles = [
    path.join(rootDir, '.env'),
    path.join(setupDir, '.env'),
    path.join(setupDir, '.outputs.env'),
  ];
  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const index = trimmed.indexOf('=');
        if (index === -1) continue;
        const key = trimmed.slice(0, index).trim();
        const value = trimmed
          .slice(index + 1)
          .trim()
          .replace(/^"|"$/g, '');
        process.env[key] = value;
      }
    }
  }
}

export function runCommand(
  command: string,
  args: string[] = [],
  options: SpawnSyncOptions = {},
): ReturnType<typeof spawnSync> {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
    env: {...process.env},
    ...options,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
  return result;
}

export function getRepoName(): string {
  const result = spawnSync(
    'gh',
    ['repo', 'view', '--json', 'name', '-q', '.name'],
    {
      encoding: 'utf8',
    },
  );
  if (result.status !== 0) {
    console.error('Could not get repository name via gh CLI.');
    process.exit(1);
  }
  return result.stdout.trim();
}

export function getConfigValue(key: string): JsonValue | undefined {
  const configPath = path.resolve(setupDir, 'config.json');
  if (!fs.existsSync(configPath)) {
    console.error(`config.json not found at ${configPath}`);
    process.exit(1);
  }
  const config = readJson<JsonValue>(configPath);
  if (key === 'slug') {
    return String(atPath(config, 'name'))
      .replace(/[^A-Za-z0-9]+/g, '')
      .toLowerCase();
  }
  return atPath(config, key);
}

export function getConfigString(key: string): string {
  const value = getConfigValue(key);
  if (value === undefined || value === null || typeof value === 'object') {
    console.error(`config.json has no scalar value at "${key}".`);
    process.exit(1);
  }
  return String(value);
}

export function getOutputsPath(): string {
  return path.join(setupDir, '.outputs.env');
}
