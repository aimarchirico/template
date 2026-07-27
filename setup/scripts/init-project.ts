#!/usr/bin/env node
import path from 'path';
import {loadEnvs, runCommand, rootDir, setupDir} from './utils.js';

loadEnvs();

// 1. Build manifest
runCommand('pnpm', ['exec', 'tsx', 'scripts/build-manifest.ts'], {
  cwd: setupDir,
});

// 2. Rename project
process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.MANIFEST_PATH = path.join(setupDir, 'manifest.resolved.json');
runCommand('npx', ['--yes', '@aimarchirico/commons-project', 'rename-project']);

// 3. Regrow the frontend lockfile, which records the renamed workspace packages
runCommand('pnpm', [
  '--dir',
  path.join(rootDir, 'frontend'),
  'install',
  '--lockfile-only',
]);
