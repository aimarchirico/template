import subprocess
import json
import shutil

def run_cmd(args):
    result = subprocess.run(args, capture_output=True, text=True, check=True)
    return result.stdout.strip()

def get_github_context():
    try:
        output = run_cmd(["gh", "repo", "view", "--json", "owner,name"])
        data = json.loads(output)
        owner = data.get("owner", {}).get("login")
        repo = data.get("name")
        return owner, repo
    except Exception as e:
        print(f"Warning: Could not determine GitHub repository context. Error: {e}")
        return None, None

def setup_github_project(project_title):
    if not shutil.which("gh"):
        print("Warning: GitHub CLI 'gh' is not installed or not in PATH. Skipping GitHub Project initialization.")
        return

    owner, repo = get_github_context()
    if not owner or not repo:
        print("Warning: Skipping GitHub Project initialization due to missing repo context.")
        return

    print(f"Initializing GitHub Project for owner: {owner}, repo: {repo}")

    # Check if project with the same title already exists
    project_number = None
    try:
        output = run_cmd(["gh", "project", "list", "--owner", owner, "--format", "json"])
        projects_data = json.loads(output)
        for proj in projects_data.get("projects", []):
            if proj.get("title") == project_title and not proj.get("closed", False):
                project_number = proj.get("number")
                print(f"Found existing active GitHub Project: {project_title} (number: {project_number})")
                break
    except Exception as e:
        print(f"Warning: Error listing projects. Proceeding to create one if possible. Error: {e}")

    # If project doesn't exist, create it
    if project_number is None:
        try:
            print(f"Creating new GitHub Project: '{project_title}'...")
            output = run_cmd(["gh", "project", "create", "--owner", owner, "--title", project_title, "--format", "json"])
            proj_data = json.loads(output)
            project_number = proj_data.get("number")
            print(f"Successfully created GitHub Project #{project_number}")
        except Exception as e:
            print(f"Error: Failed to create GitHub Project. Error: {e}")
            return

    # Link the project to the repository
    try:
        print(f"Linking repository '{owner}/{repo}' to project #{project_number}...")
        run_cmd(["gh", "project", "link", str(project_number), "--owner", owner, "-R", f"{owner}/{repo}"])
        print("Successfully linked repository to project.")
    except Exception as e:
        print(f"Warning: Failed to link repository to project #{project_number}. Error: {e}")

    # Configure custom fields
    configure_fields(project_number, owner)

    # Note about views
    print("\n" + "="*80)
    print("NOTE ON GITHUB PROJECT VIEWS:")
    print("The GitHub API/CLI does not support programmatically creating or configuring Project (v2) views.")
    print("Please manually configure the following views in the GitHub UI:")
    print("1. 'Backlog' (Table view):")
    print("   - Group/sort by 'Priority'.")
    print("   - Filter to show only 'Story', 'Task', and 'Bug' types.")
    print("   - Filter to exclude 'Done' status (e.g., filter query: 'is:open -status:Done type:Story,Task,Bug').")
    print("2. 'Sprint Board' (Board view):")
    print("   - Group by 'Status'.")
    print("   - Filter to show only 'Story', 'Task', and 'Bug' types.")
    print("="*80 + "\n")

def configure_fields(project_number, owner):
    try:
        output = run_cmd(["gh", "project", "field-list", str(project_number), "--owner", owner, "--format", "json"])
        fields_data = json.loads(output)
        existing_fields = {f.get("name") for f in fields_data.get("fields", [])}
    except Exception as e:
        print(f"Warning: Could not fetch project fields. Proceeding with field creation. Error: {e}")
        existing_fields = set()

    # Create 'Type' field if it doesn't exist
    if "Type" not in existing_fields:
        try:
            print("Creating 'Type' custom field (Epic, Story, Task, Bug, Subtask)...")
            run_cmd([
                "gh", "project", "field-create", str(project_number),
                "--owner", owner,
                "--name", "Type",
                "--data-type", "SINGLE_SELECT",
                "--single-select-options", "Epic,Story,Task,Bug,Subtask"
            ])
            print("Successfully created 'Type' field.")
        except Exception as e:
            print(f"Warning: Failed to create 'Type' field. Error: {e}")
    else:
        print("'Type' field already exists.")

    # Create 'Priority' field if it doesn't exist
    if "Priority" not in existing_fields:
        try:
            print("Creating 'Priority' custom field (High, Medium, Low)...")
            run_cmd([
                "gh", "project", "field-create", str(project_number),
                "--owner", owner,
                "--name", "Priority",
                "--data-type", "SINGLE_SELECT",
                "--single-select-options", "High,Medium,Low"
            ])
            print("Successfully created 'Priority' field.")
        except Exception as e:
            print(f"Warning: Failed to create 'Priority' field. Error: {e}")
    else:
        print("'Priority' field already exists.")
