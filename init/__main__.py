import os
import shutil
from .fs import load_json, replace_text
from .backend import setup_backend
from .frontend import setup_frontend
from .gh import setup_github_project

def main():
    """Run project initialization: set up the GitHub project, modules, and CI/CD, then self-delete init/."""
    default_path = "init/default.json"
    config_path = "init/config.json"

    default_data = load_json(default_path)
    config_data = load_json(config_path)

    if not default_data or not config_data:
        print("Required configuration files default.json or config.json are missing or empty in init/")
        return

    # Initialize GitHub Project
    project_title = config_data.get("name")
    
    # Update release-please-config component names
    safe_title = project_title.lower().replace(" ", "-") if project_title else "app"
    replace_text("tools/release-please-config.json", "template-", f"{safe_title}-")

    setup_github_project(project_title)

    # Configure modules
    default_modules = default_data.get("modules", {})
    config_modules = config_data.get("modules", {})

    for mod_name, default_mod in default_modules.items():
        if mod_name in config_modules:
            config_mod = config_modules[mod_name]
            print(f"Configuring module: {mod_name}")
            if mod_name == "backend" or mod_name == "api":
                setup_backend(default_mod, config_mod)
            elif mod_name == "frontend" or mod_name == "client":
                setup_frontend(default_mod, config_mod)
        else:
            print(f"Skipping missing module: {mod_name}")

    # Delete the root README.md file
    if os.path.exists("README.md"):
        print("Deleting root README.md")
        os.remove("README.md")

    # Clean up
    print("Self-deleting the init/ directory")
    shutil.rmtree("init")

if __name__ == "__main__":
    main()
