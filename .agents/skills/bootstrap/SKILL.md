---
name: bootstrap
description: Initialize project documentation and the issue backlog
---

## When to Use

Use when the user asks to bootstrap or initalize the project, initialize documentation, or set up the issue backlog.

## Execution Steps

### 1. Parse Flags

Determine which initialization steps to run:

- `--no-template`: skip Template Initialization.
- `--no-docs`: skip Documentation Initialization.
- `--no-issues`: skip Issue Backlog Initialization.

### 2. Template Initialization

1. Prompt the user for the following project details:

   - Project name
   - Tech stack and languages
   - A brief description of the project
1. Read `modules.json` [](file:///C:/Users/aimar/dev/template/template.json)to identify the available template modules.
1. Check which modules align with the user's tech stack:

   * If applicable: Utilize the module directory and its corresponding CI/CD workflows for initialization.
   * If not applicable: Delete the module directory and its corresponding CI/CD workflows.
1. Update any generic `template` placeholders with the chosen project name.
1. Delete the `modules.json` file.

### 3. Documentation Initialization

1. Use any previously gathered context and inspect the codebase to supplement with additional details.
2. If any details are still unclear or ambiguous, prompt the user for clarification.
3. Execute the `docs` skill to generate documentation, supplying the full context.

### 4. Issue Backlog Initialization

1. Read `README.md`, `docs/` files, and inspect any modules and CI/CD workflows to map requirements to backlog issues.
2. Execute the `issues` skill to draft and create the hierarchical backlog issues for the identified requirements.

## Supported Flags

- `--no-template`: Skip the template initialization step.
- `--no-docs`: Skip the documentation initialization step.
- `--no-issues`: Skip the issue backlog initialization step.