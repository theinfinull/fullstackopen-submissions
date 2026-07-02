#!/bin/sh
# zoho catalyst appsail startup script.
#
# catalyst passes your "startup command" directly to a shell-less exec —
# it cannot contain shell operators like `&&`, `|`, `;` directly in the
# console field. So instead, point the startup command to this file:
#
#     sh start.sh
#
# fill in whatever your app actually needs below (install deps, build step,
# run the server, etc). This file runs as a real shell script, so normal
# shell syntax (&&, if, env vars) all work fine here.

# --- fill in your startup commands below ---

npm install
npm run start
