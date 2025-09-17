# バニラJS Web電卓

バニラHTML/CSS/JavaScriptで実装したシンプルなWeb電卓です。加減乗除や少数、クリア、Backspace、Enterキーでの計算に対応しています。Node.jsの標準テストランナーとESLint/Prettierで品質を担保します。

## セットアップ

```bash
npm install
```

## 利用方法

1. `index.html` をブラウザで開きます。
2. 画面上のボタン、もしくはキーボードの数字・演算子・Enter・Backspace・Escで入力できます。

## スクリプト

| コマンド | 説明 |
| --- | --- |
| `npm test` | Node.js標準テストランナーでユニットテストを実行します。 |
| `npm run lint` | ESLintで静的解析を行います。 |
| `npm run format` | Prettierでコードフォーマットをチェックします。 |
| `npm run format:write` | Prettierでコードを自動整形します。 |

## テスト

`test/calc.test.js` にCalculatorクラスのユニットテストが用意されています。`node --test`で動作します。

## ライセンス

このプロジェクトは[MIT License](LICENSE)で提供されています。
