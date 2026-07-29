#!/usr/bin/env node
import path from 'path';
import {loadEnvs, runCommand, rootDir, setupDir} from './utils/common.js';

loadEnvs();

runCommand('pnpm', ['exec', 'tsx', 'scripts/lib/build-manifest.ts'], {
  cwd: setupDir,
});

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.MANIFEST_PATH = path.join(setupDir, 'manifest.resolved.json');
runCommand('pnpm', ['exec', 'commons-project', 'rename-project']);

runCommand('pnpm', [
  '--dir',
  path.join(rootDir, 'frontend'),
  'install',
  '--lockfile-only',
]);
