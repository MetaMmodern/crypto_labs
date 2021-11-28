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
  return BigInt(Math.floor(x % b));
}

export function modInverseStackoverflow(a: number, m: number): bigint {
  // validate inputs
  [a, m] = [Number(a), Number(m)];
  if (Number.isNaN(a) || Number.isNaN(m)) {
    throw new Error("Invalid number");
  }
  a = ((a % m) + m) % m;
  if (!a || m < 2) {
    throw new Error("invalid input");
  }
  // find the gcd
  const s = [];
  let b = m;
  while (b) {
    [a, b] = [b, a % b];
    s.push({ a, b });
  }
  if (a !== 1) {
    throw new Error(" inverse does not exists");
  }
  // find the inverse
  let x = 1;
  let y = 0;
  for (let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)];
  }
  return BigInt(((y % m) + m) % m);
}
