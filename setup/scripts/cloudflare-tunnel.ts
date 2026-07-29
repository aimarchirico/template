#!/usr/bin/env node
import {loadEnvs, runCommand, getConfigString} from './lib/utils.js';

loadEnvs();

const backendPort = getConfigString('modules.backend.port');
const slug = getConfigString('slug');

process.env.NODE_AUTH_TOKEN = process.env.GH_PACKAGES_TOKEN;
process.env.CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_SETUP_TOKEN;
process.env.TUNNEL_HOSTNAME = process.env.API_HOST;
process.env.TUNNEL_SERVICE = `http://localhost:${backendPort}`;
process.env.TUNNEL_PATH = slug;

runCommand('pnpm', ['exec', 'commons-cloudflare', 'add-tunnel-route']);
