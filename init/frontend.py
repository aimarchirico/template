from .text import lower
from .fs import replace_text

def setup_frontend(default_mod, config_mod):
    """Rename the frontend's package id, display name, and slug from the default to the configured values."""
    def_name = default_mod["name"]
    cfg_name = config_mod["name"]
    def_pkg = default_mod["package"]
    cfg_pkg = config_mod["package"]
    def_scope = default_mod["scope"]
    cfg_scope = config_mod["scope"]

    def_lower = lower(def_name)
    cfg_lower = lower(cfg_name)

    # app.config.js: package id and display name
    config_file = "frontend/apps/expo/app.config.js"
    replace_text(config_file, def_pkg, cfg_pkg)
    replace_text(config_file, def_name, cfg_name)

    # Update package names
    pkg_files = [
        "frontend/package.json",
        "frontend/apps/expo/package.json",
        "frontend/packages/shared/api-client/package.json"
    ]
    for f in pkg_files:
        replace_text(f, f"{def_scope}/{def_lower}", f"{cfg_scope}/{cfg_lower}")

    # .env.example: API context path
    replace_text("frontend/.env.example", def_lower, cfg_lower)
