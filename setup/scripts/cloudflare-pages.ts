#!/usr/bin/env node
import {loadEnvs, runCommand, getConfigString, getRepoName} from './utils.js';

loadEnvs();

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_SETUP_TOKEN;
process.env.PAGES_PROJECT_NAME = getRepoName();
process.env.PAGES_CUSTOM_DOMAIN = `${getConfigString('slug')}.${process.env.BASE_DOMAIN}`;

runCommand('pnpm', ['exec', 'commons-cloudflare', 'create-pages-project']);
