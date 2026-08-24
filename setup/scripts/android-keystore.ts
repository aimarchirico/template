#!/usr/bin/env node
import path from 'path';
import {loadEnvs, runCommand, getOutputsPath, rootDir} from './utils/common.js';

loadEnvs();

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.OUTPUT_FILE = getOutputsPath();

/**
 * Both `eas init` and `eas credentials` need app.config.ts and eas.json for
 * project context, and `eas credentials` downloads credentials.json into
 * whatever directory it runs from - run both commands directly in
 * frontend/apps/expo instead of setup/, which has neither.
 */
const expoDir = path.join(rootDir, 'frontend', 'apps', 'expo');

runCommand('pnpm', ['exec', 'commons-expo', 'create-project'], {cwd: expoDir});
console.log();
runCommand('pnpm', ['exec', 'commons-expo', 'import-keystore'], {cwd: expoDir});
