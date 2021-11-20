const m1 =
  "280dc9e47f3352c307f6d894ee8d534313429a79c1d8a6021f8a8eabca919cfb685a0d468973625e757490daa981ea6b";
const m2 =
  "3a0a9cab782b4f8603eac28aadde1151005fd46a859df21d12c38eaa858596bf2548000e883d72117466c5c3a580f66b";

const m3 =
  "3a0adee4783a538403b9c29eaac958550242d3778ed9a61918959bf4ca849afa68450f5edc6e311a7f7ed1d7ec";
// const m1 = "280dc9e4";
// const m2 = "3a0a9cab";

function xorHexes(a: Buffer, b: Buffer): Buffer {
  const res: number[] = [];

  for (const [index, el] of a.entries()) {
    res.push(el ^ (b[index] ?? 0));
  }
  return Buffer.from(res);
}

const asci1 = Buffer.from(m1, "hex");
const asci2 = Buffer.from(m2, "hex");
const asci3 = Buffer.from(m3, "hex");
// console.log([asci1], "\n", [asci2]);

const pseudoKey = xorHexes(asci1, asci3);

// console.log([pseudoKey]);
console.log([xorHexes(Buffer.from("The "), pseudoKey).toString()]);
