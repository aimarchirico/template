#!/usr/bin/env node

// Prints one value from config.json so the Taskfile can turn configuration
// into task variables. Accepts a dotted path, or "slug" for the lowercased,
// separator-free project name used as the npm name, scheme, and context path.

import fs from 'fs';
import path from 'path';

const here = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'),
);
const config = JSON.parse(
  fs.readFileSync(path.resolve(here, '..', 'config.json'), 'utf8'),
);

const key = process.argv[2];
if (!key) {
  console.error('Usage: config-value.mjs <dotted.path|slug>');
  process.exit(1);
}

const value =
  key === 'slug'
    ? config.name.replace(/[^A-Za-z0-9]+/g, '').toLowerCase()
    : key.split('.').reduce((node, part) => node?.[part], config);

if (value === undefined || value === null || value === '') {
  console.error(`config.json has no value at "${key}".`);
  process.exit(1);
}

process.stdout.write(String(value));
