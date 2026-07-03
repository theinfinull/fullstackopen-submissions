#!/bin/sh
# packages the project into a deployable zip for zoho catalyst appsail.
#
# - drop this whole `catalyst/` folder into any project.
# - respects .gitignore (and any nested .gitignore files) — only files
#   git would track/allow are included, so node_modules, build artifacts,
#   .env, etc. are automatically excluded without needing to list them here.
# - copies catalyst/start.sh to the root of the zip as `start.sh`, since
#   Catalyst needs package.json and start.sh sitting at the top level of
#   the archive (no wrapping folder).
# - excludes the catalyst/ folder itself from the deploy zip — it's a
#   local tool, not part of the app.
#
# usage:
#   sh catalyst/zip.sh
#
# output:
#   <project-folder-name>-catalyst.zip   (created at the project root)

set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PROJECT_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
cd "$PROJECT_ROOT"

PROJECT_NAME=$(basename "$PROJECT_ROOT")
OUTPUT_ZIP="$PROJECT_ROOT/${PROJECT_NAME}-catalyst.zip"

if ! command -v git >/dev/null 2>&1 || ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "error: this must be run inside a git repository (used to resolve .gitignore rules)." >&2
    exit 1
fi

STAGING_DIR=$(mktemp -d)
trap 'rm -rf "$STAGING_DIR"' EXIT

# list every file git would track or allow (tracked + untracked-but-not-ignored),
# excluding anything under catalyst/ and any previous deploy zips.
git ls-files -co --exclude-standard |
    grep -v '^catalyst/' |
    grep -v -- '-catalyst\.zip$' \
        >"$STAGING_DIR/.filelist"

while IFS= read -r file; do
    # skip files git still tracks/lists but that no longer exist on disk
    # (e.g. deleted but not yet staged/committed).
    [ -f "$file" ] || continue
    mkdir -p "$STAGING_DIR/$(dirname "$file")"
    cp "$file" "$STAGING_DIR/$file"
done <"$STAGING_DIR/.filelist"
rm -f "$STAGING_DIR/.filelist"

# startup script always goes at the zip root, regardless of where
# catalyst/ lives in the project.
cp "$SCRIPT_DIR/start.sh" "$STAGING_DIR/start.sh"

rm -f "$OUTPUT_ZIP"
(cd "$STAGING_DIR" && zip -rq "$OUTPUT_ZIP" .)

echo "Created:  $OUTPUT_ZIP"
unzip -l "$OUTPUT_ZIP"
