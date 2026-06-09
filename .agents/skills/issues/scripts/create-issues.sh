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

# 5. Process issues
echo "Processing and creating issues..."

create_issue_recursive() {
  local item_json="$1"
  local parent_id="$2"

  local title
  title=$(echo "$item_json" | jq -r '.title')
  local body
  body=$(echo "$item_json" | jq -r '.body')
  local labels
  labels=$(echo "$item_json" | jq -r 'if .labels | type == "array" then .labels | join(",") else "" end')

  if [ -z "$title" ] || [ "$title" == "null" ]; then
    if [ -z "$parent_id" ]; then
      echo "Warning: Skipped creating issue due to missing title."
    fi
    return
  fi

  local args=(--title "$title" --body "$body")
  if [ -n "$labels" ] && [ "$labels" != "null" ]; then
    args+=(--label "$labels")
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

  echo "$item_json" | jq -c '.children[]?' 2>/dev/null | grep -v 'null' | while read -r child; do
    create_issue_recursive "$child" "$issue_id"
  done
}

jq -c '.items[]' "$JSON_FILE" | while read -r item; do
  create_issue_recursive "$item" ""
done

echo "Successfully created all issues."

