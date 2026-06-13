---
name: issues
description: Manage issues for initial backlog generation or ad-hoc creation
---

## Execution Steps

1. Determine the workflow mode and gather context:

   - **Backlog Initialization (if `--init` is passed)**: Read `README.md`, `docs/` files and inspect any modules to map requirements to backlog issues.
   - **New Issues (default)**: Ask the user for details of the issues to create.
1. Map and format the identified work strictly following the hierarchy and conventions defined in `CONTRIBUTING.md#issues` and `.github/ISSUE_TEMPLATE/`. For both workflows, automatically infer any required logical child issues to completely represent the hierarchy of work. Ensure each issue is assigned its issue type label and priority label in the "labels" array based on the definitions in `CONTRIBUTING.md`.
1. Show the drafted hierarchy and wait for user approval.
1. Generate a temporary `issues.json` file containing an `items` array where every node in the hierarchy matches this recursive JSON schema:

   ```json
   {
     "items": [
       {
         "title": "string",
         "body": "string",
         "labels": ["string"],
         "children": [
           /* nested child objects following the same schema */
         ]
       }
     ]
   }
   ```
1. Execute `bash .agents/skills/issues/scripts/create-issues.sh issues.json` (the script automatically deletes the temporary file upon completion).

## Supported Flags

- `--init`: Initialize the project backlog from documentation.