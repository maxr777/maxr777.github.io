#!/usr/bin/env bash

set -euo pipefail

PORT="${1:-8000}"

cd "$(dirname "$0")"

echo "Serving maxr777.github.io at http://localhost:${PORT}/"
echo "Press Ctrl+C to stop."

URL="http://localhost:${PORT}/"

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL" >/dev/null 2>&1 &
elif command -v open >/dev/null 2>&1; then
  open "$URL" >/dev/null 2>&1 &
fi

exec python3 -m http.server "$PORT"
