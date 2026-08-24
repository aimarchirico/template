#!/usr/bin/env node
import {context} from '@aimarchirico/commons-project';
import {
  loadEnvs,
  runCommand,
  getConfigString,
  getRepoName,
  getOutputsPath,
} from './utils/common.js';

loadEnvs();

const required = ['VPS_HOST', 'VPS_USER', 'VPS_SSH_KEY_FILE'];
const missing = required.filter(name => !process.env[name]);
if (missing.length) {
  console.error(
    `Missing required environment variables:\n${missing.map(n => `  - ${n}`).join('\n')}`,
  );
  process.exit(1);
}

const {VPS_HOST, VPS_USER, VPS_SSH_KEY_FILE} = process.env;
context('VPS', `${VPS_USER}@${VPS_HOST}`, 'from VPS_HOST/VPS_USER');

const slug = getConfigString('slug');
const remoteDir = `~/docker/${getRepoName()}`;

process.env.OUTPUT_FILE = getOutputsPath();
process.env.SSH_HOST = VPS_HOST;
process.env.SSH_USER = VPS_USER;
process.env.SSH_KEY_FILE = VPS_SSH_KEY_FILE;
process.env.REMOTE_ENV_PATH = `${remoteDir}/.env`;
process.env.ENV_VALUES = `DB_HOST=${slug}-db:5432`;
process.env.ENV_DEFAULTS = `DB_USER=${slug}`;
process.env.ENV_SECRET_KEYS = 'DB_PASSWORD,PROXY_SECRET';
process.env.OUTPUT_KEYS = 'PROXY_SECRET';

runCommand('pnpm', ['exec', 'commons-ssh', 'sync-env']);

process.env.REMOTE_DIR = remoteDir;
process.env.LOCAL_FILES =
  '../backend/compose.yaml,../backend/compose.prod.yaml';

runCommand('pnpm', ['exec', 'commons-ssh', 'copy-files']);
