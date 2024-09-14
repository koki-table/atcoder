## atcoder-cli,online-judge-tools による AtCoder のローカル自動テスト用のリポジトリ


### [AtCoder コンテスト一覧 ↗︎](https://atcoder.jp/contests)


## 前提
- `Node.js` の実行環境がある
- `gnu-time` がインストール済み
- [atcoder-cli ↗︎](https://github.com/Tatamo/atcoder-cli) と [online-judge-tools ↗︎](https://github.com/online-judge-tools/oj/blob/master/README.ja.md) がインストール済み


## 作業手順

### 1. 問題のダウンロード
`contests`ディレクトリで以下のコマンドを実行します。
atcoder.jp/contest/の後にくるのが、コンテストID。

```
acc new <contest_id>
```


### 2. 回答ファイルの作成
sample.ts をコピーして main.ts を作成します。

```
./bin/copy-sample.sh <destination directory>

<!-- 例 -->
./bin/copy-sample.sh contests/abs/abc086a/
```

### 3. コードの記述
main.ts ファイルに解答を記述します。


### 4. テストの実行
以下のコマンドでテストを実行します。


```
oj t -c "npx ts-node main.ts" -d ./tests/ -N
```
注: -N オプションはスペースと改行の違いを無視します。


### 5. 回答の提出
Node.js環境の場合。

```
acc submit main.ts -- -l 5058
```
