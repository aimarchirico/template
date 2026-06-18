import os
import json
import shutil
import argparse
from utils import delete_files
from backend import setup_backend, delete_backend
from frontend import setup_frontend, delete_frontend
from project import setup_github_project

def main():
    parser = argparse.ArgumentParser(description="Modular Template Initialization Script")
    parser.add_argument("--no-project", action="store_true", help="Skip GitHub Project initialization")
    args, unknown = parser.parse_known_args()

    default_path = "init/default.json"
    config_path = "init/config.json"

    if not os.path.exists(default_path) or not os.path.exists(config_path):
        print("Required configuration files default.json or config.json are missing in init/")
        return

    with open(default_path, "r", encoding="utf-8") as f:
        default_data = json.load(f)
    with open(config_path, "r", encoding="utf-8") as f:
        config_data = json.load(f)

    # Initialize GitHub Project if enabled in config and not skipped via flag
    enable_project = config_data.get("github_project", True) and not args.no_project
    if enable_project:
        project_title = config_data.get("name", "Template")
        setup_github_project(project_title)

    default_modules = default_data.get("modules", {})
    config_modules = config_data.get("modules", {})

    for mod_name, default_mod in default_modules.items():
        if mod_name in config_modules:
            config_mod = config_modules[mod_name]
            print(f"Configuring module: {mod_name}")
            if mod_name == "backend":
                setup_backend(default_mod, config_mod)
            elif mod_name == "frontend":
                setup_frontend(default_mod, config_mod)
        else:
            print(f"Removing module: {mod_name}")
            if mod_name == "backend":
                delete_backend()
            elif mod_name == "frontend":
                delete_frontend()

    # Delete the root README.md file
    if os.path.exists("README.md"):
        print("Deleting root README.md")
        os.remove("README.md")

    # Clean up and self-delete the init/ directory
    print("Self-deleting the init/ directory")
    shutil.rmtree("init")

if __name__ == "__main__":
    main()
