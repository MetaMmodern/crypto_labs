// TODO: create constants in file
export class MTGenerator {
  private MTVars = {
    W: BigInt(32),
    N: BigInt(624),
    M: BigInt(397),
    R: BigInt(31),
    A: BigInt(0x9908b0df),
    U: BigInt(11),
    D: BigInt(0xffffffff),
    S: BigInt(7),
    B: BigInt(0x9d2c5680),
    T: BigInt(15),
    C: BigInt(0xefc60000),
    L: BigInt(18),
    F: BigInt(1812433253),
    ONE: BigInt(1),
    lMask: (1n << 31n) - 1n,
    uMask: 1n << 31n,
  };
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
    for (let i = 0; i < this.MTVars.N; i++) {
      let x =
        (this.state[i] & this.MTVars.uMask) +
        (this.state[Number(BigInt(i + 1) % this.MTVars.N)] & this.MTVars.lMask);
      let xA = x >> this.MTVars.ONE;
      if (x % BigInt(2) !== BigInt(0)) {
        xA = xA ^ this.MTVars.A;
      }
      this.state[i] =
        this.state[Number((BigInt(i) + this.MTVars.M) % this.MTVars.N)] ^ xA;
    }
    this.currentIndex = 0n;
  }

  private initSeed(seed: number) {
    this.state[0] = BigInt(seed);
    for (let i = 1; i < this.MTVars.N; i++) {
      this.state[i] =
        (this.MTVars.F *
          (this.state[i - 1] ^
            (this.state[i - 1] >> (this.MTVars.W - BigInt(2)))) +
          BigInt(i)) &
        ((this.MTVars.ONE << this.MTVars.W) - this.MTVars.ONE);
    }
  }

  public Next(): bigint {
    if (this.currentIndex >= this.MTVars.N) {
      if (this.currentIndex > this.MTVars.N) {
        throw new Error("Generator was never seeded");
      }
      this.twist();
    }

    let y = this.state[Number(this.currentIndex)];
    y = y ^ ((y >> this.MTVars.U) & this.MTVars.D);
    y = y ^ ((y << this.MTVars.S) & this.MTVars.B);
    y = y ^ ((y << this.MTVars.T) & this.MTVars.C);
    y = y ^ (y >> this.MTVars.L);

    this.currentIndex++;
    return y & ((this.MTVars.ONE << this.MTVars.W) - this.MTVars.ONE);
  }
  public setStateWithIndex(state: number[], i: number) {
    this._state = [...state].map(BigInt);
    this.currentIndex = BigInt(i);
  }
}
