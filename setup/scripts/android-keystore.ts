#!/usr/bin/env node
import {loadEnvs, runCommand, getOutputsPath} from './utils/common.js';

loadEnvs();

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.OUTPUT_FILE = getOutputsPath();

runCommand('pnpm', ['exec', 'commons-expo', 'create-project']);
runCommand('pnpm', ['exec', 'commons-expo', 'import-keystore']);
