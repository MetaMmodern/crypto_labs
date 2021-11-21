import { timeStamp } from "console";
import { generateBasePopulation } from "../utils/generators";
import { modinv, MyLcgGenerator } from "./utils";

// 1. -1465342059
// 2. 1565643760
// 3. 1182291599
// 4. guess #4 // 922702498

// attempt 2
// 1. -2142924256
// 4. -1121959031
const gen = new MyLcgGenerator(6972089, 69069, -4293797003);
console.log(gen.Next());
console.log(gen.Next());
console.log(gen.Next());
console.log(gen.Next());
console.log(gen.Next());

// const states: [bigint, bigint, bigint] = [977421n, 445704189n, 1377647485n];
// const states: [bigint, bigint, bigint] = [6972089n, 520048282n, 404463303n];
// const solver = new LCGSolver(states, BigInt(Math.pow(2, 32)));
// solver.calcAandC();
// console.log(solver.getAandC());
// console.log(solver.getNextValue());

// TODO:
// 1. register user.
// 2. make 3 calls to backend and save values.
// 3. load values to LCG solver and calculate a and c.
// 4. run getting next value and sending a bet for 1000000-1000 times.
// 5. log last Response.
