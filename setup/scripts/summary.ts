#!/usr/bin/env node
import fs from 'fs';
import {execSync} from 'child_process';
import {loadEnvs} from './utils/common.js';

loadEnvs();

const name = process.env.NAME || '';
const slug = process.env.SLUG || '';
const environments = process.env.ENVIRONMENTS || '';
const backendPort = process.env.BACKEND_PORT || '';
const outputsFile = process.env.OUTPUTS || '';

const repo = execSync('gh repo view --json name -q .name', {
  encoding: 'utf8',
}).trim();
const nameWithOwner = execSync(
  'gh repo view --json nameWithOwner -q .nameWithOwner',
  {encoding: 'utf8'},
).trim();

console.log();
console.log(`Provisioned ${nameWithOwner}`);
console.log(`  project board    ${name}`);
console.log(`  environments     ${environments}`);
console.log(`  app url          https://${slug}.${process.env.BASE_DOMAIN}`);
console.log(`  api url          https://${process.env.API_HOST}/${slug}`);
console.log(
  `  tunnel route     ${process.env.API_HOST} -> http://localhost:${backendPort}`,
);
console.log(
  `  backend env      ${process.env.VPS_USER}@${process.env.VPS_HOST}:~/docker/${repo}/.env`,
);
console.log('  keystore         EAS, build credentials "production"');
console.log();

if (outputsFile && fs.existsSync(outputsFile)) {
  console.log('Values produced during this run and chained onward:');
  const lines = fs.readFileSync(outputsFile, 'utf8').split('\n');
  for (const line of lines) {
    const [key, value] = line.split('=');
    if (!key) continue;
    if (/SECRET|PASSWORD|TOKEN|BASE64/.test(key)) {
      console.log(`  ${key}=<${value?.length || 0} characters>`);
    } else {
      console.log(`  ${key}=${value}`);
    }
  }
  console.log();
  console.log('Back these up now â€” see setup/README.md#backup-and-recovery.');
}
