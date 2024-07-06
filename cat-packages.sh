#!/bin/bash
# Print out contents of all package.json files in the current directory and subdirectories for AI chatting
find . -name "package.json" -not -path "*/node_modules/*" | while read -r file; do
    echo "## ${file:2}"
    echo '```json'
    cat "$file"
    echo '```'
    echo
done