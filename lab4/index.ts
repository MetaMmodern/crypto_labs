import {
  generateNPasswords,
  hashWithBcrypt,
  hashWithMD5,
  writeHashesToFile,
} from "./utils";

const passformd5 = generateNPasswords(100000);

console.log("Created passwords");
const md5hashes = hashWithMD5(passformd5);
console.log("hashed with md5");
writeHashesToFile(md5hashes, "weak");
console.log("Written to file");
const passforbcrypt = generateNPasswords(100000);
console.log("Created passwords");

const bcrypthashesWSalt = hashWithBcrypt(passforbcrypt);
console.log("hashed with bcrypt");

writeHashesToFile(
  bcrypthashesWSalt.map((pair) => pair.join("; ")),
  "strong_w_salt"
);
console.log("Written to file");
