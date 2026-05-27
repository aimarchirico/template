---
name: issues
description: Manage issues for initial backlog generation and ad-hoc creation
allowed-tools: Bash(bash .claude/skills/issues/scripts/create-issues.sh *)
---

1. Ask the user whether they want to generate an initial backlog from documentation or create new ad-hoc issues.
2. Read `CONTRIBUTING.md` and `.github/ISSUE_TEMPLATE/` to understand the issue structure and hierarchy rules to apply.
3. Gather the necessary context based on the user's choice:
    - For an initial backlog, read `README.md`, `docs/`, and module READMEs.
    - For ad-hoc issues, ask for the new issue types and details and automatically infer any required logical children.
4. Map the identified work to issues strictly according to the rules defined in `CONTRIBUTING.md`.
5. Show the drafted hierarchy, ask the user to confirm, edit, or trim, and do not proceed until approved.
6. Generate `issues.json` containing an `items` array where every node in the hierarchy strictly follows this recursive JSON schema: { "title": "string", "body": "string", "label": "string", "children": [ /* nested objects */ ] }.
7. Execute `bash .claude/skills/issues/scripts/create-issues.sh issues.json`.
8. Delete the `issues.json` file.