---
name: implement
description: Orchestrate the development lifecycle starting from an existing issue
---

## Execution Steps

1. Parse the `--issue` flag to extract the `<issue-id>`. Prompt the user if the flag is missing.
2. Execute `gh issue view <issue-id> --json title,labels` to fetch the issue details.
3. Execute `git checkout -b <branch-name>` following the naming rules in `CONTRIBUTING.md`.
4. Analyze requirements. If sub-issues exist, implement them sequentially. If no sub-issues exist, break the issue down into logical technical steps.
5. Execute the `commit` skill iteratively as each sub-issue or logical step is completed.
6. Execute the `docs` skill to update project documentation once implementation is complete.
7. Execute the `commit` skill one final time to commit the documentation updates.
8. Execute `git push -u origin <branch-name>` to push the commits to the remote repository.
9. Execute the `pr` skill to open a pull request. Pass the --draft flag to the `pr` skill if it was provided by the user.

## Supported Flags

Flag --issue: The ID of the existing GitHub issue.
Flag --draft: Create the resulting pull request as a draft.
