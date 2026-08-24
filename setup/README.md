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

## Install

### Prerequisites

These cannot be automated and must exist before `task setup` will succeed.

| What                                                  | Where                                                                      |
| :---------------------------------------------------- | :------------------------------------------------------------------------- |
| A repository generated from the template              | GitHub, use the template, do not fork                                      |
| Two Cloudflare API tokens                             | Cloudflare dashboard → My Profile → API Tokens                             |
| A Cloudflare Tunnel on the VPS                        | Cloudflare Zero Trust → Networks → Tunnels                                 |
| An Access application and policy for the APIs         | Cloudflare Zero Trust → Access → Applications                              |
| An EAS project (ID and owner go in `config.json`)     | [expo.dev](https://expo.dev) → Projects                                    |
| An Expo access token                                  | expo.dev → Account settings → Access tokens                                |
| A GitHub packages token                               | GitHub → Settings → Developer settings → Tokens (classic), `read:packages` |
| A VPS user with an SSH key and a `~/docker` directory | The VPS                                                                    |
| An Android keystore, downloaded to `credentials.json` | `pnpm exec eas credentials --platform android`, every run, see below       |

- **Access policy.** `ACCESS_POLICY_ID` isn't in this repo, find it:

  ```bash
  curl -s -H "Authorization: Bearer $CLOUDFLARE_SETUP_TOKEN" \
    "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/access/policies" \
    | jq -r '.result[] | "\(.id)  \(.name)"'
  ```

- **Android keystore.** Run `pnpm exec eas credentials --platform android`
  from `frontend/apps/expo` (needs the app config there for project
  context). `task setup` reads `credentials.json` back from that same
  directory, nothing to move.

### Environment Variables

Two files, with distinct purposes, each documenting every key inline: `setup/.env`
holds what this module needs locally in order to provision, see
[`.env.example`](.env.example). [`.github/.env.example`](../.github/.env.example)
is the specification of what gets pushed to GitHub: scope, kind, and origin
for every value: and every value in it ends up there.

Two values never reach GitHub, correctly: `PROXY_SECRET`, which is shared
between the Pages runtime environment and the VPS `.env` and belongs to neither
CI nor the repository, and the database credentials, which live only in the VPS
`.env`.

### Installation Steps

Order of operations for a freshly generated repository:

1. Fill [`config.json`](config.json) with the project's details: its name, the
   Kotlin and npm identifiers, the container image, the host port, and the
   EAS project ID and owner from the EAS project created above.
1. Copy [`.env.example`](.env.example) to `.env` and fill it in.
1. Run the rename and provisioning in one step:

   ```bash
   task setup:init
   ```

Both tasks are idempotent. A second run makes no destructive change and reports
every resource as already present.

**The rename is idempotent but not re-targetable.** Once the source strings from
`default.json` have been replaced, editing `config.json` to a third name has no
effect, because the strings the rename would search for are gone. Renaming again
means editing `default.json` to the current values first.

## Usage

Provisioning alone, which is what you run for the rest of the project's life:

```bash
task setup                # every step, in dependency order
task setup:prerequisites  # prerequisites and credentials only
```

Individual steps, for when one value rotates:

| Command                          | Provisions                                        |
| :------------------------------- | :------------------------------------------------ |
| `task setup:github:project`      | The project board, copied from the template's.    |
| `task setup:github:environments` | The three deployment environments.                |
| `task setup:cloudflare:pages`    | The Pages project and its custom domain.          |
| `task setup:cloudflare:tunnel`   | The tunnel ingress route for `API_HOST`.          |
| `task setup:cloudflare:token`    | The Access service token, attached to the policy. |
| `task setup:android:keystore`    | The EAS project link and the keystore secrets.    |
| `task setup:backend:env`         | The backend `.env` and compose files on the VPS.  |
| `task setup:cloudflare:env`      | The Pages runtime environment.                    |
| `task setup:github:variables`    | The repository and environment variables.         |
| `task setup:github:secrets`      | The repository and environment secrets.           |

Order matters when running the whole flow, because outputs chain:
`create-service-token` produces the credentials that become repository variables
and secrets, `create-project` and `import-keystore` produce the
`android-production` signing values,
and `backend:env` produces the proxy secret the Pages environment needs. All
three therefore run before the steps that consume them.

## Development

### Tech Stack

- **Node** 20+: runs the commands via `pnpm exec` and the three helper scripts
- **Task** 3: orchestration, and the only place configuration becomes
  environment
- **GitHub CLI**: resolves the repository and performs the GitHub writes
- **OpenSSH** and **keytool**: the VPS env file and the Android keystore

### Folder Structure

```text
setup/
├── Taskfile.yaml     # orchestration: one task per provisioning step
├── config.json       # this project's identity: the targets of the rename
├── default.json      # the template's strings: the sources of the rename
├── manifest.json     # what the rename touches; all layout knowledge
├── .env.example      # the infrastructure constants and credentials needed here
├── .npmrc            # resolves @aimarchirico packages from GitHub Packages
├── package.json      # this module's own pnpm workspace and its dependencies
└── scripts/
    ├── *.ts          # entry points: one per provisioning task in Taskfile.yaml
    └── utils/
        ├── common.ts         # shared helpers (runCommand, loadEnvs, config access…)
        └── build-manifest.ts # marries manifest.json with both configs
```

Three files are generated and gitignored: `.env` (your credentials),
`manifest.resolved.json` (the manifest handed to Commons), and `.outputs.env`
(the values one command produces for the next). Nothing else is written here:
the signing keystore is stored in EAS, never in this repository.

### Code Quality

This module is its own pnpm workspace, so it owns its checks:
`task setup:check` lints and type-checks the scripts, and `task setup:fix`
applies what ESLint can fix. It deliberately sits outside the frontend
workspace: provisioning runs before the frontend's dependencies are installed,
and a rename that rewrites the frontend's package names must not be able to
invalidate the tooling performing it. Nothing here is compiled; `tsx` runs the
scripts directly.

## Deployment

This module is not deployed. It configures what CI deploys: the environments,
variables, and secrets that
[`.github/workflows/release.yaml`](../.github/workflows/release.yaml) reads when
it deploys the API to the VPS, the web app to Pages at its custom domain, and
builds a signed Android APK.

### Backup and Recovery

Three values cannot be regenerated without consequence. Back them up when
`task setup` reports them.

- **The Android keystore.** Replacing signing keys breaks updates for every
  installed copy of the app: Play and any sideloaded install will refuse the new
  APK.

  This one needs the least of you, because EAS holds it. First, `create-project`
  resolves the project on EAS and registers the project ID. Then,
  `import-keystore` imports the credentials from `credentials.json` into EAS,
  and reads them back to push to GitHub: so no signing key is ever written
  into this repository. An existing setup is never regenerated; the commands
  report them as already present and return the stored values.

  It is the same record the interactive `eas credentials` flow creates, so it is
  visible on the project's credentials page at
  [expo.dev](https://expo.dev) and can be downloaded from there or with
  `npx eas-cli credentials --platform android` if you ever need the file itself.

  Note that the base64 copy pushed to the `android-production` secret is *not* a
  backup: GitHub never lets a secret be read back. EAS is the copy that matters,
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

## Contributing

See [`.github/CONTRIBUTING.md`](../.github/CONTRIBUTING.md).

## License

[MIT](../LICENSE) © Aimár A. Chirico
