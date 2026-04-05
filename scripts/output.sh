#!/bin/sh

. "$(dirname "$0")/parse_args.sh"

for file in "$DIR"/input*.txt; do
  echo "--- $(basename "$file") ---"
  node "$DIR/answer.js" < "$file"
done
