// sources: https://tailcall.net/posts/cracking-rngs-lcgs/
//          https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Extended_Euclidean_algorithm#:~:text=result%5B2%5D.toString()%20%2B%20%22%5D%22)%3B%0A%20%20%20%20%7D%0A%7D-,Python,-%5Bedit%20%7C%20edit%20source

export class MyLcgGenerator {
  private _last = 0n;
  private m = BigInt(Math.pow(2, 32));
  private a = 0n;
  private c = 0n;
  constructor(last: number, a: number, c: number) {
    this._last = BigInt(last);
    this.c = BigInt(c);
    this.a = BigInt(a);
  }
  public Next() {
    this._last = (this.a * this._last + this.c) % this.m; // m is 2^32
    return this._last;
  }
}

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
    const tmp = modinv(Number(this.state[1] - this.state[0]), Number(this.m));
    const a = ((this.state[2] - this.state[1]) * tmp) % this.m;
    return a;
  }
  public getNextValue() {
    this.last = (this.a * this.last + this.c) % this.m; // m is 2^32
    return this.last;
  }
}
// def egcd(a: int, b: int) -> Tuple[int, int, int]:
//     """return (g, x, y) such that a*x + b*y = g = gcd(a, b)"""
//     if a == 0:
//         return (b, 0, 1)
//     else:
//         b_div_a, b_mod_a = divmod(b, a)
//         g, x, y = egcd(b_mod_a, a)
// return (g, y - b_div_a * x, x)
export function egcd(a: number, b: number): [number, number, number] {
  if (a === 0) {
    return [b, 0, 1];
  }
  const b_div_a = b / a;
  const b_mod_a = b % a;
  const [g, x, y] = egcd(b_mod_a, a);
  return [g, y - b_div_a * x, x];
}

// def modinv(a: int, b: int) -> int:
//     """return x such that (x * a) % b == 1"""
//     g, x, _ = egcd(a, b)
//     if g != 1:
//         raise Exception('gcd(a, b) != 1')
//     return x % b

export function modinv(a: number, b: number): bigint {
  const [g, x, non] = egcd(a, b);
  console.log(g, x, non);
  if (g !== 1) {
    throw new Error("gcd(a, b) != 1");
  }
  return BigInt(x % b);
}
