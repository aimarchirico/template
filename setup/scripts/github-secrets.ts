#!/usr/bin/env node
import fs from 'fs';
import {loadEnvs, runCommand} from './utils/common.js';

loadEnvs();

const config = JSON.parse(
  fs.readFileSync('./assets/environments.json', 'utf8'),
);

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_DEPLOY_TOKEN;

if (
  process.env.VPS_SSH_KEY_FILE &&
  fs.existsSync(process.env.VPS_SSH_KEY_FILE)
) {
  process.env.VPS_SSH_KEY = fs
    .readFileSync(process.env.VPS_SSH_KEY_FILE, 'utf8')
    .trim();
}

process.env.GITHUB_SECRETS = 'CF_ACCESS_CLIENT_SECRET,GH_PACKAGES_TOKEN';
process.env.GITHUB_ENVIRONMENT_SECRETS = config.environments
  .map(
    (e: {name: string; secrets: string[]}) =>
      `${e.name}=${e.secrets.join(',')}`,
  )
  .join(';');

runCommand('pnpm', ['exec', 'commons-github', 'set-secrets']);
