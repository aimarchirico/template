import os
import glob
from helpers import lower, replace_text, delete_files

def setup_frontend(default_mod, config_mod):
    def_pkg = default_mod["package"]
    cfg_pkg = config_mod["package"]
    def_name = default_mod["name"]
    cfg_name = config_mod["name"]

    def_lower = lower(def_name)
    cfg_lower = lower(cfg_name)

    # We support both app.config.json and app.config.js
    config_files = ["frontend/app.config.json", "frontend/app.config.js"]

    for f in config_files:
        if os.path.exists(f):
            replace_text(f, def_pkg, cfg_pkg)
            replace_text(f, def_name, cfg_name)
            replace_text(f, def_lower, cfg_lower)

    # Replace Lowercase Name in workflows and package.json
    other_files = [
        ".github/workflows/frontend-web.yml",
        ".github/workflows/frontend-android.yml",
        "frontend/package.json"
    ]
    for f in other_files:
        replace_text(f, def_lower, cfg_lower)

def delete_frontend():
    delete_files("frontend")
    for f in glob.glob(".github/workflows/frontend-*.yml"):
        delete_files(f)
