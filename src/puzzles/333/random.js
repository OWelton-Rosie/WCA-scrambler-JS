import {
  randomInt,
  randomPermutation
} from "../../core/random.js";

import { permutationParity } from "./state.js";

function randomOrientation(size, modulus, randomWord) {
  const orientations = [];
  let sum = 0;

  // Sample all but the final orientation independently.
  for (let i = 0; i < size - 1; i++) {
    const orientation = randomInt(modulus, randomWord);

    orientations.push(orientation);
    sum += orientation;
  }

  // The final orientation enforces the orientation constraint.
  orientations.push((modulus - (sum % modulus)) % modulus);

  return orientations;
}

export function randomLegalState(randomWord) {
  let cp;
  let ep;

  // A legal cube requires matching corner and edge permutation parity.
  do {
    cp = randomPermutation(8, randomWord);
    ep = randomPermutation(12, randomWord);
  } while (permutationParity(cp) !== permutationParity(ep));

  return {
    center: [0, 1, 2, 3, 4, 5],
    cp,
    co: randomOrientation(8, 3, randomWord),
    ep,
    eo: randomOrientation(12, 2, randomWord)
  };
}