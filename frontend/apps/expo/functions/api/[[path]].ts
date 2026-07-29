/**
 * Cloudflare Pages Function that reverse-proxies `/api/*` to the backend.
 * The implementation lives in @aimarchirico/commons-cloudflare so it stays in
 * sync across services.
 */
export {onRequest} from '@aimarchirico/commons-cloudflare/proxy';
