# Template

A repository template featuring structured documentation and module templates.

## Features

- Contribution guidelines template
- GitHub issue and pull request templates
- Module templates and CI/CD workflow templates
- Agent skills for the development workflow

## Getting Started

1. Use this repository as a template on GitHub.
2. Edit `template.json` in the root directory: set the project `name`, `description`, and `variables` (org, github_org). Remove any modules you don't need from the `modules` object, and adjust the per-module `replacements`, `renames`, and `packageDirMoves` as needed.
3. Run the `/bootstrap` skill to initialize the project. This will execute `init.py` to apply all replacements, delete unselected modules and workflows, move package directories, and clean up.