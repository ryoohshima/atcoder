# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

AtCoder の過去問を JavaScript (Node.js) で解くための練習リポジトリ。ライブラリバージョンは AtCoder 公式ルールに準拠。

## コマンド

```bash
# コンテストの初期化（問題ページから自動でディレクトリ・テンプレート生成）
sh scripts/init.sh https://atcoder.jp/contests/abc452

# ローカルテスト実行（全 input*.txt を順番に実行）
sh scripts/output.sh abc452 a

# 提出用コードをクリップボードにコピー
sh scripts/submit.sh abc452 a
```

## コード構造

```
contests/{class}/{number}/{problem}/
  ├── answer.js      # 解答（main関数に実装）
  ├── input1.txt     # テスト入力（AtCoderの入力例を貼り付け）
  ├── input2.txt
  └── input3.txt
```

- `{class}`: コンテスト種別（`abc`, `arc`）
- `{number}`: コンテスト番号（`452` など）
- `{problem}`: 問題記号（`a` 〜 `g`）

## 解答テンプレート

```javascript
const main = (input) => {
  const input_values = input.split("\n").filter(Boolean);
  // ここに解答を実装
};

main(require("fs").readFileSync("/dev/stdin", "utf8"));
```

`input` は標準入力の文字列全体。`split("\n").filter(Boolean)` で行配列に変換して使う。

## 環境

- Node.js: `.node-version` で指定（現在 22.19.0）
- パッケージマネージャ: pnpm 10.33.0
