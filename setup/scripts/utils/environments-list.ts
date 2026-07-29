#!/usr/bin/env node
import fs from 'fs';

const config = JSON.parse(
  fs.readFileSync('./scripts/assets/environments.json', 'utf8'),
);
const names = config.environments.map((e: {name: string}) => e.name).join(',');

if (!names) {
  console.error('No environments found in environments.json');
  process.exit(1);
}

process.stdout.write(names);
