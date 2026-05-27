---
name: docs
description: Initialize and update project documentation
---

1. Ask the user whether to initialize new documentation or update existing documentation.

## Initialization 

1. Ask user for the project name, description, and tech stack. 
2. Read `PLAN.md` and any matching files in the `conventions/` folder. 
3. Ask follow-up questions if technical details are missing.
4. Generate all documentation based on the plan and conventions.
5. Delete `PLAN.md` and the `conventions/` folder.

## Update
1. Read the current `README.md`, `docs/`, and module READMEs.
2. Analyze the codebase, recent git commits, or git diffs to automatically infer new features and architectural changes.
3. Present the inferred updates to the user and wait for approval.
4. Modify the documentation files while maintaining the existing formatting and structural conventions across all files. 