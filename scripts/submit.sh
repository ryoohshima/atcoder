#!/bin/sh

. "$(dirname "$0")/parse_args.sh"

pbcopy < "$DIR/answer.js"
echo
echo クリップボードにコピーしました。
echo
echo =================
echo
cat "$DIR/answer.js"
