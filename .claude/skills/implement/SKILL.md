---
description: Orchestrate the development lifecycle starting from an existing issue
metadata:
    github-path: skills/implement
    github-ref: refs/tags/commons-convention-v1.5.2
    github-repo: https://github.com/aimarchirico/commons
    github-tree-sha: f170fddac3835e18e991703c060ac9982c88301a
name: implement
---
## When to Use

Use when the user asks to implement an issue.

## Execution Steps

1. Preflight: Verify that `CONTRIBUTING.md` exists in the repository root. If it
   is missing, run `npx @aimarchirico/commons-docs materialize-templates` to
   materialize the documentation.
2. Parse the `--issue` flag to extract the `<issue-id>`. Prompt the user if the
   flag is missing.
3. Execute `gh issue view <issue-id> --json title,labels` to fetch the issue
   details.
4. Execute `git checkout -b <branch-name>` following the naming rules in
   `CONTRIBUTING.md`.
5. Analyze requirements. If sub-issues exist, implement them sequentially. If no
   sub-issues exist, break the issue down into logical technical steps.
6. Execute the `commit` skill iteratively as each sub-issue or logical step is
   completed.
7. Execute the `docs` skill to update project documentation once implementation
   is complete.
8. Execute the `commit` skill one final time to commit the documentation
   updates.
9. Execute `git push -u origin <branch-name>` to push the commits to the remote
   repository.
10. Execute the `pr` skill to open a pull request. Pass the --draft flag to the
    `pr` skill if it was provided by the user.

## Supported Flags

- `--issue`: The ID of the existing GitHub issue.
- `--draft`: Create the resulting pull request as a draft.
