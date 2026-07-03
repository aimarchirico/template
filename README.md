# Template

A full-stack monorepo template with a Kotlin/Spring Boot backend and an Expo/React Native frontend, wired together with shared tooling, CI/CD, contribution guidelines, and agent skills.

## Features

- Kotlin/Spring Boot backend built with Gradle and convention plugins
- Expo/React Native frontend as a pnpm/Turborepo workspace with NativeWind styling
- Task-based command orchestration across the backend, frontend, and tools
- Shared tooling for commit linting, formatting, and Release Please versioning
- GitHub Actions workflows for CI, deployment, and releases
- GitHub issue and pull request templates
- Automated dependency updates using Dependabot
- Contribution and documentation guidelines
- Agent skills for the development workflow (bootstrap, issues, implement, commit, pr, docs)
- Python initialization package for scaffolding new projects

## Getting Started

The project can be initialized either using the AI agent or manually:

### Agent Initialization

Use this repository as a template on GitHub, then run the `/bootstrap` skill to initialize the project.

### Manual Initialization

1. Configure [`init/config.json`](init/config.json) with the project's details. 
2. Run the initialization script:

   ```bash
   python -m init
   ```
3. Create documentation and issues according to the guidelines in [`CONTRIBUTING.md`](CONTRIBUTING.md).