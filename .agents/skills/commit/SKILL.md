---
name: commit
description: Analyze unstaged changes and create logical, atomic git commits
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *) Bash(git diff *)
---

1. Execute `git status` and `git diff` to analyze all unstaged changes.
2. Read `CONTRIBUTING.md` to strictly follow the repository commit message conventions.
3. Group the unstaged changes into logical, atomic units, and draft a specific commit message for each logical group. Do not bundle unrelated features or fixes. 
4. Display the proposed commit plan (showing the exact files and message for each commit), ask the user to confirm or edit, and do not proceed until approved.
5. For each approved unit, execute `git add` for those specific files followed by `git commit -m` with the approved text.