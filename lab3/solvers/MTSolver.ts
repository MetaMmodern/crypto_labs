export class MTSolver {
  state: number[];
  constructor(allResponses: number[]) {
    this.state = allResponses.map(this.unapplyTransform, this);
  }
  private unapplyTransform(transformed: number): number {
    let value = BigInt(transformed);
    value = value ^ (value >> 18n);
    value = value ^ ((value << 15n) & 0xefc60000n);

    for (let i = 0; i < 7; i++) {
      value ^= (value << 7n) & 0x9d2c5680n;
    }

    for (let i = 0; i < 3; i++) {
      value = value ^ (value >> 11n);
    }
    return Number(value);
  }
}
