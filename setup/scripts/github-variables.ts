#!/usr/bin/env node
import {loadEnvs, runCommand, getConfigString} from './utils.js';

loadEnvs();

const slug = getConfigString('slug');

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.API_URL = `https://${process.env.API_HOST}/${slug}`;
process.env.APP_URL = `https://${slug}.${process.env.BASE_DOMAIN}`;
process.env.GITHUB_VARIABLES = 'API_URL,CF_ACCESS_CLIENT_ID';
process.env.GITHUB_ENVIRONMENT_VARIABLES =
  'api-production=VPS_USER,VPS_HOST;android-production=ANDROID_KEY_ALIAS;web-production=APP_URL,CLOUDFLARE_ACCOUNT_ID';

runCommand('pnpm', ['exec', 'commons-github', 'sync-variables']);
