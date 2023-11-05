if [ $# != 1 ]; then
  echo 引数エラー: $*
  exit 1
else
  echo 以下の条件でファイルを作成します.
  echo 問題: $1
fi

INIT_CODE="function Main(input) {
  input = input.split('\\\n');
  tmp = input[1].split(' ');

  Main(require('fs').readFileSync('/Users/ryoohshima/gitfiles/private/atcoder/$1/input.txt', 'utf8'));
}"

mkdir $1
touch $1/answer.js $1/input.txt

echo "$INIT_CODE" > $1/answer.js
