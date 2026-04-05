#!/bin/sh

# 引数を解析して CLASS, NUMBER, PROBLEM, DIR を設定する
# 使い方: <コンテスト名> <問題>  例: abc452 a

if [ $# != 2 ]; then
  echo "引数エラー"
  echo "使い方: sh $0 <コンテスト名> <問題>"
  echo "   例: sh $0 abc452 a"
  exit 1
fi

CLASS=$(echo "$1" | sed 's/[0-9]*$//')
NUMBER=$(echo "$1" | sed 's/^[a-z]*//')
PROBLEM="$2"
DIR="contests/$CLASS/$NUMBER/$PROBLEM"
