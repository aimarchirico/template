#!/usr/bin/env node
import {loadEnvs, runCommand, getConfigString} from './utils.js';

loadEnvs();

const backendPort = getConfigString('modules.backend.port');

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_SETUP_TOKEN;
process.env.TUNNEL_HOSTNAME = process.env.API_HOST;
process.env.TUNNEL_SERVICE = `http://localhost:${backendPort}`;

runCommand('pnpm', ['exec', 'commons-cloudflare', 'add-tunnel-route']);
