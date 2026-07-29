#!/usr/bin/env node
/**
 * Builds the backend's production .env and places it on the VPS.
 *
 * The database credentials and the proxy secret must survive a re-run: the
 * proxy secret has to match the value in the Pages runtime environment, and
 * regenerating either would break a running deployment. So the remote file is
 * read first and its values reused; only what is genuinely absent is generated.
 */

import crypto from 'crypto';
import fs from 'fs';
import {spawnSync} from 'child_process';
import {loadEnvs, getConfigString, getRepoName} from './lib/utils.js';

loadEnvs();

process.env.SLUG = process.env.SLUG || getConfigString('slug');
process.env.BACKEND_PORT =
  process.env.BACKEND_PORT || getConfigString('modules.backend.port');
process.env.REPO = process.env.REPO || getRepoName();

const required = [
  'SLUG',
  'BACKEND_PORT',
  'VPS_HOST',
  'VPS_USER',
  'VPS_SSH_KEY_FILE',
  'REPO',
];
const missing = required.filter(name => !process.env[name]);
if (missing.length) {
  console.error(
    `Missing required environment variables:\n${missing.map(n => `  - ${n}`).join('\n')}`,
  );
  process.exit(1);
}

const {SLUG, VPS_HOST, VPS_USER, VPS_SSH_KEY_FILE, REPO} = process.env;
const remoteDir = `~/docker/${REPO}`;
const secret = () => crypto.randomBytes(32).toString('base64url');

const ssh = (command: string, input?: string) => {
  const result = spawnSync(
    'ssh',
    [
      '-i',
      VPS_SSH_KEY_FILE!,
      '-o',
      'StrictHostKeyChecking=accept-new',
      `${VPS_USER}@${VPS_HOST}`,
      command,
    ],
    {encoding: 'utf8', input},
  );
  if (result.error) {
    console.error(`Could not run ssh: ${result.error.message}`);
    process.exit(1);
  }
  return {
    status: result.status ?? 1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
};

const parse = (text: string): Record<string, string> =>
  Object.fromEntries(
    text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(line => {
        const atIndex = line.indexOf('=');
        return [
          line.slice(0, atIndex),
          line.slice(atIndex + 1).replace(/^"|"$/g, ''),
        ];
      })
      .filter(([name]) => name),
  );

const existing = parse(ssh(`cat ${remoteDir}/.env 2>/dev/null || true`).stdout);

const values = {
  DB_HOST: `${SLUG}-db:5432`,
  DB_USER: existing.DB_USER || SLUG,
  DB_PASSWORD: existing.DB_PASSWORD || secret(),
  PROXY_SECRET: existing.PROXY_SECRET || process.env.PROXY_SECRET || secret(),
};

const reused = Object.keys(values).filter(
  name => existing[name] === values[name as keyof typeof values],
);
const contents = `${Object.entries(values)
  .map(([name, value]) => `${name}="${value}"`)
  .join('\n')}\n`;

const write = ssh(
  `mkdir -p ${remoteDir} && cat > ${remoteDir}/.env && chmod 600 ${remoteDir}/.env`,
  contents,
);
if (write.status !== 0) {
  console.error(`Could not write ${remoteDir}/.env:\n${write.stderr}`);
  process.exit(1);
}

const unchanged = reused.length === Object.keys(values).length;
console.log(
  `${unchanged ? '=' : '~'} ${VPS_USER}@${VPS_HOST}:${remoteDir}/.env: ${
    unchanged ? 'already present' : 'written'
  } (mode 600)`,
);
for (const name of Object.keys(values)) {
  console.log(`  ${name}: ${existing[name] ? 'reused' : 'generated'}`);
}

const scpResult = spawnSync(
  'scp',
  [
    '-i',
    VPS_SSH_KEY_FILE!,
    '-o',
    'StrictHostKeyChecking=accept-new',
    '../backend/compose.yaml',
    '../backend/compose.prod.yaml',
    `${VPS_USER}@${VPS_HOST}:${remoteDir}/`,
  ],
  {stdio: 'inherit'},
);
if (scpResult.status !== 0) {
  console.error(
    `Could not copy docker compose files to remote VPS:\n${scpResult.stderr || ''}`,
  );
  process.exit(scpResult.status ?? 1);
}
console.log(
  `* ${VPS_USER}@${VPS_HOST}:${remoteDir}/compose.yaml, compose.prod.yaml: written`,
);

if (process.env.OUTPUT_FILE) {
  fs.appendFileSync(
    process.env.OUTPUT_FILE,
    `PROXY_SECRET=${values.PROXY_SECRET}\n`,
    {
      mode: 0o600,
    },
  );
}
