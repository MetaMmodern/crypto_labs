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
      const idx = text.charCodeAt(i);
      // console.log(idx, idx ^ offset);
      return String.fromCharCode(idx ^ offset);
    })
    .join("");
}
function runThroughtCeasar(text) {
  return Array.from(Array(26)).map((e, i) => {
    return simpleCaesar(text, i);
  });
}

function runThroughtXorCeasar(text) {
  return Array.from(Array(256)).map((e, i) => {
    return xorCaesar(text, i);
  });
}

const simpleText = "ABCDE";

const testText =
  "yXCENERGRCYPRNoxeTGRErPCDXBSCRDCEYPRXXESYSPARYCRRNDRNOXECRQEDCRCCRECCRYOXERCRCRYCNYSCRYOXEYROCTECPYCRYXCRYSDXXYnXBZNBDRYYSROXQTXYTSRYTRZZYPSDCYTRDDROZYCXYDCCDCTCRDCDXECRAREZRCXSNXBQRRXBSDXCRURDCERDBC";
const test2 =
  "7958401743454e1756174552475256435e59501a5c524e176f786517545e475f5245191772195019175e4317445f58425b531743565c521756174443455e595017d5b7ab5f525b5b58174058455b53d5b7aa175659531b17505e41525917435f52175c524e175e4417d5b7ab5c524ed5b7aa1b174f584517435f5217515e454443175b524343524517d5b7ab5fd5b7aa17405e435f17d5b7ab5cd5b7aa1b17435f5259174f584517d5b7ab52d5b7aa17405e435f17d5b7ab52d5b7aa1b17435f525917d5b7ab5bd5b7aa17405e435f17d5b7ab4ed5b7aa1b1756595317435f5259174f58451759524f4317545f564517d5b7ab5bd5b7aa17405e435f17d5b7ab5cd5b7aa175650565e591b17435f525917d5b7ab58d5b7aa17405e435f17d5b7ab52d5b7aa1756595317445817585919176e5842175a564e17424452175659175e5953524f1758511754585e59545e53525954521b177f565a5a5e595017535e4443565954521b177c56445e445c5e17524f565a5e5956435e58591b17444356435e44435e54565b17435244434417584517405f564352415245175a52435f5853174e5842175152525b174058425b5317445f584017435f52175552444317455244425b4319";

const ascii = Buffer.from(test2, "hex").toString();
const res = runThroughtXorCeasar(ascii);

// console.dir(res[55], { maxArrayLength: null });
// Now try a repeating-key XOR cipher.
// E.g. it should take a string "hello world" and, given the key is "key",
//  xor the first letter "h" with "k", then xor "e" with "e", then "l" with "y",
//  and then xor next char "l" with "k" again, then "o" with "e" and so on.
//  You may use an index of coincidence, Hamming distance, Kasiski examination, statistical tests or whatever method you
//  feel would show the best result.

function* _keyCharRepeater(key) {
  let i = 0;
  while (true) {
    yield key[i % key.length];
    i++;
  }
}
function generateLongKey(text, key) {
  let res = "";
  const gen = _keyCharRepeater(key);
  let l = text.length;
  while (l) {
    res += gen.next().value;
    l--;
  }
  return res;
}
function xorVigenere(text, key) {
  const longKey = generateLongKey(text, key);
  let res = "";
  let i = 0;
  while (i < text.length) {
    res += String.fromCharCode(
      text[i].charCodeAt(0) ^ longKey[i].charCodeAt(0)
    );
    i++;
  }
  return res;
}

console.log(xorVigenere("12345678", "key"));
