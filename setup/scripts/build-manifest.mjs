#!/usr/bin/env node

// Resolves setup/manifest.json into the manifest commons-project consumes.
// The manifest names where each value lives; default.json supplies the source
// strings and config.json the targets, which is what makes the rename
// idempotent: once the sources are replaced, a re-run matches nothing.

import fs from 'fs';
import path from 'path';

const here = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'),
);
const setup = path.resolve(here, '..');

const read = file =>
  JSON.parse(fs.readFileSync(path.join(setup, file), 'utf8'));

const at = (data, dotted) =>
  dotted.split('.').reduce((node, key) => node?.[key], data);

const fail = message => {
  console.error(message);
  process.exit(1);
};

const validatePort = (value, source) => {
  if (!Number.isInteger(value) || value < 1024 || value > 65535) {
    fail(
      `${source}: modules.backend.port must be an integer between 1024 and 65535, got ${JSON.stringify(value)}.`,
    );
  }
};

const manifest = read('manifest.json');
const defaults = read('default.json');
const config = read('config.json');

// The host port must be unique across every project on the VPS. List the
// tunnel's existing ingress rules to find the next free one.
validatePort(at(defaults, 'modules.backend.port'), 'default.json');
validatePort(at(config, 'modules.backend.port'), 'config.json');

const values = {};
const missing = [];

for (const [name, spec] of Object.entries(manifest.values)) {
  const from = at(defaults, spec.path);
  const to = at(config, spec.path);
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
