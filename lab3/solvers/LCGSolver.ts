// sources: https://tailcall.net/posts/cracking-rngs-lcgs/
//          https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Extended_Euclidean_algorithm#:~:text=result%5B2%5D.toString()%20%2B%20%22%5D%22)%3B%0A%20%20%20%20%7D%0A%7D-,Python,-%5Bedit%20%7C%20edit%20source

import { modInverseStackoverflow } from "../utils";

export class LCGSolver {
  private state: [bigint, bigint, bigint];
  private last: bigint;
  public a = 0n;
  public c = 0n;
  private m: bigint;
  constructor(state: [bigint, bigint, bigint], m: bigint) {
    this.state = state;
    this.m = m;
    this.last = state[2];
  }
  public calcAandC() {
    this.a = this.getA();
    this.c = this.getC();
    // return [this.a, this.c];
  }
  public getAandC(): [bigint, bigint] {
    return [this.a, this.c];
  }
  // def crack_unknown_increment(states, modulus, multiplier):
  //     increment = (states[1] - states[0]*multiplier) % modulus
  //     return modulus, multiplier, increment
  private getC(): bigint {
    return (this.state[1] - this.state[0] * this.a) % this.m;
  }
  // def crack_unknown_multiplier(states, modulus):
  //     multiplier = (states[2] - states[1]) * modinv(states[1] - states[0], modulus) % modulus
  //     return crack_unknown_increment(states, modulus, multiplier)
  private getA() {
    const tmp = modInverseStackoverflow(
      Number(this.state[1] - this.state[0]),
      Number(this.m)
    );
    const a = ((this.state[2] - this.state[1]) * tmp) % this.m;
    return a;
  }
  public getNextValue() {
    this.last = (this.a * this.last + this.c) % this.m; // m is 2^32
    return this.last;
  }
}
