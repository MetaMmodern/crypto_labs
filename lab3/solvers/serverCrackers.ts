import { MTGenerator } from "../generators/MTGenerator";
import { CasinoRoyale } from "./../client";

import { LCGSolver } from "./LCGSolver";
import { MTSolver } from "./MTSolver";
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
export async function crackLcgServer(user: string) {
  const myCasino = new CasinoRoyale();
  const reg = await myCasino.registerUser(user);
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
}

export async function crackMtServer(user: string, mtType: "MT" | "BetterMT") {
  // const myCasino = new CasinoRoyale();
  // await myCasino.registerUser(user);
  // console.debug("registered");
  // const betResults: Awaited<ReturnType<CasinoRoyale["makeBet"]>>[] = [];
  // for (let i = 0; i < 624; i++) {
  //   betResults.push(await myCasino.makeBet(mtType, 1, 5));
  //   console.debug(i, "reguest");
  // }
  // // console.log(betResults);
  // const betNums: number[] = [];
  // betResults.forEach((el) => {
  //   if (!(el instanceof Error)) betNums.push(el.realNumber);
  // });

  const betNums: number[] = [];
  const tempGen = new MTGenerator(56478392);
  for (let i = 0; i < 624; i++) {
    betNums.push(Number(tempGen.Next()));
  }

  console.log("numbers got", betNums.length);
  // console.log(betNums);
  const cracker = new MTSolver(betNums);
  console.log("cracker worked");
  console.log([...cracker.state]);
  const solverMt = new MTGenerator(cracker.state[0]);
  for (let i = 0; i < 624; i++) {
    solverMt.Next();
  }
  console.log("solver worked");
  console.log([...solverMt.state]);
  // console.log(await myCasino.makeBet(mtType, 1, 5));
  console.log(tempGen.Next());
  console.log("myResult:", solverMt.Next());

  // console.log(tempGen.Next());
  // console.log("myResult:", solverMt.Next());

  // console.log(tempGen.Next());
  // console.log("myResult:", solverMt.Next());
}
