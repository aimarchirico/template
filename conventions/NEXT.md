# Coding Conventions: Next.js / Expo

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
