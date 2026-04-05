#!/bin/sh

if [ $# != 1 ]; then
  echo "引数エラー"
  echo "使い方: sh scripts/init.sh <URL>"
  echo "   例: sh scripts/init.sh https://atcoder.jp/contests/abc452"
  exit 1
fi

CONTEST_NAME=$(echo "$1" | sed 's|.*/||')
CLASS=$(echo "$CONTEST_NAME" | sed 's/[0-9]*$//')
NUMBER=$(echo "$CONTEST_NAME" | sed 's/^[a-z]*//')
URL=$(echo "$1" | sed 's|/$||')

PROBLEMS=$(curl -s "$URL/tasks" | grep -o "href=\"/contests/${CONTEST_NAME}/tasks/${CONTEST_NAME}_[a-z]*\"" | sed "s|.*_\([a-z]*\)\"|\1|" | sort -u)

if [ -z "$PROBLEMS" ]; then
  echo "エラー: 問題一覧を取得できませんでした"
  exit 1
fi

echo "コンテスト: $CONTEST_NAME"
echo "問題: $(echo $PROBLEMS | tr '\n' ' ')"
echo

for p in $PROBLEMS; do
  DIR="contests/$CLASS/$NUMBER/$p"
  mkdir -p "$DIR"
  touch "$DIR/input1.txt"
  touch "$DIR/input2.txt"
  touch "$DIR/input3.txt"

  cat << 'EOF' > "$DIR/answer.js"
function Main(input) {
  input = input.split('\n');

}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'));
EOF
  echo "  作成: $DIR"
done
