
import {
  randomInt,
  randomPermutation
} from "../../core/random.js";

import {
  assertLegalState,
  identityState,
  permutationParity
} from "./state.js";

function randomOrientations(size, modulus, randomWord) {
  const result = [];
  let sum = 0;

  for (let i = 0; i < size - 1; i++) {
    const value = randomInt(modulus, randomWord);
    result.push(value);
    sum += value;
  }

  result.push((modulus - (sum % modulus)) % modulus);

  return result;
}

export function randomLegalState(randomWord) {
  let cp;
  let ep;

  do {
    cp = randomPermutation(8, randomWord);
    ep = randomPermutation(12, randomWord);
  } while (
    permutationParity(cp) !== permutationParity(ep)
  );

  const state = {
    ...identityState(),
    cp,
    ep,
    co: randomOrientations(8, 3, randomWord),
    eo: randomOrientations(12, 2, randomWord)
  };

  return assertLegalState(state);
}
