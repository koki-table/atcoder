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
  // 文字列の長さがインデックスと一致するかを判定する純粋関数
  const isLengthMatchingIndex = (str: string, index: number): boolean => 
    str.length === index + 1;

  // 入力を処理し、条件を満たす文字列の数をカウントする純粋関数
  const countMatchingStrings = (strings: string[]): number =>
    strings.reduce((count, str, index) => 
      isLengthMatchingIndex(str, index) ? count + 1 : count, 0);

  // 12個の文字列を読み込む
  const strings: string[] = Array.from({ length: 12 }, () => next().trim());

  // 結果を計算して出力
  const result = countMatchingStrings(strings);
  println(result);
};

// プログラムの実行
readInput().then(() => {
  main();
  flush();
});


