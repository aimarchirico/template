---
name: bootstrap
description:
  Initialize project documentation and issues. Use when the user asks to
  bootstrap or initialize the project, initialize documentation, or set up
  initial issues.
argument-hint: "[--no-project] [--no-docs] [--no-issues]"
---

## Arguments

| Flag            | Required | Description                                  |
| :-------------- | :------- | :------------------------------------------- |
| `--no-project`  | No       | Skip the project initialization step.        |
| `--no-docs`     | No       | Skip the documentation initialization step.  |
| `--no-issues`   | No       | Skip the issue initialization step.          |

## Workflow

1. **Preflight**: Verify that the `setup/` directory exists in the repository
   root. If it is missing, halt execution and notify the user.
2. **Project Initialization** (skip if `--no-project` is passed):
   1. Read `setup/default.json` to understand the default settings, and
      `setup/README.md` for what each configuration value means.
   2. Prompt the user to customize these settings, including the backend
      host port, which must be unique across projects on the VPS.
   3. Save the customized configuration to `setup/config.json`.
   4. Confirm the user has filled `setup/.env` from `setup/.env.example`
      and that the browser-only prerequisites in `setup/README.md` exist. Run
      `task setup:prerequisites` and report anything missing.
   5. Execute `task setup:init`, which renames the project and chains into
      provisioning. Both it and `task setup` are idempotent and remain in the
      repository afterwards.
3. **Documentation Initialization** (skip if `--no-docs` is passed):
   1. Use any previously gathered context and inspect the codebase to
      supplement with additional details.
   2. If any details are still unclear or ambiguous, prompt the user for
      clarification.
   3. Execute the `commons:docs` skill to generate documentation, supplying
      the full context.
4. **Issue Initialization** (skip if `--no-issues` is passed):
   1. Inspect the codebase, including the documentation from the previous
      step, to identify concrete, actionable units of work not yet tracked
      as issues.
   2. Execute the `commons:issue` skill to draft and create the hierarchical
      issues for the work identified.
