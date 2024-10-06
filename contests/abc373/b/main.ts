import { createInterface } from "readline";
import * as fs from "fs";

// グローバル変数
let inputs = "";
let inputArray: string[] = [];
let currentIndex = 0;
let outputBuffer = "";


// 入力を読み込む関数
const readInput = (): Promise<void> => {
  return new Promise((resolve) => {
    if (process.env.OS === "Windows_NT") {
      const stream = createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      stream.on("line", (line) => {
        inputs += line + "\n";
      });
      stream.on("close", () => {
        inputArray = inputs.split(/\s/);
        resolve();
      });
    } else {
      inputs = fs.readFileSync("/dev/stdin", "utf8");
      inputArray = inputs.split(/\s/);
      resolve();
    }
  });
};

// 次の要素を取得する関数
const next = (): string => inputArray[currentIndex++];

// 数値を取得する関数
const nextNum = (): number => +next();

// BigIntを取得する関数
const nextBigInt = (): bigint => BigInt(next());

// 配列を取得する関数
const nextNums = (length: number): number[] => {
  return Array.from({ length }, () => nextNum());
};

// 出力をバッファに追加する関数
const print = (out: string | number | bigint): void => {
  outputBuffer += out.toString();
};

// 改行付きで出力する関数
const println = (out: string | number | bigint): void => {
  print(out);
  print("\n");
};

// バッファの内容を出力する関数
const flush = (): void => {
  console.log(outputBuffer);
};

// メイン処理
const main = async () => {
  // キーボードの並び替えられた文字列を取得
  const S = next();

  // 各アルファベットのインデックスを取得する関数
  const getCharIndex = (char: string, keyboard: string): number => {
    return keyboard.indexOf(char);
  };

  // 移動距離を計算する関数
  const calculateTotalDistance = (keyboard: string): number => {
    // 初期位置は A のインデックス
    let prevIndex = getCharIndex('A', keyboard);
    let totalDistance = 0;

    // A から Z までの移動距離を累積
    for (const char of 'BCDEFGHIJKLMNOPQRSTUVWXYZ') {
      const currentIndex = getCharIndex(char, keyboard);
      totalDistance += Math.abs(currentIndex - prevIndex);
      prevIndex = currentIndex; // 次の移動のために現在の位置を更新
    }

    return totalDistance;
  };

  // 結果を計算
  const result = calculateTotalDistance(S);
  println(result);
};

// プログラムの実行
readInput().then(() => {
  main();
  flush();
});


