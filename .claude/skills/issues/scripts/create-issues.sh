#!/bin/bash

JSON_FILE=$1

gh extension list | grep "gh-sub-issue" > /dev/null || gh extension install yahsan2/gh-sub-issue

jq -c '.items[]' "$JSON_FILE" | while read -r item; do
  ITEM_TITLE=$(echo "$item" | jq -r '.title')
  ITEM_BODY=$(echo "$item" | jq -r '.body')
  ITEM_LABEL=$(echo "$item" | jq -r '.label')

  ITEM_URL=$(gh issue create --title "$ITEM_TITLE" --body "$ITEM_BODY" --label "$ITEM_LABEL")
  ITEM_ID=$(echo "$ITEM_URL" | awk -F'/' '{print $NF}')
  echo "Created top level issue: $ITEM_ID"

  echo "$item" | jq -c '.children[]?' | grep -v 'null' | while read -r child; do
    CHILD_TITLE=$(echo "$child" | jq -r '.title')
    CHILD_BODY=$(echo "$child" | jq -r '.body')
    CHILD_LABEL=$(echo "$child" | jq -r '.label')

    CHILD_URL=$(gh sub-issue create --parent "$ITEM_ID" --title "$CHILD_TITLE" --body "$CHILD_BODY" --label "$CHILD_LABEL")
    CHILD_ID=$(echo "$CHILD_URL" | awk -F'/' '{print $NF}')
    echo "Created child issue: $CHILD_ID"

    echo "$child" | jq -c '.children[]?' | grep -v 'null' | while read -r subtask; do
      SUB_TITLE=$(echo "$subtask" | jq -r '.title')
      SUB_BODY=$(echo "$subtask" | jq -r '.body')
      SUB_LABEL=$(echo "$subtask" | jq -r '.label')

      gh sub-issue create --parent "$CHILD_ID" --title "$SUB_TITLE" --body "$SUB_BODY" --label "$SUB_LABEL"
    done
  done
done
