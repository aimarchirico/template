from .text import lower
from .fs import replace_text

def setup_cicd(default_data, config_data):
    """Replace the default project name with the configured one in the CI/CD config files."""
    def_lower = lower(default_data["name"])
    cfg_lower = lower(config_data["name"])

    # The deploy and release workflows derive names from the repository, so only
    # the release-please config still carries the literal project name.
    cicd_files = [
        "tools/release-please-config.json",
    ]
    for f in cicd_files:
        replace_text(f, def_lower, cfg_lower)
