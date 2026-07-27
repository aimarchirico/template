#!/usr/bin/env node
import {getConfigValue} from './utils.js';

const key = process.argv[2];
if (!key) {
  console.error('Usage: config-value.ts <dotted.path|slug>');
  process.exit(1);
}

const value = getConfigValue(key);

if (value === undefined || value === null || value === '') {
  console.error(`config.json has no value at "${key}".`);
  process.exit(1);
}

process.stdout.write(String(value));
