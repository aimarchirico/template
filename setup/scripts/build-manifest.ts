#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import {atPath, readJson, setupDir as setup, type JsonValue} from './utils.js';

type ValueSpec = {path: string; format?: string};

type Manifest = {
  values: Record<string, ValueSpec>;
  replacements?: JsonValue[];
  moves?: JsonValue[];
  deletes?: JsonValue[];
};

const read = <T>(file: string): T => readJson<T>(path.join(setup, file));

const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

const validatePort = (value: JsonValue | undefined, source: string): void => {
  if (
    typeof value !== 'number' ||
    !Number.isInteger(value) ||
    value < 1024 ||
    value > 65535
  ) {
    fail(
      `${source}: modules.backend.port must be an integer between 1024 and 65535, got ${JSON.stringify(value)}.`,
    );
  }
};

const manifest = read<Manifest>('manifest.json');
const defaults = read<JsonValue>('default.json');
const config = read<JsonValue>('config.json');

validatePort(atPath(defaults, 'modules.backend.port'), 'default.json');
validatePort(atPath(config, 'modules.backend.port'), 'config.json');

const values: Record<string, {from: string; to: string}> = {};
const missing: string[] = [];

for (const [name, spec] of Object.entries(manifest.values)) {
  const from = atPath(defaults, spec.path);
  const to = atPath(config, spec.path);
  if (from === undefined) missing.push(`default.json is missing ${spec.path}`);
  if (to === undefined) missing.push(`config.json is missing ${spec.path}`);
  if (from === undefined || to === undefined) continue;
  const format = spec.format ?? '{}';
  values[name] = {
    from: format.replace('{}', String(from)),
    to: format.replace('{}', String(to)),
  };
}

if (missing.length) {
  fail(
    `Configuration is incomplete:\n${missing.map(m => `  - ${m}`).join('\n')}`,
  );
}

const resolved = {
  values,
  replacements: manifest.replacements ?? [],
  moves: manifest.moves ?? [],
  deletes: manifest.deletes ?? [],
};

const target = path.join(setup, 'manifest.resolved.json');
fs.writeFileSync(target, `${JSON.stringify(resolved, null, 2)}\n`);
console.log(
  `Resolved manifest written to ${path.relative(process.cwd(), target)}`,
);
