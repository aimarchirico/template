#!/bin/bash

# Ensure script exits on error
set -e

JSON_FILE=$1

if [ -z "$JSON_FILE" ]; then
  echo "Error: JSON file path not specified."
  echo "Usage: $0 <path-to-issues.json>"
  exit 1
fi

if [ ! -f "$JSON_FILE" ]; then
  echo "Error: File '$JSON_FILE' not found."
  exit 1
fi

# Automatically delete the temporary JSON file on exit
trap 'rm -f "$JSON_FILE"' EXIT


# 1. Check dependencies
if ! command -v gh &> /dev/null; then
  echo "Error: GitHub CLI (gh) is not installed or not in PATH."
  exit 1
fi

if ! command -v jq &> /dev/null; then
  echo "Error: jq is not installed or not in PATH."
  exit 1
fi

# 2. Check GitHub CLI authentication status
if ! gh auth status &> /dev/null; then
  echo "Error: GitHub CLI is not authenticated. Please run 'gh auth login' to authenticate."
  exit 1
fi

# 3. Validate JSON format
if ! jq empty "$JSON_FILE" 2>/dev/null; then
  echo "Error: '$JSON_FILE' is not a valid JSON file."
  exit 1
fi

# 4. Install/Verify gh-sub-issue extension
echo "Checking gh-sub-issue extension..."
gh extension list | grep "gh-sub-issue" > /dev/null || gh extension install yahsan2/gh-sub-issue

# 5. Resolve Project Context
OWNER=$(gh repo view --json owner -q '.owner.login')
REPO_NAME=$(gh repo view --json name -q '.name')

PROJECT_TITLE=$(jq -r '.name' init/config.json 2>/dev/null || jq -r '.name' init/default.json 2>/dev/null || echo "")
if [ -z "$PROJECT_TITLE" ] || [ "$PROJECT_TITLE" == "null" ]; then
  PROJECT_TITLE="$REPO_NAME"
fi

echo "Resolving GitHub Project: '$PROJECT_TITLE' under owner '$OWNER'..."
PROJECT_INFO=$(gh project list --owner "$OWNER" --format json 2>/dev/null | jq -c --arg title "$PROJECT_TITLE" '.projects[] | select((.title | ascii_downcase) == ($title | ascii_downcase) and .closed == false)' 2>/dev/null | head -n 1 || echo "")

if [ -n "$PROJECT_INFO" ]; then
  PROJECT_NUMBER=$(echo "$PROJECT_INFO" | jq -r '.number')
  PROJECT_ID=$(echo "$PROJECT_INFO" | jq -r '.id')
  echo "Found active project: '$PROJECT_TITLE' (number: $PROJECT_NUMBER, id: $PROJECT_ID)"
  
  # Fetch field lists
  FIELDS_JSON=$(gh project field-list "$PROJECT_NUMBER" --owner "$OWNER" --format json)
  
  # Type field details
  TYPE_FIELD_ID=$(echo "$FIELDS_JSON" | jq -r '.fields[] | select(.name == "Type") | .id')
  
  # Priority field details
  PRIORITY_FIELD_ID=$(echo "$FIELDS_JSON" | jq -r '.fields[] | select(.name == "Priority") | .id')
else
  echo "Warning: Active project '$PROJECT_TITLE' not found. Will create issues without project fields."
  PROJECT_ID=""
fi

# 6. Process issues
echo "Processing and creating issues..."

create_issue_recursive() {
  local item_json="$1"
  local parent_id="$2"

  local title
  title=$(echo "$item_json" | jq -r '.title')
  local body
  body=$(echo "$item_json" | jq -r '.body')

  # Parse Type and Priority from labels, keeping others
  local raw_labels_json
  raw_labels_json=$(echo "$item_json" | jq -r 'if .labels | type == "array" then .labels[] else empty end')
  
  local issue_labels=""
  local type_val=""
  local priority_val=""
  
  if [ -n "$raw_labels_json" ]; then
    while IFS= read -r label; do
      [ -z "$label" ] && continue
      case "$label" in
        Epic|Story|Task|Bug|Subtask)
          type_val="$label"
          ;;
        High|Medium|Low)
          priority_val="$label"
          ;;
        *)
          if [ -z "$issue_labels" ]; then
            issue_labels="$label"
          else
            issue_labels="$issue_labels,$label"
          fi
          ;;
      esac
    done <<< "$raw_labels_json"
  fi

  if [ -z "$title" ] || [ "$title" == "null" ]; then
    if [ -z "$parent_id" ]; then
      echo "Warning: Skipped creating issue due to missing title."
    fi
    return
  fi

  local args=(--title "$title" --body "$body")
  if [ -n "$issue_labels" ]; then
    args+=(--label "$issue_labels")
  fi

  local issue_url
  local issue_id

  if [ -z "$parent_id" ]; then
    echo "Creating top level issue: '$title'..."
    issue_url=$(gh issue create "${args[@]}")
    issue_id=$(echo "$issue_url" | awk -F'/' '{print $NF}')
    echo "Created top level issue: $issue_id"
  else
    echo "Creating child issue: '$title' under parent $parent_id..."
    args+=(--parent "$parent_id")
    issue_url=$(gh sub-issue create "${args[@]}")
    issue_id=$(echo "$issue_url" | awk -F'/' '{print $NF}')
    echo "Created child issue: $issue_id"
  fi

  # Link to project and set fields if project is resolved
  if [ -n "$PROJECT_ID" ] && [ -n "$issue_url" ]; then
    echo "Adding issue $issue_id to project #$PROJECT_NUMBER..."
    local project_item_json
    project_item_json=$(gh project item-add "$PROJECT_NUMBER" --owner "$OWNER" --url "$issue_url" --format json 2>/dev/null || echo "")
    local item_id
    item_id=$(echo "$project_item_json" | jq -r '.id 2>/dev/null' 2>/dev/null || echo "")
    
    if [ -n "$item_id" ] && [ "$item_id" != "null" ]; then
      # Set Type field if specified
      if [ -n "$type_val" ] && [ -n "$TYPE_FIELD_ID" ]; then
        local option_id
        option_id=$(echo "$FIELDS_JSON" | jq -r --arg val "$type_val" '.fields[] | select(.name == "Type") | .options[] | select(.name == $val) | .id' 2>/dev/null || echo "")
        if [ -n "$option_id" ] && [ "$option_id" != "null" ]; then
          echo "Setting project item Type to '$type_val'..."
          gh project item-edit --id "$item_id" --project-id "$PROJECT_ID" --field-id "$TYPE_FIELD_ID" --single-select-option-id "$option_id" > /dev/null 2>&1 || true
        fi
      fi
      
      # Set Priority field if specified
      if [ -n "$priority_val" ] && [ -n "$PRIORITY_FIELD_ID" ]; then
        local option_id
        option_id=$(echo "$FIELDS_JSON" | jq -r --arg val "$priority_val" '.fields[] | select(.name == "Priority") | .options[] | select(.name == $val) | .id' 2>/dev/null || echo "")
        if [ -n "$option_id" ] && [ "$option_id" != "null" ]; then
          echo "Setting project item Priority to '$priority_val'..."
          gh project item-edit --id "$item_id" --project-id "$PROJECT_ID" --field-id "$PRIORITY_FIELD_ID" --single-select-option-id "$option_id" > /dev/null 2>&1 || true
        fi
      fi
    fi
  fi

  echo "$item_json" | jq -c '.children[]?' 2>/dev/null | grep -v 'null' | while read -r child; do
    create_issue_recursive "$child" "$issue_id"
  done
}

jq -c '.items[]' "$JSON_FILE" | while read -r item; do
  create_issue_recursive "$item" ""
done

echo "Successfully created all issues."
