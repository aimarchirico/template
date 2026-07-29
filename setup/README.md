# Setup

Scaffolds a freshly generated project and provisions every external resource it
needs, by orchestrating the generic commands published from
[Commons](https://github.com/aimarchirico/commons) and supplying the
project-specific values itself.

This module is permanent. It is not a scaffold-time scratch directory: it holds
the project's identity, it is read on every provisioning run, and both of its
tasks stay re-runnable for the repository's whole life.

Division of responsibility: Commons owns the mechanics and stays generic, with
no domain, account, tunnel, policy, or layout path in it. This module owns the
rename manifest, the configuration, the infrastructure constants, and the order
the commands run in.

## Tech Stack

- **Node** 20+ — runs the commands via `pnpm exec` and the three helper scripts
- **Task** 3 — orchestration, and the only place configuration becomes
  environment
- **GitHub CLI** — resolves the repository and performs the GitHub writes
- **OpenSSH** and **keytool** — the VPS env file and the Android keystore

## Folder Structure

```text
setup/
├── Taskfile.yaml     # orchestration: one task per provisioning step
├── config.json       # this project's identity — the targets of the rename
├── default.json      # the template's strings — the sources of the rename
├── manifest.json     # what the rename touches; all layout knowledge
├── .env.example      # the infrastructure constants and credentials needed here
├── .npmrc            # resolves @aimarchirico packages from GitHub Packages
├── package.json      # this module's own pnpm workspace and its dependencies
└── scripts/
    ├── *.ts          # entry points — one per provisioning task in Taskfile.yaml
    └── lib/
        ├── utils.ts          # shared helpers (runCommand, loadEnvs, config access…)
        ├── build-manifest.ts # marries manifest.json with both configs
        └── config-value.ts   # reads one config value for a task variable
```

Three files are generated and gitignored: `.env` (your credentials),
`manifest.resolved.json` (the manifest handed to Commons), and `.outputs.env`
(the values one command produces for the next). Nothing else is written here —
the signing keystore is stored in EAS, never in this repository.

## Prerequisites

These cannot be automated and must exist before `task setup` will succeed.

| What                                                  | Where                                                                      |
| :---------------------------------------------------- | :------------------------------------------------------------------------- |
| A repository generated from the template              | GitHub — use the template, do not fork, so the project board can be copied |
| Two Cloudflare API tokens                             | Cloudflare dashboard → My Profile → API Tokens                             |
| A Cloudflare Tunnel on the VPS                        | Cloudflare Zero Trust → Networks → Tunnels                                 |
| An Access application and policy for the APIs         | Cloudflare Zero Trust → Access → Applications                              |
| An EAS project                                        | [expo.dev](https://expo.dev) → Projects                                    |
| An Expo access token                                  | expo.dev → Account settings → Access tokens                                |
| A GitHub packages token                               | GitHub → Settings → Developer settings → Tokens (classic), `read:packages` |
| A VPS user with an SSH key and a `~/docker` directory | The VPS                                                                    |

### Minting the Cloudflare tokens

Two tokens, deliberately separate, because they are used by different parties
with different reach:

| Token                     | Used by                                           | Scopes                                                                                                                          |
| :------------------------ | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARE_SETUP_TOKEN`  | `task setup`, locally                             | Account · Cloudflare Pages:Edit · Account · Cloudflare Tunnel:Edit · Account · Access: Apps and Policies:Edit · Zone · DNS:Edit |
| `CLOUDFLARE_DEPLOY_TOKEN` | CI, as `CLOUDFLARE_API_TOKEN` in `web-production` | Account · Cloudflare Pages:Edit                                                                                                 |

The deploy token only ever publishes a Pages build, so it gets nothing else.

### Finding the Access policy

`ACCESS_POLICY_ID` is the reusable policy the shared API Access application
uses; every project attaches its service token to the same one. Its value is not
recorded in this repository — like every other account, zone, and tunnel
identifier it belongs in `setup/.env`, not in version control. List the
account's policies and take the id of the one the API application references:

```bash
curl -s -H "Authorization: Bearer $CLOUDFLARE_SETUP_TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/access/policies" \
  | jq -r '.result[] | "\(.id)  \(.name)"'
```

### API hostname

The tunnel ingress rule is keyed by hostname, so **each project needs its own
`API_HOST`**. Two projects sharing one hostname would overwrite each other's
route. The backend is still reached under its own context path, so the API URL
is `https://$API_HOST/<slug>`.

### Host port

`modules.backend.port` must be unique across every project on the VPS, since the
tunnel routes to `http://localhost:<port>` on the shared host. List the tunnel's
existing ingress rules to find a free one. The value is validated as an integer
between 1024 and 65535.

### Database

The setup flow assumes nothing exists for the database beyond the VPS itself.
`compose.yaml` runs Postgres as a container and creates the database and role
from the `.env` this module places, and Flyway applies the schema on first boot.
What a maintainer must ensure by hand is only that the VPS has Docker with the
Compose plugin and a `~/docker` directory writable by `VPS_USER`; the database
credentials are generated on the first run and reused on every later one.

## Environment Variables

Two files, with distinct purposes. `setup/.env` holds what this module needs
locally in order to provision; see [`.env.example`](.env.example).
[`.github/.env.example`](../.github/.env.example) is the specification of what
gets pushed to GitHub — every value in it ends up there.

### setup/.env

| Key                       | Meaning                                                               |
| :------------------------ | :-------------------------------------------------------------------- |
| `CLOUDFLARE_ACCOUNT_ID`   | Account owning the Pages project, tunnel, and Access resources.       |
| `CLOUDFLARE_ZONE_ID`      | Zone the custom domain belongs to.                                    |
| `BASE_DOMAIN`             | Domain the web app's custom domain is a subdomain of.                 |
| `API_HOST`                | Public hostname this project's API is reached on. Unique per project. |
| `TUNNEL_ID`               | Existing Cloudflare Tunnel the VPS runs.                              |
| `ACCESS_POLICY_ID`        | Existing Access policy the service token is attached to.              |
| `VPS_HOST`                | VPS the API is deployed to.                                           |
| `VPS_USER`                | User the deploy and this module connect as.                           |
| `VPS_SSH_KEY_FILE`        | Path to that user's private key. Its contents become the secret.      |
| `CLOUDFLARE_SETUP_TOKEN`  | Token this module provisions with.                                    |
| `CLOUDFLARE_DEPLOY_TOKEN` | Token CI deploys Pages with.                                          |
| `GH_PACKAGES_TOKEN`       | Reads `@aimarchirico` packages, here and in CI.                       |
| `EXPO_TOKEN`              | Expo credentials. Also stores and reads back the keystore.            |

### What gets pushed to GitHub

Every value's origin, which is the part worth knowing: `setup/.env` means you
supplied it, `config.json` means it was derived, and *command* means a
provisioning command produced it and the Taskfile chained it onward.

| Key                         | Scope              | Kind     | Origin                                 |
| :-------------------------- | :----------------- | :------- | :------------------------------------- |
| `API_URL`                   | repository         | variable | `config.json` slug + `API_HOST`        |
| `CF_ACCESS_CLIENT_ID`       | repository         | variable | `create-service-token`                 |
| `CF_ACCESS_CLIENT_SECRET`   | repository         | secret   | `create-service-token`                 |
| `GH_PACKAGES_TOKEN`         | repository         | secret   | `setup/.env`                           |
| `VPS_USER`                  | api-production     | variable | `setup/.env`                           |
| `VPS_HOST`                  | api-production     | variable | `setup/.env`                           |
| `VPS_SSH_KEY`               | api-production     | secret   | contents of `VPS_SSH_KEY_FILE`         |
| `ANDROID_KEY_ALIAS`         | android-production | variable | `import-keystore`                      |
| `ANDROID_KEYSTORE_BASE64`   | android-production | secret   | `import-keystore`                      |
| `ANDROID_KEYSTORE_PASSWORD` | android-production | secret   | `import-keystore`                      |
| `ANDROID_KEY_PASSWORD`      | android-production | secret   | `import-keystore`                      |
| `APP_URL`                   | web-production     | variable | `config.json` slug + `BASE_DOMAIN`     |
| `CLOUDFLARE_ACCOUNT_ID`     | web-production     | variable | `setup/.env`                           |
| `CLOUDFLARE_API_TOKEN`      | web-production     | secret   | `setup/.env` `CLOUDFLARE_DEPLOY_TOKEN` |

Two values never reach GitHub, correctly: `PROXY_SECRET`, which is shared
between the Pages runtime environment and the VPS `.env` and belongs to neither
CI nor the repository, and the database credentials, which live only in the VPS
`.env`.

## Local Development

Order of operations for a freshly generated repository:

1. Fill [`config.json`](config.json) with the project's details — its name, the
   Kotlin and npm identifiers, the container image, and the host port.
2. Copy [`.env.example`](.env.example) to `.env` and fill it in.
3. Run the rename and provisioning in one step:

   ```bash
   task setup:init
   ```

Both tasks are idempotent. A second run makes no destructive change and reports
every resource as already present.

**The rename is idempotent but not re-targetable.** Once the source strings from
`default.json` have been replaced, editing `config.json` to a third name has no
effect, because the strings the rename would search for are gone. Renaming again
means editing `default.json` to the current values first.

Provisioning alone, which is what you run for the rest of the project's life:

```bash
task setup                # every step, in dependency order
task setup:prerequisites  # prerequisites and credentials only
```

Individual steps, for when one value rotates:

| Command                           | Provisions                                        |
| :-------------------------------- | :------------------------------------------------ |
| `task setup:github:project`       | The project board, copied from the template's.    |
| `task setup:github:environments`  | The three deployment environments.                |
| `task setup:cloudflare:pages`     | The Pages project and its custom domain.          |
| `task setup:cloudflare:tunnel`    | The tunnel ingress route for `API_HOST`.          |
| `task setup:cloudflare:token`     | The Access service token, attached to the policy. |
| `task setup:android:keystore`     | The Android signing keystore, stored in EAS.      |
| `task setup:backend:env`          | The backend `.env` and compose files on the VPS.  |
| `task setup:cloudflare:pages-env` | The Pages runtime environment.                    |
| `task setup:github:variables`     | The repository and environment variables.         |
| `task setup:github:secrets`       | The repository and environment secrets.           |

Order matters when running the whole flow, because outputs chain:
`create-service-token` produces the credentials that become repository variables
and secrets, `create-project` and `import-keystore` produce the
`android-production` signing values,
and `backend:env` produces the proxy secret the Pages environment needs. All
three therefore run before the steps that consume them.

## Backup and Recovery

Three values cannot be regenerated without consequence. Back them up when
`task setup` reports them.

- **The Android keystore.** Replacing signing keys breaks updates for every
  installed copy of the app — Play and any sideloaded install will refuse the new
  APK.

  This one needs the least of you, because EAS holds it. First, `create-project`
  resolves the project on EAS and registers the project ID. Then,
  `import-keystore` imports the credentials from `credentials.json` into EAS,
  and reads them back to push to GitHub — so no signing key is ever written
  into this repository. An existing setup is never regenerated; the commands
  report them as already present and return the stored values.

  It is the same record the interactive `eas credentials` flow creates, so it is
  visible on the project's credentials page at
  [expo.dev](https://expo.dev) and can be downloaded from there or with
  `npx eas-cli credentials --platform android` if you ever need the file itself.

  Note that the base64 copy pushed to the `android-production` secret is *not* a
  backup — GitHub never lets a secret be read back. EAS is the copy that matters,
  which means the thing to protect is **access to the EAS account**. Keep
  `EXPO_TOKEN` and that account's recovery intact.
- **The Access service token secret.** Cloudflare returns it only at creation.
  On a re-run the command reports the token as already present and leaves it
  alone, so keep the stored value. Rotating means deleting the token first and
  re-running, then updating `CF_ACCESS_CLIENT_SECRET`.
- **The proxy secret.** It must match between the Pages runtime environment and
  the VPS `.env`; if they diverge the backend rejects every proxied request. It
  is durably recorded in exactly those two places, which is why `backend:env`
  reads the existing VPS `.env` first and only generates a secret that is
  genuinely absent.

The database credentials are recorded in the VPS `.env` alongside the proxy
secret. Losing that file without a backup means recreating the role and
restoring the volume.

## Code Quality

This module is its own pnpm workspace, so it owns its checks:
`task setup:check` lints and type-checks the scripts, and `task setup:fix`
applies what ESLint can fix. It deliberately sits outside the frontend
workspace — provisioning runs before the frontend's dependencies are installed,
and a rename that rewrites the frontend's package names must not be able to
invalidate the tooling performing it. Nothing here is compiled; `tsx` runs the
scripts directly.

## Deployment

This module is not deployed. It configures what CI deploys: the environments,
variables, and secrets that
[`.github/workflows/release.yaml`](../.github/workflows/release.yaml) reads when
it deploys the API to the VPS, the web app to Pages at its custom domain, and
builds a signed Android APK.
