// TODO: create constants in file
export class MTGenerator {
  private _state: bigint[];
  private currentIndex = 0n;
  constructor(seed: number) {
    this._state = [];
    this.initSeed(seed);
  }

  public get state(): bigint[] {
    return this._state;
  }
  private twist() {
    for (let i = 0; i < 624; i++) {
      // y is the first bit of the current number,
      // and the last 31 bits of the next number
      const y =
        (this._state[i] & BigInt(0x80000000)) +
        (this._state[(i + 1) % 624] & BigInt(0x7fffffff));
      // first bitshift y by 1 to the right
      let next = y >> 1n;
      // xor it with the 397th next number
      next ^= this._state[(i + 397) % 624];
      // if y is odd, xor with magic number
      if (y % 2n) {
        next ^= BigInt(0x9908b0df);
      }
      // now we have the result
      this._state[i] = next;
    }
    this.currentIndex = 0n;
  }

  private initSeed(seed: number) {
    this._state[0] = BigInt(seed);
    for (let i = 1; i < 624; i++) {
      const tmp =
        1812433253n *
          (this._state[i - 1] ^
            (BigInt(this._state[i - 1]) >> BigInt(32 - 2))) +
        BigInt(i);
      this._state[i] = tmp & BigInt(0xffffffff);
    }
  }

  public Next(): bigint {
    if (this.currentIndex >= 624) {
      this.twist();
    }
    let tmp = this.state[Number(this.currentIndex)];
    tmp ^= BigInt(tmp) >> BigInt(11n);
    tmp ^= (tmp << 7n) & BigInt(0x9d2c5680);
    tmp ^= (tmp << 15n) & BigInt(0xefc60000);
    tmp ^= tmp >> 18n;

    this.currentIndex++;
    return tmp;
  }
}
