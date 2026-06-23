# Template

A repository template featuring guidelines, templates, modules, workflows, tools, scripts, and skills.

## Features

- Contribution and documentation guidelines
- GitHub issue and pull request templates
- Module templates and CI/CD workflows
- Automated dependency updates using Dependabot
- Project initialization script
- Agent skills for the development workflow



## Getting Started

The project can be initialized either using the AI agent or manually:

### Agent Initialization

Use this repository as a template on GitHub, then run the `/bootstrap` skill to initialize the project.

### Manual Initialization

1. Configure [`init/config.json`](init/config.json) with the project's details, keeping only applicable modules.
2. Run the initialization script:

   ```bash
   python -m init
   ```
3. Create documentation and issues according to the guidelines in [`CONTRIBUTING.md`](CONTRIBUTING.md).