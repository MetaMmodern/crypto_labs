import { CasinoRoyale } from "./client";

import { LCGSolver } from "./utils";

// 1. register user. ✅
// 2. make 3 calls to backend and save values. ✅
// 3. load values to LCG solver and calculate a and c. ✅
// 4. run getting next value and sending a bet for 1000000-1000 times. ✅
// 5. log last Response. ✅

(async () => {
  const myCasino = new CasinoRoyale();
  const reg = await myCasino.registerUser("1234565432");
  console.log(reg);
  const first3Results = [
    await myCasino.makeBet("LCG", 1, 1),
    await myCasino.makeBet("LCG", 1, 1),
    await myCasino.makeBet("LCG", 1, 1),
  ];
  console.log(first3Results);
  const state = first3Results.map((res) => {
    if (res instanceof Error) {
      throw new Error("Not all first 3 were successful, check code.");
    } else {
      return BigInt(res.realNumber);
    }
  }) as [bigint, bigint, bigint];
  console.log(state);
  const solver = new LCGSolver(state, BigInt(Math.pow(2, 32)));
  solver.calcAandC();
  console.log("a, c:", solver.getAandC());

  let myAmount = 0;
  let lastResponse = first3Results[2];
  while (myAmount <= 1000000) {
    const nextVal = solver.getNextValue();
    lastResponse = await myCasino.makeBet("LCG", 500, Number(nextVal) | 0);
    if (!(lastResponse instanceof Error)) {
      myAmount = lastResponse.account.money;
    }
  }
  console.log(myAmount, "!!!!");
  console.log(JSON.stringify(lastResponse, null, 2));
})();
