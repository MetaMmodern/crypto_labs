import { GeneticAlgorithm } from "./lab1/part4";
import { generateBasePopulation, randomChar } from "./utils/generators";
import {
  fitness,
  crossover,
  pickoff,
  mutagen,
  decipher,
  textToDecipher,
} from "./utils";

let basePop = [
  ...generateBasePopulation(7000),
  // local hill max below
  [
    "B",
    "Y",
    "H",
    "G",
    "A",
    "L",
    "U",
    "M",
    "K",
    "J",
    "F",
    "E",
    "T",
    "V",
    "D",
    "R",
    "W",
    "X",
    "O",
    "S",
    "P",
    "N",
    "C",
    "Q",
    "I",
    "Z",
  ],
];

// figting over first place
const res = basePop
  .map((child) => {
    return { child, fit: fitness(child) };
  })
  .sort((a, b) => a.fit - b.fit);

// console.log(res[0]); // just shows the best from tournament
const iterations = 10;

const algo = new GeneticAlgorithm(
  [res[0].child],
  fitness,
  crossover,
  pickoff,
  mutagen,
  iterations
);

const key = algo.runGenerator();

console.log(key);
console.log(decipher(textToDecipher, key));
// console.log(getAllBigrams(textToDecipher));
// const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
// console.log(fitness(alphabet));
// console.log(fitness(mutagen(alphabet)));
// console.log("bcde".match(/.{2}/g));
