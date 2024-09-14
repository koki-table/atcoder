#!/bin/bash

# プロジェクトのルートディレクトリへの相対パスを取得
PROJECT_ROOT=$(git rev-parse --show-toplevel)

# template.tsファイルのパス
TEMPLATE_FILE="$PROJECT_ROOT/template/template.ts"

# template.tsファイルが存在するか確認
if [ ! -f "$TEMPLATE_FILE" ]; then
    echo "Error: template.ts file not found in the project root."
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

# 指定されたディレクトリにtemplate.tsをmain.tsとしてコピー
cp "$TEMPLATE_FILE" "$TARGET_DIR/main.ts"

echo "template.ts has been copied to $TARGET_DIR as main.ts"