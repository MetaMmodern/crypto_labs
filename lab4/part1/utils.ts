import path from "path";
import fs from "fs";
import generatePassword from "password-generator";
import crypto from "crypto";
import bcrypt from "bcrypt";
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
const hundredkPasses = fs
  .readFileSync(path.resolve(__dirname, "./common100k.txt"), "utf8")
  .split("\n");

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
    [30, 100],
  ];
  const isInRange = (v: number, s: number, e: number) => v >= s && v <= e;
  const findRange = (v: number) =>
    ranges.findIndex((r) => isInRange(v, r[0], r[1]));
  while (true) {
    yield findRange(Math.round(Math.random() * 100));
  }
}

function getRandom25ListPass() {
  return a_top25[Math.round(Math.random() * (a_top25.length - 1))];
}
function getRandom100kPass() {
  return hundredkPasses[
    Math.round(Math.random() * (hundredkPasses.length - 1))
  ];
}
const randomNumber = () => Math.round(Math.random() * 10).toString();
const randomLetter = () =>
  String.fromCharCode(Math.random() * 25 + [65, 97][Math.round(Math.random())]);
function getSuperRandomPass() {
  const length = Math.round(Math.random() * 2 + 6);
  const res: string[] = [];
  for (let i = 0; i < length; i++) {
    Math.round(Math.random())
      ? res.push(randomNumber())
      : res.push(randomLetter());
  }
  return res.join("");
}
function getHumanLikeRandomPass() {
  return generatePassword(8) + generatePassword(4, true, /[0-9]/);
}

const allAlgos: Array<() => string> = [
  getRandom25ListPass,
  getRandom100kPass,
  getSuperRandomPass,
  getHumanLikeRandomPass,
];

export function generateNPasswords(n: number): string[] {
  const result: string[] = [];
  const getAlgoIndex = algorithmSelector();
  for (let i = 0; i < n; i++) {
    const index = getAlgoIndex.next().value;
    result.push(allAlgos[0]());
  }
  return result;
}

export function hashWithMD5(passwords: string[]) {
  const hashMD5 = crypto.createHash("md5");
  return passwords.map((p) => hashMD5.update(p).copy().digest("hex"));
}
export function hashWithBcrypt(passwords: string[]) {
  const results: [string, string][] = [];

  passwords.forEach((p) => {
    const salt = bcrypt.genSaltSync(5);
    results.push([bcrypt.hashSync(p, salt), salt]);
  });
  return results;
}
export function writeHashesToFile(hashes: string[], fileName: string) {
  if (!fs.existsSync(path.resolve(__dirname, "output")))
    fs.mkdirSync(path.resolve(__dirname, "output"));
  fs.writeFileSync(
    path.resolve(
      __dirname + "/output/",
      `${fileName}_${new Date().toISOString().replace(/:/g, "_")}.csv`
    ),
    hashes.join("\n")
  );
}
