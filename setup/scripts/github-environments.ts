#!/usr/bin/env node
import fs from 'fs';
import {loadEnvs, runCommand} from './utils/common.js';

loadEnvs();

const config = JSON.parse(
  fs.readFileSync('./assets/environments.json', 'utf8'),
);
process.env.GITHUB_ENVIRONMENTS = config.environments
  .map((e: {name: string}) => e.name)
  .join(',');

runCommand('pnpm', ['exec', 'commons-github', 'create-environments']);
