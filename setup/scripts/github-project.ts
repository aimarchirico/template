#!/usr/bin/env node
import {loadEnvs, runCommand, getConfigString} from './utils/common.js';

loadEnvs();

process.env.PROJECT_TITLE = getConfigString('name');

runCommand('pnpm', ['exec', 'commons-github', 'create-project']);
