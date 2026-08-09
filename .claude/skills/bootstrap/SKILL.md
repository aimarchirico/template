---
name: bootstrap
description:
  Initialize a new project's setup and initial issues. Use when the user
  asks to bootstrap or initialize the project or set up initial issues.
argument-hint: "[--no-project] [--no-issues] [--auto]"
---

## Arguments

| Flag           | Required | Description                                      |
| :------------- | :------- | :----------------------------------------------- |
| `--no-project` | No       | Skip the project initialization step.            |
| `--no-issues`  | No       | Skip the issue initialization step.              |
| `--auto`       | No       | Passed through to the issue initialization step. |

## Workflow

1. **Preflight**: Verify that the `setup/` directory exists in the repository
   root. If it is missing, halt execution and notify the user.
1. **Project Initialization** (skip if `--no-project` is passed):
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
1. **Issue Initialization** (skip if `--no-issues` is passed):
    1. Identify the description of the new project to plan from the
       user's prompt or context. Ask the user for clarification if it's not
       already clear.
    2. Invoke the `commons:plan` skill with the identified project
       description, passing `--auto` through if provided (its approval steps
       surface normally unless `--auto` is set).
    3. `commons:plan` will prompt the user for approval before creating the
       initial issue backlog.
