export function randomChar() {
  return String.fromCharCode(Math.random() * (91 - 65) + 65);
}
export function generateIndividuum() {
  const res: string[] = [];
  let i = 0;
  while (i < 26) {
    let value = randomChar();
    while (res.includes(value)) {
      value = randomChar();
    }
    res.push(value);
    i++;
  }
  return res;
}
export function generateBasePopulation(number = 10) {
  const res = [];
  let i = 0;
  while (i < number) {
    res.push(generateIndividuum());
    i++;
  }
  return res;
}
