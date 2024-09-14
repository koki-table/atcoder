#!/bin/bash

# プロジェクトのルートディレクトリへの相対パスを取得
PROJECT_ROOT=$(git rev-parse --show-toplevel)

# sample.tsファイルのパス
SAMPLE_FILE="$PROJECT_ROOT/sample/sample.ts"

# sample.tsファイルが存在するか確認
if [ ! -f "$SAMPLE_FILE" ]; then
    echo "Error: sample.ts file not found in the project root."
    exit 1
fi

# 引数が提供されているか確認
if [ $# -eq 0 ]; then
    # 引数がない場合は現在のディレクトリにコピー
    TARGET_DIR="."
else
    # 引数が提供された場合はそのディレクトリを使用
    TARGET_DIR="$1"
    
    # ディレクトリが存在しない場合は作成
    if [ ! -d "$TARGET_DIR" ]; then
        mkdir -p "$TARGET_DIR"
    fi
fi

# 指定されたディレクトリにsample.tsをmain.tsとしてコピー
cp "$SAMPLE_FILE" "$TARGET_DIR/main.ts"

echo "sample.ts has been copied to $TARGET_DIR as main.ts"