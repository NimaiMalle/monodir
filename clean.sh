#!/bin/bash
# Clean up all node_modules and yarn.lock files in the current directory and subdirectories
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
find "$SCRIPT_DIR" \( -name 'package.json' -o -name 'yarn.lock' \) -type f -not -path '*/node_modules/*' -execdir sh -c '
    echo "Cleaning up in $(pwd)"
    rm -rf node_modules
    rm -f yarn.lock
' \;
yarn cache clean
