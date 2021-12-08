import fs from "fs";
// src: https://nordpass.com/most-common-passwords-list/
// use ^ this code: Array.from(document.getElementsByClassName("font-bold w-full text-small Findings__password")).slice(0, 25).map(el=>el.innerText)
const a_top25 = [
  "123456",
  "123456789",
  "12345",
  "qwerty",
  "password",
  "12345678",
  "111111",
  "123123",
  "1234567890",
  "1234567",
  "qwerty123",
  "000000",
  "1q2w3e",
  "aa12345678",
  "abc123",
  "password1",
  "1234",
  "qwertyuiop",
  "123321",
  "password123",
  "1q2w3e4r5t",
  "iloveyou",
  "654321",
  "666666",
  "987654321",
];
const hundredkPasses = fs.readFileSync("./common100k.txt", "utf8").split("\n");

// division:
// 10 % most common
// 70 % from first 100k
// 5 % real random
// 15% humanified random with patterns

function* algorithmSelector(): IterableIterator<number> {
  const ranges = [
    [0, 4],
    [5, 14],
    [14, 29],
    [30, 99],
  ];
  const isInRange = (v: number, s: number, e: number) => v >= s && v <= e;
  const findRange = (v: number) =>
    ranges.findIndex((r) => isInRange(v, r[0], r[1]));
  while (true) {
    yield findRange(Math.random() * 100);
  }
}

function getRandom25ListPass() {
  return a_top25[Math.random() * a_top25.length];
}
function getRandom100kPass() {
  return hundredkPasses[Math.random() * hundredkPasses.length];
}
function getSuperRandomPass() {
  return "";
}
function getHumanLikeRandomPass() {
  return "";
}

const allAlgos: Array<() => string> = [
  getRandom25ListPass,
  getRandom100kPass,
  getSuperRandomPass,
  getHumanLikeRandomPass,
];

function generateNPasswords(n: number): string[] {
  const result: string[] = [];
  const getAlgoIndex = algorithmSelector();

  for (let i = 0; i < n; i++) {
    result.push(allAlgos[getAlgoIndex.next().value]());
  }
  return result;
}

function writePasswordsToFile(passwords: string[], fileName: string) {}

writePasswordsToFile(generateNPasswords(100000), "./result.csv");
