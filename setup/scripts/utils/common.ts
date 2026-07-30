import fs from 'fs';
import path from 'path';
import {spawnSync, type SpawnSyncOptions} from 'child_process';

const here = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'),
);
/** Path to the setup directory. */
export const setupDir = path.resolve(here, '..');
/** Path to the root directory. */
export const rootDir = path.resolve(here, '../..');

/** Represents any valid JSON value. */
export type JsonValue =
  string | number | boolean | null | JsonValue[] | {[key: string]: JsonValue};

/**
 * Reads and parses a JSON file.
 *
 * @param file Path to the JSON file.
 * @returns The parsed JSON object.
 */
export function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
}

/**
 * Accesses a nested property in a JSON object using a dot-separated path.
 *
 * @param data The JSON data object.
 * @param dotted The dot-separated property path.
 * @returns The property value, or undefined if not found.
 */
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

/**
 * Loads environment variables from .env files.
 */
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

/**
 * Runs a shell command synchronously and exits if the command fails.
 *
 * @param command The command to execute.
 * @param args Arguments to pass to the command.
 * @param options Options for spawning the process.
 * @returns The spawn sync result.
 */
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

/**
 * Retrieves the repository name using the GitHub CLI.
 *
 * @returns The name of the repository.
 */
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

/**
 * Retrieves a configuration value by key from config.json.
 *
 * @param key The key to retrieve.
 * @returns The configuration value, or undefined.
 */
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

/**
 * Retrieves a configuration value as a string from config.json.
 *
 * @param key The key to retrieve.
 * @returns The configuration value as a string.
 */
export function getConfigString(key: string): string {
  const value = getConfigValue(key);
  if (value === undefined || value === null || typeof value === 'object') {
    console.error(`config.json has no scalar value at "${key}".`);
    process.exit(1);
  }
  return String(value);
}

/**
 * Gets the path to the environment output variables file.
 *
 * @returns The path to the outputs file.
 */
export function getOutputsPath(): string {
  return path.join(setupDir, '.outputs.env');
}
