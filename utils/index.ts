import { randomChar } from "./generators";
import { getRandomArbitrary } from "./getRandomArbitrary";
import bigrams from "./bigrams.json";
import trigrams from "./trigrams.json";

export const textToDecipher =
  "EFFPQLEKVTVPCPYFLMVHQLUEWCNVWFYGHYTCETHQEKLPVMSAKSPVPAPVYWMVHQLUSPQLYWLASLFVWPQLMVHQLUPLRPSQLULQESPBLWPCSVRVWFLHLWFLWPUEWFYOTCMQYSLWOYWYETHQEKLPVMSAKSPVPAPVYWHEPPLUWSGYULEMQTLPPLUGUYOLWDTVSQETHQEKLPVPVSMTLEUPQEPCYAMEWWYTYWDLUULTCYWPQLSEOLSVOHTLUYAPVWLYGDALSSVWDPQLNLCKCLRQEASPVILSLEUMQBQVMQCYAHUYKEKTCASLFPYFLMVHQLUPQLHULIVYASHEUEDUEHQBVTTPQLVWFLRYGMYVWMVFLWMLSPVTTBYUNESESADDLSPVYWCYAMEWPUCPYFVIVFLPQLOLSSEDLVWHEUPSKCPQLWAOKLUYGMQEUEMPLUSVWENLCEWFEHHTCGULXALWMCEWETCSVSPYLEMQYGPQLOMEWCYAGVWFEBECPYASLQVDQLUYUFLUGULXALWMCSPEPVSPVMSBVPQPQVSPCHLYGMVHQLUPQLWLRPOEDVMETBYUFBVTTPENLPYPQLWLRPTEKLWZYCKVPTCSTESQPBYMEHVPETCMEHVPETZMEHVPETKTMEHVPETCMEHVPETT";

export const decipher = (text: string, key: string[]) => {
  let res: string[] = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charIndex = char.charCodeAt(0) - 65;
    res.push(key[charIndex]);
  }
  return res.join("");
};

export const getNgramCount = (text: string, ngram: string) => {
  return [...text.matchAll(new RegExp(ngram, "g"))].length;
};
export const getAllBigrams = (text: string) => {
  const regex = new RegExp(".{2}", "g");
  const res = text.match(regex);
  if (!res) {
    throw new Error("result is null");
  }
  const secondPart = text.slice(1).match(regex);
  if (!secondPart) {
    throw new Error("second part is null");
  }

  return {
    totalNumber: res.length + secondPart.length,
    uniqueBigams: new Map(
      Array.from(new Set(res.concat(secondPart))).map((ngram) => [
        ngram,
        (getNgramCount(text, ngram) * 100) / (res.length + secondPart.length),
      ])
    ),
  };
};
export const getAllTrigrams = (text: string) => {
  const regex = new RegExp(".{3}", "g");
  const res = text.match(regex);
  if (!res) {
    throw new Error("result is null");
  }
  const secondPart = text.slice(1).match(regex);
  if (!secondPart) {
    throw new Error("second part is null");
  }
  const thirdPart = text.slice(2).match(regex);
  if (!thirdPart) {
    throw new Error("second part is null");
  }
  return {
    totalNumber: res.length + secondPart.length + thirdPart.length,
    uniqueTrigams: new Map(
      Array.from(new Set(res.concat(secondPart).concat(thirdPart))).map(
        (ngram) => [
          ngram,
          (getNgramCount(text, ngram) * 100) /
            (res.length + secondPart.length + thirdPart.length),
        ]
      )
    ),
  };
};

// export const fitness = (child: string[]) => {
//   const decryptedText = decipher(textToDecipher, child);
//   const bigramsInfo = getAllBigrams(decryptedText);
//   let biFitness = 0;
//   bigramsInfo.uniqueBigams.forEach((bigramValue, bigramKey) => {
//     biFitness += Math.abs(
//       bigramValue - bigrams[bigramKey as keyof typeof bigrams]
//     );
//   });

//   const trigramsInfo = getAllTrigrams(decryptedText);
//   let triFitness = 0;
//   trigramsInfo.uniqueTrigams.forEach((trigramValue, trigramKey) => {
//     triFitness += Math.abs(
//       trigrams[trigramKey as keyof typeof trigrams]
//         ? trigramValue - trigrams[trigramKey as keyof typeof trigrams]
//         : 0
//     );
//   });
//   return 1.2 * triFitness + biFitness;
// };
export const fitness = (child: string[]) => {
  const decryptedText = decipher(textToDecipher, child);
  const bigramsInfo = getAllBigrams(decryptedText);
  let biFitness = 0;
  bigramsInfo.uniqueBigams.forEach((bigramValue, bigramKey) => {
    biFitness += Math.abs(
      bigramValue - bigrams[bigramKey as keyof typeof bigrams]
    );
  });

  return biFitness;
};

export const crossover = (child1: string[], child2: string[]) => {
  const divisionI = 10;
  const substr1 = child1.slice(0, divisionI);
  const substr2Base = child1.slice(divisionI);
  const substr2 = substr2Base.map((char, index, arr) => {
    let ch = char;
    while (substr1.includes(ch) || substr2Base.slice(0, index).includes(ch)) {
      ch = randomChar();
    }
    return ch;
  });
  return [substr1.concat(substr2), substr2.concat(substr1)];
};

export const pickoff = (population: string[][]) => {
  return population;
};

export const mutagen = (child: string[]) => {
  const i = getRandomArbitrary(0, child.length);
  let j = getRandomArbitrary(0, child.length);
  while (j == i) {
    j = getRandomArbitrary(0, child.length);
  }

  let res = [...child];
  res[j] = res[i];
  res[i] = child[j];
  return res;
};

export const progressive_mutagen = (child: string[]) => {
  let l_fitness = fitness(child);
  let better_key = true;
  while (better_key) {
    better_key = false;
    for (let i = 0; i < child.length; i++) {
      for (let j = i; j < child.length; j++) {
        const ch1 = child[i];
        const ch2 = child[j];
        const newKey = [...child];
        newKey[i] = ch2;
        newKey[j] = ch1;
        const fit = fitness(newKey);
        if (fit < l_fitness) {
          l_fitness = fit;
          return newKey;
        } else {
          better_key = true;
        }
      }
    }
    // console.log("i'm still in while", i, j);
    better_key = false;
  }

  return mutagen(child);
};
