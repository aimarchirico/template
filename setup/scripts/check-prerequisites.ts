#!/usr/bin/env node
import fs from 'fs';
import {spawnSync} from 'child_process';
import {loadEnvs, getOutputsPath} from './utils.js';

// Delete outputs file
const outputsPath = getOutputsPath();
if (fs.existsSync(outputsPath)) {
  fs.unlinkSync(outputsPath);
}

loadEnvs();

const missing: string[] = [];

// 1. Check tools on PATH
const tools = ['node', 'npx', 'pnpm', 'gh', 'ssh', 'scp', 'keytool'];
for (const tool of tools) {
  const isWindows = process.platform === 'win32';
  const checkCmd = isWindows ? 'where' : 'which';
  const result = spawnSync(checkCmd, [tool]);
  if (result.status !== 0) {
    missing.push(`${tool} is not on PATH`);
  }
}

// 2. Check gh auth status
const ghAuth = spawnSync('gh', ['auth', 'status']);
if (ghAuth.status !== 0) {
  missing.push('gh is not authenticated (run: gh auth login)');
}

// 3. Check env variables
const requiredEnv = [
  'CLOUDFLARE_ACCOUNT_ID',
  'CLOUDFLARE_SETUP_TOKEN',
  'CLOUDFLARE_DEPLOY_TOKEN',
  'CLOUDFLARE_ZONE_ID',
  'BASE_DOMAIN',
  'API_HOST',
  'TUNNEL_ID',
  'ACCESS_POLICY_ID',
  'VPS_HOST',
  'VPS_USER',
  'VPS_SSH_KEY_FILE',
  'GH_PACKAGES_TOKEN',
  'EXPO_TOKEN',
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    missing.push(`${key} is not set in setup/.env`);
  }
}

// 4. Check VPS_SSH_KEY_FILE exists
const sshKeyPath = process.env.VPS_SSH_KEY_FILE;
if (sshKeyPath && !fs.existsSync(sshKeyPath)) {
  missing.push(`VPS_SSH_KEY_FILE does not point at a file (${sshKeyPath})`);
}

if (missing.length > 0) {
  console.error('setup cannot run yet:');
  missing.forEach(m => console.error(`  - ${m}`));
  process.exit(1);
}

console.log('= prerequisites: already present');
console.log(`
Browser-only prerequisites setup cannot automate. Confirm each exists
before continuing — setup/README.md documents how to mint them:

  - the two Cloudflare API tokens, the tunnel, and the Access
    application and policy this project reuses
  - the EAS project the app links to
  - the VPS user, its SSH key, and ~/docker on the VPS
  - the GitHub packages token and the Expo token
`);
