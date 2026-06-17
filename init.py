#!/usr/bin/env python3
import os
import sys
import json
import shutil
from pathlib import Path

EXCLUDE_DIRS = {".git", "node_modules", ".gradle", "build", ".expo", ".kotlin", ".antigravitycli"}
BINARY_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".ico", ".pdf", ".zip", ".tar", ".gz", ".jar", ".war", ".class"}
SELF_FILES = {"template.json", "init.py"}

# Baseline defaults for the template repository
DEFAULTS = {
    "name": "template",
    "org": "no.chirico",
    "github_org": "aimarchirico",
}


def rename_string(s, template_vars):
    """Rename a string dynamically based on case variations."""
    if "TEMPLATE" in s:
        s = s.replace("TEMPLATE", template_vars["name_upper"])
    if "Template" in s:
        s = s.replace("Template", template_vars["name_camel"])
    if "template" in s:
        s = s.replace("template", template_vars["name"])
    return s


def move_package_directories(module_dir, old_pkg_path, new_pkg_path):
    """Find and move any directory structure matching old_pkg_path to new_pkg_path."""
    old_parts = Path(old_pkg_path).parts
    new_parts = Path(new_pkg_path).parts

    for root, dirs, files in os.walk(str(module_dir), topdown=False):
        try:
            rel_path = Path(root).relative_to(module_dir)
            parts = rel_path.parts
            for i in range(len(parts) - len(old_parts) + 1):
                if parts[i:i+len(old_parts)] == old_parts:
                    src = module_dir / Path(*parts)
                    dst_parts = parts[:i] + new_parts + parts[i+len(old_parts):]
                    dst = module_dir / Path(*dst_parts)
                    if src.exists() and src != dst:
                        print(f"Moving package directory: {src} -> {dst}")
                        dst.mkdir(parents=True, exist_ok=True)
                        for item in src.iterdir():
                            shutil.move(str(item), str(dst / item.name))
                        
                        # Clean up empty parents of src up to the point of replacement
                        current = src
                        stop_at = module_dir / Path(*parts[:i])
                        while current != stop_at:
                            try:
                                current.rmdir()
                            except OSError:
                                break
                            current = current.parent
                    break
        except ValueError:
            continue


def main():
    config_path = Path("template.json")
    if not config_path.exists():
        print("Error: template.json not found.", file=sys.stderr)
        sys.exit(1)

    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    # Read values from config or fallback to defaults
    name = config.get("name", DEFAULTS["name"])
    org = config.get("org", DEFAULTS["org"])
    github_org = config.get("github_org", DEFAULTS["github_org"])
    description = config.get("description", "")
    modules_config = config.get("modules", {})

    # Derive casing and paths for name
    name_clean = "".join(c.lower() for c in name if c.isalnum() or c == "_")
    name_camel = "".join(p.capitalize() for p in name.replace("_", "-").replace(" ", "-").split("-") if p)
    name_upper = name.replace("-", "_").upper()

    # Derive paths for org
    org_clean = org.strip(".")
    org_path = org_clean.replace(".", "/")

    # Hardcoded defaults derived values
    default_name_clean = DEFAULTS["name"]
    default_name_camel = "Template"
    default_org_clean = DEFAULTS["org"]
    default_org_path = default_org_clean.replace(".", "/")

    # Target packages
    old_package = f"{default_org_clean}.{default_name_clean}"
    new_package = f"{org_clean}.{name_clean}"
    old_package_path = f"{default_org_path}/{default_name_clean}"
    new_package_path = f"{org_path}/{name_clean}"

    template_vars = {
        "name": name,
        "name_clean": name_clean,
        "name_camel": name_camel,
        "name_upper": name_upper,
        "org": org_clean,
        "org_path": org_path,
        "github_org": github_org,
    }

    # replacements for inside modules
    module_replacements = [
        (old_package, new_package),
        (old_package_path, new_package_path),
        (default_name_camel, name_camel),
        (DEFAULTS["name"], name),
    ]

    # global replacements for root files and workflow config
    global_replacements = [
        (DEFAULTS["github_org"], github_org),
        (default_name_camel, name_camel),
        (DEFAULTS["name"], name),
        (DEFAULTS["org"], org_clean),
    ]

    # 1. Delete unselected modules
    for d in [p for p in Path(".").iterdir() if p.is_dir()]:
        if d.name.startswith(".") or d.name in EXCLUDE_DIRS:
            continue
        if d.name not in modules_config and d.name in {"frontend", "backend"}:
            print(f"Removing module: {d.name}")
            shutil.rmtree(d)
            # Remove associated workflows
            workflows_dir = Path(".github/workflows")
            if workflows_dir.exists():
                prefix = d.name + "-"
                for wf in workflows_dir.glob(f"{prefix}*"):
                    print(f"  Removing workflow: {wf.name}")
                    wf.unlink()

    # 2. Process each module
    for module_name in modules_config.keys():
        module_dir = Path(module_name)
        if not module_dir.exists():
            continue

        # 2a. Dynamic package directory moves
        move_package_directories(module_dir, old_package_path, new_package_path)

        # 2b. Content replacements within module
        for root, dirs, files in os.walk(str(module_dir)):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for file in files:
                file_path = Path(root) / file
                if file_path.suffix in BINARY_EXTS:
                    continue
                try:
                    content = file_path.read_text(encoding="utf-8", errors="ignore")
                    original = content
                    for old, new in module_replacements:
                        content = content.replace(old, new)
                    if content != original:
                        file_path.write_text(content, encoding="utf-8")
                except Exception as e:
                    print(f"Warning: {file_path}: {e}")

        # 2c. File and directory renames within module
        for root, dirs, files in os.walk(str(module_dir), topdown=False):
            parts = Path(root).parts
            if any(p in EXCLUDE_DIRS for p in parts):
                continue
            for file in files:
                new_file = rename_string(file, template_vars)
                if new_file != file:
                    old_path = Path(root) / file
                    new_path = Path(root) / new_file
                    if old_path.exists():
                        print(f"Renaming file: {old_path} -> {new_path}")
                        os.rename(old_path, new_path)
            for d in dirs:
                new_d = rename_string(d, template_vars)
                if new_d != d:
                    old_path = Path(root) / d
                    new_path = Path(root) / new_d
                    if old_path.exists():
                        print(f"Renaming directory: {old_path} -> {new_path}")
                        os.rename(old_path, new_path)

        # 2d. Apply module replacements to associated workflow files
        workflow_prefix = module_name + "-"
        workflows_dir = Path(".github/workflows")
        if workflows_dir.exists():
            for wf in workflows_dir.glob(f"{workflow_prefix}*"):
                try:
                    content = wf.read_text(encoding="utf-8", errors="ignore")
                    original = content
                    for old, new in module_replacements:
                        content = content.replace(old, new)
                    if content != original:
                        wf.write_text(content, encoding="utf-8")
                except Exception as e:
                    print(f"Warning: {wf}: {e}")

    # 3. Global replacements (root-level files, .github/, etc.)
    for root, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        # Skip module directories (already processed)
        dirs[:] = [d for d in dirs if d not in modules_config]
        for file in files:
            file_path = Path(root) / file
            if file_path.name in SELF_FILES or file_path.suffix in BINARY_EXTS:
                continue
            try:
                content = file_path.read_text(encoding="utf-8", errors="ignore")
                original = content
                # Replace README description before other replacements
                if description and file_path.name == "README.md":
                    content = content.replace(
                        "A repository template featuring structured documentation and module templates.",
                        description,
                    )
                for old, new in global_replacements:
                    content = content.replace(old, new)
                if content != original:
                    file_path.write_text(content, encoding="utf-8")
            except Exception as e:
                print(f"Warning: {file_path}: {e}")

    # 4. Clean up
    print("Cleaning up...")
    config_path.unlink(missing_ok=True)
    try:
        Path(__file__).unlink()
    except Exception:
        pass

    print("Done!")


if __name__ == "__main__":
    main()
