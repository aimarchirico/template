# Next.js / Expo (TypeScript)

## Folder Structure
Feature-based folder structure. Top-level source directories:

| Directory | Purpose |
| :--- | :--- |
| `src/app/` | File-based routing (Next.js App Router / Expo Router) |
| `src/features/` | Self-contained feature modules (UI, hooks, utils scoped to a feature) |
| `src/global/` | Shared utilities, hooks, and components used across features |
| `src/api/` | API client, query definitions, and type-safe request functions |

**Rules**: 
- **Dependency Direction**: `app` → `features` → `global` → `api`. Each directory may only import from itself and the directories below it. Enforced by `eslint-plugin-boundaries`.
- **​Isolation**: Cross-feature imports are strictly prohibited. Enforced by `eslint-plugin-boundaries`.


## Language and Framework Standards
- **TypeScript**: strict mode; no implicit `any`. Target `ESNext` with `isolatedModules: true`. Enforced by `tsc --noEmit`.
- **Exports**: named exports only; default exports are banned (`import/no-default-export`), with the exception of `src/app/**` to support file-based routing.
- **Components**: functional components only.

## Styling and Formatting
- **Style Guide**: Google TypeScript Style (`gts`); the shared config used by both ESLint and Prettier.
- **File Names**: `kebab-case` filenames; exception: `_layout.*`. Enforced by `eslint-plugin-check-file`.
- **File Limits**: No file may exceed 300 lines (`max-lines`).
- **Exclusions**: Exclude generated and static asset directories from formatting.
- **Enforcement**: ESLint (framework base config + `gts`) + Prettier (`gts`) + `tsc --noEmit` must all pass.
