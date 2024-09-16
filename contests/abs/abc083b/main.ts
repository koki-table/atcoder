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

// 各桁の和を計算する関数
const digitSum = (num: number): number => {
  return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
};

// メイン処理
const main = async () => {
  const N = nextNum();
  const A = nextNum();
  const B = nextNum();

  let totalSum = 0;

  for (let i = 1; i <= N; i++) {
    const sum = digitSum(i);
    if (sum >= A && sum <= B) {
      totalSum += i;
    }
  }

  print(totalSum);
};

// プログラムの実行
readInput().then(() => {
  main();
  flush();
});


