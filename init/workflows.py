from .text import lower
from .fs import replace_text

def setup_cicd(default_data, config_data):
    def_lower = lower(default_data["name"])
    cfg_lower = lower(config_data["name"])

    # CI/ file
    cicd_files = [
        ".github/workflows/deploy.yml",
        ".github/workflows/release.yml",
        "tools/release-please-config.json",
    ]
    for f in cicd_files:
        replace_text(f, def_lower, cfg_lower)
