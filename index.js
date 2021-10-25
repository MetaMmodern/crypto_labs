// const alphabet = Array.from(Array(26)).map((_, i) =>
//   String.fromCharCode(i + 65)
// );

function simpleCaesar(text, offset, maxOffset = 26) {
  return text
    .split("")
    .map((el, i) => {
      const idx = text.charCodeAt(i) - 65;
      return String.fromCharCode(65 + ((idx + offset) % maxOffset));
    })
    .join("");
}

function xorCaesar(text, offset, maxOffset = 26) {
  return text
    .split("")
    .map((el, i) => {
      const idx = text.charCodeAt(i) - 65;
      // console.log(idx, idx ^ offset);
      return String.fromCharCode(65 + ((idx ^ offset) % maxOffset));
    })
    .join("");
}
function runThroughtCeasar(text) {
  return Array.from(Array(26)).map((e, i) => {
    return simpleCaesar(text, i);
  });
}

function runThroughtXorCeasar(text) {
  return Array.from(Array(26)).map((e, i) => {
    return xorCaesar(text, i);
  });
}

const simpleText = "ABCDE";

const res = runThroughtXorCeasar(simpleText);

console.log(res);
