# Template

A full-stack monorepo template with a Spring Boot backend and an Expo
frontend, wired together with shared tooling, CI/CD, contribution guidelines,
and agent skills.

## Features

- Spring Boot backend built with Gradle
- Expo frontend built with PNPM
- Python initialization package for scaffolding
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

1. Configure [`init/config.json`](init/config.json) with the project's details.
2. Run the initialization script:

   ```bash
   python -m init
   ```

3. Create documentation and issues according to the guidelines in [`CONTRIBUTING.md`](CONTRIBUTING.md).
