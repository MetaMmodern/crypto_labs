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
