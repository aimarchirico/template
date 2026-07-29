#!/usr/bin/env node
import {
  loadEnvs,
  runCommand,
  getConfigString,
  getRepoName,
} from './lib/utils.js';

loadEnvs();

const slug = getConfigString('slug');

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_SETUP_TOKEN;
process.env.PAGES_PROJECT_NAME = getRepoName();
process.env.API_URL = `https://${process.env.API_HOST}/${slug}`;
process.env.PAGES_VARIABLES = 'API_URL,PROXY_SECRET';

runCommand('pnpm', ['exec', 'commons-cloudflare', 'set-pages-env']);
