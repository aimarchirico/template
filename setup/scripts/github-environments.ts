#!/usr/bin/env node
import {loadEnvs, runCommand} from './utils.js';

loadEnvs();

process.env.GITHUB_ENVIRONMENTS =
  'api-production,android-production,web-production';

runCommand('pnpm', ['exec', 'commons-github', 'create-environments']);
