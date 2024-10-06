import { createInterface } from "readline";
import * as fs from "fs";

// グローバル変数
let inputs = "";
let inputArray: string[] = [];
let currentIndex = 0;
let outputBuffer = "";
let costMatrix: CostMatrix;

// 型定義
type Edge = [number, number];
type Graph = Set<string>;
type CostMatrix = number[][];


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


// グラフを作成する純粋関数
const createGraph = (m: number): Graph => {
  const edges = Array.from({ length: m }, () => [nextNum(), nextNum()] as Edge);
  return new Set(edges.map(([u, v]) => `${Math.min(u, v)},${Math.max(u, v)}`));
};

// コスト行列を作成する純粋関数
const createCostMatrix = (n: number): CostMatrix => {
  return Array.from({ length: n - 1 }, (_, i) =>
    Array.from({ length: n - i - 1 }, () => nextNum())
  );
};

// グラフの同型性を確認する純粋関数
const checkIsomorphism = (g: Graph, h: Graph, n: number): number => {
  const permutations = generatePermutations(n);
  return Math.min(...permutations.map(perm => calculateCost(g, h, perm)));
};

// 順列を生成する純粋関数
const generatePermutations = (n: number): number[][] => {
  if (n === 1) return [[1]];
  const subPerms = generatePermutations(n - 1);
  return subPerms.flatMap(perm => 
    Array.from({ length: n }, (_, i) => 
      [...perm.slice(0, i), n, ...perm.slice(i)]
    )
  );
};

// コストを計算する純粋関数
const calculateCost = (g: Graph, h: Graph, perm: number[]): number => {
  let cost = 0;
  for (let i = 1; i <= perm.length; i++) {
    for (let j = i + 1; j <= perm.length; j++) {
      const edgeG = g.has(`${Math.min(i, j)},${Math.max(i, j)}`);
      const edgeH = h.has(`${Math.min(perm[i-1], perm[j-1])},${Math.max(perm[i-1], perm[j-1])}`);
      if (edgeG !== edgeH) {
        cost += costMatrix[Math.min(i, j) - 1][Math.max(i, j) - Math.min(i, j) - 1];
      }
    }
  }
  return cost;
};

// メイン処理
const main = async () => {
  const n = nextNum();
  const g = createGraph(nextNum());
  const h = createGraph(nextNum());
  const costMatrix = createCostMatrix(n);

  const minCost = checkIsomorphism(g, h, n);
  print(minCost);
};

// プログラムの実行
readInput().then(() => {
  main();
  flush();
});


