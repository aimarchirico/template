#!/usr/bin/env node
import path from 'path';
import {loadEnvs, runCommand, rootDir, setupDir} from './utils/common.js';

loadEnvs();

runCommand('pnpm', ['exec', 'tsx', 'scripts/utils/build-manifest.ts'], {
  cwd: setupDir,
});
console.log();

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.MANIFEST_PATH = path.join(setupDir, 'manifest.resolved.json');
/**
 * `pnpm exec` must run from setup/ to find commons-project in its own
 * node_modules, but manifest.json's paths are all repo-root-relative -
 * PROJECT_ROOT tells rename-project where to resolve them, independent of
 * the cwd pnpm needs for package resolution.
 */
process.env.PROJECT_ROOT = rootDir;
runCommand('pnpm', ['exec', 'commons-project', 'rename-project']);
console.log();

runCommand('pnpm', [
  '--dir',
  path.join(rootDir, 'frontend'),
  'install',
  '--lockfile-only',
]);
