import { GeneticAlgorithm } from "./utils";
import { generateBasePopulation } from "../../utils/generators";
import {
  fitness,
  crossover,
  pickoff,
  mutagen,
  decipher,
  textToDecipher,
} from "../../utils";

let basePop = generateBasePopulation(5000)
  .map((child) => {
    return { child, fit: fitness(child) };
  })
  .sort((a, b) => a.fit - b.fit)
  .slice(0, 5)
  .map((e) => e.child);
let iterations = 100;
console.time("end");

const algo = new GeneticAlgorithm(
  basePop,
  fitness,
  crossover,
  pickoff,
  mutagen,
  iterations
);
const key = algo.runGenerator();

console.log(key);
console.log(decipher(textToDecipher, key));
console.timeEnd("end");
// console.log(getAllBigrams(textToDecipher));
// const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
// console.log(fitness(alphabet));
// console.log(fitness(mutagen(alphabet)));
// console.log("bcde".match(/.{2}/g));
