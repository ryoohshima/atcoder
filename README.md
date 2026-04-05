# atcoder

AtCoder の過去問を解くためのリポジトリです。

ライブラリのバージョンは AtCoder の [ルールページ](https://atcoder.jp/contests/abc452/rules) に記載のとおりに設定しています。

Node.js のバージョンを変更したい場合は `.node-version` を更新してください。

## ディレクトリ構造

```
atcoder/
├── scripts/          # シェルスクリプト
├── contests/         # 解答ファイル
│   ├── abc/
│   │   └── 452/
│   │       ├── a/
│   │       │   ├── answer.js
│   │       │   ├── input1.txt
│   │       │   ├── input2.txt
│   │       │   └── input3.txt
│   │       └── b/
│   └── arc/
└── package.json
```

## ファイル説明

### answer.js

解答コードを書くファイル。

`Main` 関数の中に処理を実装する。

引数 `input` に標準入力の文字列が渡されるので、`split('\n')` で行ごとに分割して使う。

### input.txt

3ファイル自動生成される

ローカルテスト用の入力データ。AtCoder の問題ページにある「入力例」をそれぞれのファイルにコピーして貼り付ける。

`output.sh` 実行時に全ファイルをまとめてテストする。

## 使い方

1. ファイル作成

```bash
sh scripts/init.sh <URL>
# 例: sh scripts/init.sh https://atcoder.jp/contests/abc452
```

2. 作成された `input1.txt` 〜 `input3.txt` に各入力例を記載

3. 出力を試す

```bash
sh scripts/output.sh <コンテスト名> <問題>
# 例: sh scripts/output.sh abc452 a
```

4. 提出する

```bash
sh scripts/submit.sh <コンテスト名> <問題>
# 例: sh scripts/submit.sh abc452 a
```

クリップボードに回答内容がコピーされるので AtCoder の問題ページに貼り付ける。
