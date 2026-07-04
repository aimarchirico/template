from .text import lower
from .fs import replace_text

def setup_frontend(default_mod, config_mod):
    """Rename the frontend's package id, display name, and slug from the default to the configured values."""
    def_name = default_mod["name"]
    cfg_name = config_mod["name"]
    def_pkg = default_mod["package"]
    cfg_pkg = config_mod["package"]

    def_lower = lower(def_name)
    cfg_lower = lower(cfg_name)

    # app.config.js: package id and display name
    config_file = "frontend/apps/expo/app.config.js"
    replace_text(config_file, def_pkg, cfg_pkg)
    replace_text(config_file, def_name, cfg_name)

    # Workspace root package name
    replace_text("frontend/package.json", def_lower, cfg_lower)
