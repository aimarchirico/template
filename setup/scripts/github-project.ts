#!/usr/bin/env node
import {loadEnvs, runCommand, getConfigString} from './utils.js';

loadEnvs();

process.env.PROJECT_TITLE = getConfigString('name');

runCommand('npx', ['--yes', '@aimarchirico/commons-github', 'create-project']);
