from .text import lower
from .fs import replace_text

def setup_repo(default_data, config_data):
    def_lower = lower(default_data["name"])
    cfg_lower = lower(config_data["name"])

    # CI/CD workflows
    workflow_files = [
        ".github/workflows/deploy.yml",
        ".github/workflows/release.yml",
    ]
    for f in workflow_files:
        replace_text(f, def_lower, cfg_lower)
