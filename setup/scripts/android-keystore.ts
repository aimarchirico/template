#!/usr/bin/env node
import {
  loadEnvs,
  runCommand,
  getConfigString,
  getOutputsPath,
} from './utils.js';

loadEnvs();

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.EAS_PROJECT_ID = getConfigString('modules.frontend.easProjectId');
process.env.ANDROID_APPLICATION_ID = getConfigString(
  'modules.frontend.package',
);
process.env.ANDROID_KEY_ALIAS = getConfigString('slug');
process.env.OUTPUT_FILE = getOutputsPath();

runCommand('npx', ['--yes', '@aimarchirico/commons-expo', 'create-keystore']);
