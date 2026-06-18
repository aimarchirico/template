#!/usr/bin/env python3
import sys
import os
import json
import subprocess
import shutil

def run_cmd(args):
    result = subprocess.run(args, capture_output=True, text=True, check=True)
    return result.stdout.strip()

def check_dependencies():
    if not shutil.which("gh"):
        print("Error: GitHub CLI (gh) is not installed or not in PATH.", file=sys.stderr)
        sys.exit(1)

    # Check gh auth status
    try:
        subprocess.run(["gh", "auth", "status"], capture_output=True, check=True)
    except subprocess.CalledProcessError:
        print("Error: GitHub CLI is not authenticated. Please run 'gh auth login' first.", file=sys.stderr)
        sys.exit(1)

    # Check/install gh-sub-issue extension
    try:
        output = run_cmd(["gh", "extension", "list"])
        if "gh-sub-issue" not in output:
            print("Installing gh-sub-issue extension...")
            subprocess.run(["gh", "extension", "install", "yahsan2/gh-sub-issue"], check=True)
    except Exception as e:
        print(f"Warning: Error verifying or installing gh-sub-issue: {e}", file=sys.stderr)

def get_project_context():
    try:
        repo_output = run_cmd(["gh", "repo", "view", "--json", "owner,name"])
        repo_data = json.loads(repo_output)
        owner = repo_data["owner"]["login"]
        repo_name = repo_data["name"]
    except Exception as e:
        print(f"Error: Could not retrieve GitHub repository context. {e}", file=sys.stderr)
        sys.exit(1)

    # Resolve project title from config.json or default.json
    project_title = ""
    for path in ["init/config.json", "init/default.json"]:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    project_title = data.get("name")
                    if project_title:
                        break
            except Exception:
                pass
    
    if not project_title:
        project_title = repo_name

    print(f"Resolving GitHub Project: '{project_title}' under owner '{owner}'...")
    try:
        projects_output = run_cmd(["gh", "project", "list", "--owner", owner, "--format", "json"])
        projects_data = json.loads(projects_output)
        for proj in projects_data.get("projects", []):
            if proj.get("title", "").lower() == project_title.lower() and not proj.get("closed", False):
                project_number = proj["number"]
                project_id = proj["id"]
                print(f"Found active project: '{proj.get('title')}' (number: {project_number}, id: {project_id})")
                return owner, project_number, project_id
    except Exception as e:
        print(f"Warning: Could not list/resolve GitHub Projects. {e}", file=sys.stderr)

    return owner, None, None

def get_project_fields(owner, project_number):
    type_field_id = None
    priority_field_id = None
    fields_data = {}

    if not project_number:
        return type_field_id, priority_field_id, fields_data

    try:
        fields_output = run_cmd(["gh", "project", "field-list", str(project_number), "--owner", owner, "--format", "json"])
        fields_data = json.loads(fields_output)
        for field in fields_data.get("fields", []):
            if field.get("name") == "Type":
                type_field_id = field["id"]
            elif field.get("name") == "Priority":
                priority_field_id = field["id"]
    except Exception as e:
        print(f"Warning: Could not retrieve project fields. {e}", file=sys.stderr)

    return type_field_id, priority_field_id, fields_data

def create_issue_recursive(item, parent_id, owner, project_number, project_id, type_field_id, priority_field_id, fields_data):
    title = item.get("title")
    body = item.get("body", "")
    type_val = item.get("type")
    priority_val = item.get("priority")

    if not title:
        print("Warning: Skipped creating issue due to missing title.")
        return

    # Create issue
    if not parent_id:
        print(f"Creating top-level issue: '{title}'...")
        args = ["gh", "issue", "create", "--title", title, "--body", body]
        issue_url = run_cmd(args)
        issue_id = issue_url.split("/")[-1]
        print(f"Created top-level issue: {issue_id}")
    else:
        print(f"Creating child issue: '{title}' under parent {parent_id}...")
        args = ["gh", "sub-issue", "create", "--title", title, "--body", body, "--parent", str(parent_id)]
        issue_url = run_cmd(args)
        issue_id = issue_url.split("/")[-1]
        print(f"Created child issue: {issue_id}")

    # Add to project and configure fields
    if project_id and issue_url:
        try:
            print(f"Adding issue {issue_id} to project #{project_number}...")
            item_output = run_cmd(["gh", "project", "item-add", str(project_number), "--owner", owner, "--url", issue_url, "--format", "json"])
            item_data = json.loads(item_output)
            item_id = item_data.get("id")

            if item_id:
                # Set Type field if defined
                if type_val and type_field_id:
                    option_id = None
                    for field in fields_data.get("fields", []):
                        if field.get("name") == "Type":
                            for opt in field.get("options", []):
                                if opt.get("name") == type_val:
                                    option_id = opt["id"]
                                    break
                    if option_id:
                        print(f"Setting project item Type to '{type_val}'...")
                        run_cmd(["gh", "project", "item-edit", "--id", item_id, "--project-id", project_id, "--field-id", type_field_id, "--single-select-option-id", option_id])

                # Set Priority field if defined
                if priority_val and priority_field_id:
                    option_id = None
                    for field in fields_data.get("fields", []):
                        if field.get("name") == "Priority":
                            for opt in field.get("options", []):
                                if opt.get("name") == priority_val:
                                    option_id = opt["id"]
                                    break
                    if option_id:
                        print(f"Setting project item Priority to '{priority_val}'...")
                        run_cmd(["gh", "project", "item-edit", "--id", item_id, "--project-id", project_id, "--field-id", priority_field_id, "--single-select-option-id", option_id])
        except Exception as e:
            print(f"Warning: Failed to add/configure project fields for issue {issue_id}. {e}", file=sys.stderr)

    # Recurse for children
    for child in item.get("children", []):
        create_issue_recursive(child, issue_id, owner, project_number, project_id, type_field_id, priority_field_id, fields_data)

def main():
    if len(sys.argv) < 2:
        print("Error: JSON file path not specified.")
        print(f"Usage: {sys.argv[0]} <path-to-issues.json>")
        sys.exit(1)

    json_file = sys.argv[1]
    if not os.path.isfile(json_file):
        print(f"Error: File '{json_file}' not found.", file=sys.stderr)
        sys.exit(1)

    try:
        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error: Failed to parse '{json_file}' as JSON. {e}", file=sys.stderr)
        # Delete temporary file before exiting
        try:
            os.remove(json_file)
        except Exception:
            pass
        sys.exit(1)

    # Ensure the temporary file is deleted on script exit
    try:
        check_dependencies()
        owner, project_number, project_id = get_project_context()
        type_field_id, priority_field_id, fields_data = get_project_fields(owner, project_number)

        print("Processing and creating issues...")
        for item in data.get("items", []):
            create_issue_recursive(item, None, owner, project_number, project_id, type_field_id, priority_field_id, fields_data)

        print("Successfully created all issues.")
    finally:
        try:
            os.remove(json_file)
        except Exception:
            pass

if __name__ == "__main__":
    main()
