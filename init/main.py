import os
import json
import shutil
from helpers import delete_files
from backend import setup_backend, delete_backend
from frontend import setup_frontend, delete_frontend

def main():
    default_path = "init/default.json"
    config_path = "init/config.json"

    if not os.path.exists(default_path) or not os.path.exists(config_path):
        print("Required configuration files default.json or config.json are missing in init/")
        return

    with open(default_path, "r", encoding="utf-8") as f:
        default_data = json.load(f)
    with open(config_path, "r", encoding="utf-8") as f:
        config_data = json.load(f)

    default_modules = default_data.get("modules", {})
    config_modules = config_data.get("modules", {})

    # Load modules.json to sync it with active modules
    modules_json_path = "modules.json"
    modules_json_data = {}
    if os.path.exists(modules_json_path):
        try:
            with open(modules_json_path, "r", encoding="utf-8") as f:
                modules_json_data = json.load(f)
        except Exception as e:
            print(f"Error loading modules.json: {e}")

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
            
            # Remove from modules.json if exists
            if mod_name in modules_json_data:
                modules_json_data.pop(mod_name)

    # Save updated modules.json if it was loaded
    if modules_json_data and os.path.exists(modules_json_path):
        with open(modules_json_path, "w", encoding="utf-8") as f:
            json.dump(modules_json_data, f, indent=2)

    # Delete the root README.md file
    if os.path.exists("README.md"):
        print("Deleting root README.md")
        os.remove("README.md")

    # Clean up and self-delete the init/ directory
    print("Self-deleting the init/ directory")
    shutil.rmtree("init")

if __name__ == "__main__":
    main()
