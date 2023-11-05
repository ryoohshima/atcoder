#!/bin/sh

if [ $# != 1 ]; then
  echo 引数エラー: $*
  exit 1
else
  chmod 755 $1/answer.js

  # 指定行以外を一時ファイルに書き込み
  sed -e '$d' $1/answer.js > $1/answer_temp.js

  # 新しいテキストをファイルに追加
  echo "Main(require('fs').readFileSync('/dev/stdin', 'utf8'));" >> $1/answer_temp.js

  # 一時ファイルを元のファイルに上書き
  mv $1/answer_temp.js $1/answer.js

  pbcopy < $1/answer.js
  echo
  echo クリップボードにコピーしました。
  echo
  echo =================
  echo
  cat $1/answer.js
fi
