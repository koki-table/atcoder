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

const main = async () => {
  const S = next();
  const words = ["dream", "dreamer", "erase", "eraser"];

  const reverseString = (str: string): string => 
    str.split('').reverse().join('');

  const reversedS = reverseString(S);
  const reversedWords = words.map(reverseString);

  const canForm = checkFormation(reversedS, reversedWords);
  
  print(canForm ? "YES" : "NO");
};

const checkFormation = (str: string, words: string[]): boolean => {
  if (str.length === 0) return true;
  
  return words.some(word => 
    str.startsWith(word) && checkFormation(str.slice(word.length), words)
  );
};

// プログラムの実行
readInput().then(() => {
  main();
  flush();
});


