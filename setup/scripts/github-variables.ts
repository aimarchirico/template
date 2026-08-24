#!/usr/bin/env node
import fs from 'fs';
import {loadEnvs, runCommand, getConfigString} from './utils/common.js';

loadEnvs();

const slug = getConfigString('slug');
const config = JSON.parse(
  fs.readFileSync('./scripts/assets/environments.json', 'utf8'),
);

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.API_URL = `https://${process.env.API_HOST}/${slug}`;
process.env.APP_URL = `https://${slug}.${process.env.BASE_DOMAIN}`;
process.env.GITHUB_VARIABLES = 'API_URL,CF_ACCESS_CLIENT_ID';
process.env.GITHUB_ENVIRONMENT_VARIABLES = config.environments
  .map(
    (e: {name: string; variables: string[]}) =>
      `${e.name}=${e.variables.join(',')}`,
  )
  .join(';');

runCommand('pnpm', ['exec', 'commons-github', 'sync-variables']);
