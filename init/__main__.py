import os
import shutil
from fs import load_json
from maven import setup_maven, delete_maven
from npm import setup_npm, delete_npm
from gh import setup_github_project

def main():
    default_path = "init/default.json"
    config_path = "init/config.json"

    default_data = load_json(default_path)
    config_data = load_json(config_path)

    if not default_data or not config_data:
        print("Required configuration files default.json or config.json are missing or empty in init/")
        return

    # Initialize GitHub Project
    project_title = config_data.get("name")
    setup_github_project(project_title)

    # Configure modules
    default_modules = default_data.get("modules", {})
    config_modules = config_data.get("modules", {})

    for mod_name, default_mod in default_modules.items():
        if mod_name in config_modules:
            config_mod = config_modules[mod_name]
            print(f"Configuring module: {mod_name}")
            if mod_name == "maven":
                setup_maven(default_mod, config_mod)
            elif mod_name == "npm":
                setup_npm(default_mod, config_mod)
        else:
            print(f"Removing module: {mod_name}")
            if mod_name == "maven":
                delete_maven()
            elif mod_name == "npm":
                delete_npm()

    # Delete the root README.md file
    if os.path.exists("README.md"):
        print("Deleting root README.md")
        os.remove("README.md")

    # Clean up
    print("Self-deleting the init/ directory")
    shutil.rmtree("init")

if __name__ == "__main__":
    main()
