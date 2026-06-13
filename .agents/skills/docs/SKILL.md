---
name: docs
description: Initialize or update project documentation and align workflows
---

## Execution Steps

1. Determine the mode: If the user passes the `--init` flag, proceed with **Initialization**. Otherwise, proceed with **Update**.

## Initialization

1. Ask the user for the project name, description, tech stack, and any missing technical details.
2. Determine if `backend/` and `frontend/` template modules align with the tech stack:

   * If applicable: Utilize the modules and their corresponding CI/CD workflows for initialization.
   * If not applicable: Delete the modules and their corrensponding CI/CD workflows.
3. Update any generic `template` placeholders with the chosen project name.
4. Generate the exact files and sections specified in `PLAN.md`.
5. Delete `PLAN.md` if it was processed. 

## Update

1. Analyze the codebase, including `.github/workflows/`, recent commits, and `git diff` to automatically infer new features, CI/CD requirements, and architectural changes.
2. Present proposed updates and wait for user approval.
3. Apply the approved edits to `docs/` and README files while maintaining their formatting and structural conventions, ensuring any changes to CI/CD pipelines or deployment environments are accurately documented.

## Supported Flags

- `--init`: Run the initialization workflow.