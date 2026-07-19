import subprocess
import json
import shutil

def run_cmd(args):
    """Run a command and return its stripped stdout, raising on a non-zero exit."""
    result = subprocess.run(args, capture_output=True, text=True, check=True)
    return result.stdout.strip()

def get_github_context():
    """Return the (owner, repo) of the current repo, or (None, None) on failure."""
    try:
        output = run_cmd(["gh", "repo", "view", "--json", "owner,name"])
        data = json.loads(output)
        owner = data.get("owner", {}).get("login")
        repo = data.get("name")
        return owner, repo
    except Exception as e:
        print(f"Warning: Could not determine GitHub repository context. Error: {e}")
        return None, None

def get_template_project():
    """Resolve the project linked to the repository this one was generated from."""
    try:
        output = run_cmd(["gh", "repo", "view", "--json", "templateRepository"])
        template = json.loads(output).get("templateRepository")
    except Exception as e:
        print(f"Warning: Could not determine template repository. Error: {e}")
        return None, None

    if not template:
        print(
            "Warning: Repository was not generated from a template. "
            "Skipping GitHub Project initialization."
        )
        return None, None

    template_owner = template.get("owner", {}).get("login")
    template_name = template.get("name")

    try:
        output = run_cmd(
            ["gh", "repo", "view", f"{template_owner}/{template_name}",
             "--json", "projectsV2"]
        )
        nodes = json.loads(output).get("projectsV2", {}).get("Nodes", [])
    except Exception as e:
        print(
            f"Warning: Could not retrieve projects for template "
            f"'{template_owner}/{template_name}'. Error: {e}"
        )
        return None, None

    if not nodes:
        print(
            f"Warning: Template repository '{template_owner}/{template_name}' "
            "has no linked project."
        )
        return None, None

    return template_owner, nodes[0].get("number")

def copy_template_project(source_owner, source_number, target_owner, project_title):
    """Copy the template project, duplicating all views and custom fields."""
    try:
        print(
            f"Copying template project #{source_number} from "
            f"'{source_owner}' as '{project_title}'..."
        )
        output = run_cmd([
            "gh", "project", "copy", str(source_number),
            "--source-owner", source_owner,
            "--target-owner", target_owner,
            "--title", project_title,
            "--format", "json"
        ])
        project_number = json.loads(output).get("number")
        print(f"Successfully created GitHub Project #{project_number}")
        return project_number
    except Exception as e:
        print(f"Error: Failed to copy GitHub Project. Error: {e}")
        return None

def link_project_to_repo(owner, repo, project_number):
    """Link the copied project to the repository."""
    try:
        print(f"Linking repository '{owner}/{repo}' to project #{project_number}...")
        run_cmd(
            ["gh", "project", "link", str(project_number),
             "--owner", owner, "-R", f"{owner}/{repo}"]
        )
        print("Successfully linked repository to project.")
    except Exception as e:
        print(
            f"Warning: Failed to link repository to project "
            f"#{project_number}. Error: {e}"
        )

def setup_github_project(project_title):
    """Copy the template's GitHub Project into this repository and link it."""
    if not shutil.which("gh"):
        print(
            "Warning: GitHub CLI 'gh' is not installed or not in PATH. "
            "Skipping GitHub Project initialization."
        )
        return

    owner, repo = get_github_context()
    if not owner or not repo:
        print(
            "Warning: Skipping GitHub Project initialization due to "
            "missing repo context."
        )
        return

    source_owner, source_number = get_template_project()
    if not source_owner or not source_number:
        print(
            "Warning: Skipping GitHub Project initialization due to "
            "missing template project."
        )
        return

    print(f"Initializing GitHub Project for owner: {owner}, repo: {repo}")

    project_number = copy_template_project(
        source_owner, source_number, owner, project_title
    )
    if not project_number:
        return

    link_project_to_repo(owner, repo, project_number)
