# Template

A repository template featuring guidelines, templates, modules, workflows, scripts and skills.

## Features

- Contribution and documentation guidelines
- GitHub issue and pull request templates
- Module templates and CI/CD workflow templates
- Project initialization script
- Agent skills for the development workflow

## Getting Started

You can initialize this project template either using the AI agent or manually:

### Option 1: Agent Initialization (Recommended)
Use this repository as a template on GitHub, then run the `/bootstrap` skill to initialize the project.

### Option 2: Manual Initialization
If you prefer not to use the agent:
1. Configure `init/config.json` with your project's details.
2. Run the initialization script:
   ```bash
   python3 -m init
   ```
   *Note: This script will configure your modules, clean up the template files, and delete itself and this README.*
