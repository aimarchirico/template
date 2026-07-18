---
description: Analyze unstaged changes and create logical, atomic git commits
metadata:
    github-path: skills/commit
    github-ref: refs/tags/commons-docs-v1.3.1
    github-repo: https://github.com/aimarchirico/commons
    github-tree-sha: b5f4b565a5d3d8e2b20539a7d1a22550811fe348
name: commit
---
## When to Use

Use when the user explicitly asks to commit unstaged changes, analyze git diffs
for committing, or run the commit skill.

## Execution Steps

1. Preflight: Verify that `CONTRIBUTING.md` exists in the repository root. If it is missing, run `npx @aimarchirico/commons-docs materialize-templates` to materialize the documentation.
2. Execute `git status` and `git diff` to analyze all unstaged changes (including untracked files).
3. If there are no changes to commit, notify the user and exit.
4. Group the changes into logical, atomic units and draft a commit message for
   each group strictly following the rules in `CONTRIBUTING.md#commits`.
5. Present the proposed commit plan, and wait for explicit user approval.
6. For each approved unit, execute `git add` for those specific files followed
   by `git commit -m` with the approved message.
