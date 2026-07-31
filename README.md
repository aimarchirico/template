# Template

A full-stack monorepo template with a Spring Boot backend and an Expo
frontend, wired together with shared tooling, CI/CD, contribution guidelines,
and agent skills.

## Features

- Spring Boot backend built with Gradle
- Expo frontend built with PNPM
- Idempotent scaffolding and provisioning of every external resource
- Task-based command orchestration
- Shared tooling for commits, docs and versioning
- Workflows for CI, deployment, and releases
- Automated dependency updates
- Issue and pull request templates
- Contribution and documentation guidelines
- Agent skills for the development workflow

## Getting Started

The project can be initialized either using the AI agent or manually:

### Agent Initialization

Use this repository as a template on GitHub, then run the `/bootstrap` skill
to initialize the project.

### Manual Initialization

1. Configure [`setup/config.json`](setup/config.json) with the project's details
   and `setup/.env` with the infrastructure constants and credentials. See
   [`setup/README.md`](setup/README.md) for what each value means and which
   prerequisites must exist first.
2. Rename the project and provision everything it needs:

   ```bash
   task setup:init
   ```

3. Create documentation and issues according to the guidelines in [`CONTRIBUTING.md`](.github/CONTRIBUTING.md).

Module documentation: [`setup/README.md`](setup/README.md) covers the
prerequisites, both environment files, every variable and secret, and what must
be backed up.
