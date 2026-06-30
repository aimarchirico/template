import glob
from text import lower
from fs import replace_text

def setup_client(default_mod, config_mod):
    def_name = default_mod["name"]
    cfg_name = config_mod["name"]
    def_pkg = default_mod["package"]
    cfg_pkg = config_mod["package"]

    def_lower = lower(def_name)
    cfg_lower = lower(cfg_name)

    # Replacements for app.config.js
    config_file = "client/apps/expo/app.config.js"
    replace_text(config_file, def_pkg, cfg_pkg)
    replace_text(config_file, def_name, cfg_name)
    replace_text(config_file, def_lower, cfg_lower)

    # Replace lower case name in all workspace configurations and workflows
    other_files = [
        "client/package.json",
        "client/apps/expo/package.json",
        "client/apps/expo/tsconfig.json",
        "client/apps/expo/eslint.config.mjs",
        "client/packages/shared/api-client/package.json"
    ]
    for f in other_files:
        replace_text(f, def_lower, cfg_lower)
