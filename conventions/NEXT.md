# Coding Conventions: Next.js / Expo

## Folder Structure
Feature-based layout. Top-level source directories:

| Directory | Purpose |
| :--- | :--- |
| `src/app/` | File-based routing (Next.js App Router / Expo Router) |
| `src/features/` | Self-contained feature modules (UI, hooks, utils scoped to a feature) |
| `src/global/` | Shared utilities, hooks, and components used across features |
| `src/api/` | API client, query definitions, and type-safe request functions |

**Rules**: Features may only import from themselves, `global`, and `api`. Cross-feature imports are prohibited.

## Language Standards
TypeScript strict mode; no implicit `any`. Target `ESNext` with `isolatedModules: true`.

## Framework Patterns
Functional components only.

## Styling
Google TypeScript Style (gts) via Prettier. Exclude generated and static asset directories from formatting.

## Linting/Formatting
ESLint (framework base config + `gts`) + Prettier + `tsc --noEmit` must all pass.

## ESLint Rules
The following is enforced by ESLint at lint time:

- **Named exports**: default exports banned (`import/no-default-export`); exception: `src/app/**` (file-based routing).
- **File naming**: `kebab-case` filenames (`check-file`); exception: `_layout.*`.
- **Module boundaries**: features may only import from themselves, `global`, and `api`; cross-feature imports are prohibited (`eslint-plugin-boundaries`).
- **File size**: no file may exceed 300 lines (`max-lines`).
