---
name: docs
description: Initialize or update project documentation
---

## Execution Steps

1. Determine the mode: If the user passes the `--init` flag, proceed with **Initialization**. Otherwise, proceed with **Update**.

## Initialization

1. Ask the user for the project name, description, tech stack, and any missing technical details.
2. Read `PLAN.md` and any files in `conventions/`, which serve as the absolute source of truth for the required files, structure, content, and guidelines. 
3. Generate the exact files and sections specified in `PLAN.md`.
4. Delete `PLAN.md` and the `conventions/` folder if they were processed.

## Update

1. Analyze the codebase, recent commits, and `git diff` to automatically infer new features and architectural changes.
2. Present proposed updates and wait for user approval.
3. Apply the approved edits to `README.md` and `docs/` files while maintaining their formatting and structural conventions.

## Supported Flags

- `--init`: Run the initialization workflow.