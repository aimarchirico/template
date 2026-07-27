#!/usr/bin/env node
import fs from 'fs';
import {loadEnvs, runCommand} from './utils.js';

loadEnvs();

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
process.env.GITHUB_ENVIRONMENT_SECRETS =
  'api-production=VPS_SSH_KEY;android-production=ANDROID_KEYSTORE_BASE64,ANDROID_KEYSTORE_PASSWORD,ANDROID_KEY_PASSWORD;web-production=CLOUDFLARE_API_TOKEN';

runCommand('npx', ['--yes', '@aimarchirico/commons-github', 'set-secrets']);
