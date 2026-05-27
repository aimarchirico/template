---
name: issues
description: Generate the initial issue backlog from project documentation
---

Requires the `gh-sub-issue` extension: `gh extension install yahsan2/gh-sub-issue`.

1. Read `CONTRIBUTING.md`, `.github/ISSUE_TEMPLATE/` and the docs: `README.md`, `docs/`, each `<module>/README.md`. Apply every rule those files state.
2. Map docs to issues:
  - **Epic** per feature area in `README.md`.
  - **Story** per user flow in `DESIGN.md`.
  - **Task** per technical work item in `API.md` / `ARCHITECTURE.md` / module READMEs.
   - **Subtask** for granular steps only when the docs make them obvious; otherwise leave the parent atomic.
3. Show the drafted hierarchy and ask the user to confirm, edit, or trim. Do not create issues until approved.
4. For every issue, source its label and body shape from the matching `.github/ISSUE_TEMPLATE/<type>.yml`:
   - `--label` value comes from the template's `labels:` field, exactly as written (case-sensitive, e.g. `Epic`, `Story`, `Task`, `Subtask`). Do not invent labels.
   - The body must render each `body:` field as a `### <label>` markdown section, in the order the template defines them. Do not skip fields or invent extra sections.
5. Create parents first so sub-issue links have a target:
   - Epics: `gh issue create --label <Label> --title "..." --body "..."`, capturing the returned number.
   - Children: `gh sub-issue create --parent <num> --label <Label> --title "..." --body "..."`.