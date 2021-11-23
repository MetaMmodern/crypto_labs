const fetch = require("node-fetch");

export interface userRegisteredResponse {
  id: string;
  money: number;
  deletionTime: string;
}
export interface Account {
  id: string;
  money: number;
  deletionTime: Date;
}
export interface BetResponse {
  message: string;
  account: Account;
  realNumber: number;
}
export class CasinoRoyale {
  private host = "http://95.217.177.249/casino/";
  private id = "";
  public async registerUser(id: string) {
    const res = await this.makeRequest<userRegisteredResponse>(
      `${this.host}createacc?id=${id}`
    );
    this.id = id;
    return res;
  }

  public async makeBet(
    gameMode: "LCG" | "MT" | "BetterMT",
    bet = 1,
    number = 0
  ) {
    switch (gameMode) {
      case "LCG":
        return await this.playLCG(bet, number);
      default:
        return new Error("sorry buddy(");
    }
  }
  private async playLCG(betAmount: number, betNumber: number) {
    return await this.makeRequest<BetResponse>(
      `${this.host}playLcg?id=${this.id}&bet=${betAmount}&number=${betNumber}`
    );
  }
  private async makeRequest<RType>(url: string): Promise<RType | Error> {
    try {
      const res = await fetch(url);
      const json = await res.json();
      return json as RType;
    } catch (error: any) {
      console.log(error);
      return await Promise.resolve(error as Error);
    }
  }
}
