#!/usr/bin/env node
import {loadEnvs, runCommand, getOutputsPath} from './utils.js';

loadEnvs();

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.OUTPUT_FILE = getOutputsPath();

runCommand('npx', ['--yes', '@aimarchirico/commons-expo', 'create-project']);
runCommand('npx', ['--yes', '@aimarchirico/commons-expo', 'import-keystore']);
