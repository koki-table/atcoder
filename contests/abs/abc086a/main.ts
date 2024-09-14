// 参考
// https://qiita.com/cosocaf/items/255003ecec1d3badfc7b#5-%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88

import { createInterface } from "readline";
import * as fs from "fs";

let inputs = "";
let inputArray: string[];
let currentIndex = 0;

let outputBuffer = "";

function next() {
  return inputArray[currentIndex++];
}
function nextNum() {
  return +next();
}
function nextBigInt() {
  return BigInt(next());
}
function nexts(length: number) {
  const arr = [];
  for (let i = 0; i < length; ++i) arr[i] = next();
  return arr;
}
function nextNums(length: number) {
  const arr = [];
  for (let i = 0; i < length; ++i) arr[i] = nextNum();
  return arr;
}
function nextBigInts(length: number) {
  const arr = [];
  for (let i = 0; i < length; ++i) arr[i] = nextBigInt();
  return arr;
}

function print(out: string | number | bigint): void;
function print<T>(out: Array<T>, separator: string): void;
function print<T>(
  out: string | number | bigint | Array<T>,
  separator?: string
) {
  if (Array.isArray(out)) {
    outputBuffer += out.join(separator);
  } else {
    outputBuffer += out;
  }
}

function println(out: string | number | bigint): void;
function println<T>(out: Array<T>, separator: string): void;
function println<T>(
  out: string | number | bigint | Array<T>,
  separator?: string
) {
  if (Array.isArray(out)) {
    print(out, separator || "");
  } else {
    print(out);
  }
  print("\n");
}

function flush() {
  console.log(outputBuffer);
}

// デバッグ環境がWindowsであれば条件分岐する
if (process.env.OS == "Windows_NT") {
  const stream = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  stream.on("line", (line) => {
    inputs += line;
    inputs += "\n";
  });
  stream.on("close", () => {
    inputArray = inputs.split(/\s/);
    main();
    flush();
  });
} else {
  inputs = fs.readFileSync("/dev/stdin", "utf8");
  inputArray = inputs.split(/\s/);
  main();
  flush();
}
function main() {
    // 回答を記載
}
