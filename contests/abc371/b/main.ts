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

type Gender = 'M' | 'F';

interface Baby {
  house: number;
  gender: Gender;
}

const main = async () => {
  const N = nextNum();
  const M = nextNum();
  
  const babies: Baby[] = Array.from({ length: M }, () => ({
    house: nextNum(),
    gender: next() as Gender
  }));

  const results = determineName(babies);
  results.forEach(result => println(result ? 'Yes' : 'No'));
};

const determineName = (babies: Baby[]): boolean[] => {
  const firstSonBorn = new Set<number>();

  return babies.map(baby => {
    if (baby.gender === 'F') return false;
    if (firstSonBorn.has(baby.house)) return false;
    
    firstSonBorn.add(baby.house);
    return true;
  });
};


// プログラムの実行
readInput().then(() => {
  main();
  flush();
});


