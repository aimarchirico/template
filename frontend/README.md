# Frontend Module

A monorepo for the template frontend containing the Expo host application, client API library, and shared configurations.

## Tech Stack

- **Node.js**: `^20.x`
- **Package Manager**: `pnpm` (Workspace support)
- **Monorepo Tooling**: `Turborepo`
- **Framework**: `Expo SDK 56`
- **Language**: `TypeScript ~6.0`
- **HTTP Client**: `Axios`
- **Linting & Formatting**: `ESLint`, `Prettier`, `GTS`

## Folder Structure

- `apps/expo/`: The main Expo React Native host application.
- `packages/api-client/`: Internal package isolating the OpenAPI client generation and Axios communication logic.
- `tooling/eslint/`: Shared ESLint flat configuration package.
- `tooling/typescript/`: Shared TypeScript base configuration package.
- `tooling/prettier/`: Shared Prettier configuration package.
- `functions/`: Cloudflare Pages functions.
- `public/`: Public assets and routing for Cloudflare Pages web deployment.

### Module Boundary Rules

Workspace constraints and package exports handle module boundaries natively via `pnpm` and Turborepo. Internal packages export their APIs strictly through their `package.json` `exports` map, preventing arbitrary import paths.

## Environment Variables

The module utilizes a `.env` file at the `frontend` root for local environment variables:

- `API_URL`: The base URL of the backend API (e.g. `https://api.example.com`).
- `CF_ACCESS_CLIENT_ID`: Cloudflare Access Client ID (optional, for authenticated environments).
- `CF_ACCESS_CLIENT_SECRET`: Cloudflare Access Client Secret (optional, for authenticated environments).

Refer to [.env.example](.env.example) for the template.

## Local Development

### Installation

Install workspace dependencies from the `frontend` root:

```bash
pnpm install
```

### Available Commands

All task executions are orchestrated by Turborepo:

- **Start Dev Server**: Start the Expo development server.

  ```bash
  task run
  # or
  pnpm dev
  ```

- **Lint & Type Check**: Run code quality checks.

  ```bash
  task check
  # or
  pnpm check
  ```

- **Fix Lint**: Automate fixing ESLint violations.

  ```bash
  task fix
  # or
  pnpm fix
  ```

- **Generate API Client**: Fetch backend spec and generate internal API package code.

  ```bash
  task api
  # or
  pnpm api
  ```

- **Build APK**: Build the Expo Android application.

  ```bash
  task build
  ```

## Code Quality

- **ESLint**: Custom configuration extending `eslint-config-expo` and `gts`. Boundaries are enforced by pnpm workspace boundaries.
- **Prettier**: Inherited code styling from GTS.
- **TypeScript**: Strict type check configuration.

## Deployment

Deployments are automated through GitHub Actions:

- **Android deployment** (`.github/workflows/frontend-android.yml`): Triggers on `frontend-v*` tags, builds the release APK via `task ci:android`, and uploads the release asset.
- **Web deployment** (`.github/workflows/frontend-web.yml`): Triggers on `frontend-v*` tags, exports the web application, and deploys the static files to Cloudflare Pages.
