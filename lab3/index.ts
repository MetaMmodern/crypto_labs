import { MTSolver } from "./solvers/MTSolver";
import { MTGenerator } from "./generators/MTGenerator";
import { LCGSolver } from "./solvers/LCGSolver";
import { crackLcgServer, crackMtServer } from "./solvers/serverCrackers";

// 1. register user. ✅
// 2. make 3 calls to backend and save values. ✅
// 3. load values to LCG solver and calculate a and c. ✅
// 4. run getting next value and sending a bet for 1000000-1000 times. ✅
// 5. log last Response. ✅

(async () => {
  const userName = "beeqwraqwesdal";
  // await crackLcgServer(userName);
  await crackMtServer(userName, "MT");
  // await crackMtServer(userName, "BetterMT");
})();

// let test = -1149514587;

// test = MTSolver.unBitshiftRightXor(test, 18);
// test = MTSolver.unBitshiftLeftXor(test, 15, 0xefc60000);
// test = MTSolver.unBitshiftLeftXor(test, 7, 0x9d2c5680);
// test = MTSolver.unBitshiftRightXor(test, 11);

// console.log(test);
