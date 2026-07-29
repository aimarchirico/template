#!/usr/bin/env node
import {
  loadEnvs,
  runCommand,
  getConfigString,
  getOutputsPath,
} from './lib/utils.js';

loadEnvs();

const slug = getConfigString('slug');

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_SETUP_TOKEN;
process.env.OUTPUT_FILE = getOutputsPath();
process.env.SERVICE_TOKEN_NAME = `${slug}-ci`;

runCommand('pnpm', ['exec', 'commons-cloudflare', 'create-service-token']);
