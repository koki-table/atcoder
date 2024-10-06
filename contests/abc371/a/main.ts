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

type Relation = '<' | '>';
type Person = 'A' | 'B' | 'C';

const main = async () => {
  const SAB = next() as Relation;
  const SAC = next() as Relation;
  const SBC = next() as Relation;

  const result = findSecondOldest(SAB, SAC, SBC);
  print(result);
};

const findSecondOldest = (SAB: Relation, SAC: Relation, SBC: Relation): Person => {
  const order = determineOrder(SAB, SAC, SBC);
  return order[1];
};

const determineOrder = (SAB: Relation, SAC: Relation, SBC: Relation): Person[] => {
  if (SAB === '<' && SAC === '<' && SBC === '<') return ['C', 'B', 'A'];
  if (SAB === '<' && SAC === '<' && SBC === '>') return ['B', 'C', 'A'];
  if (SAB === '<' && SAC === '>' && SBC === '>') return ['C', 'A', 'B'];
  if (SAB === '>' && SAC === '<' && SBC === '<') return ['B', 'A', 'C'];
  if (SAB === '>' && SAC === '>' && SBC === '<') return ['A', 'C', 'B'];
  if (SAB === '>' && SAC === '>' && SBC === '>') return ['A', 'B', 'C'];
  throw new Error('Invalid input');
};
// プログラムの実行
readInput().then(() => {
  main();
  flush();
});


