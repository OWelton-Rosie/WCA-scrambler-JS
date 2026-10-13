
import {
  randomInt,
  randomPermutation
} from "../../core/random.js";

import { permutationParity } from "./state.js";

function randomEdgePermutation(randomWord) {
  while (true) {
    const ep = randomPermutation(6, randomWord);

    if (permutationParity(ep) === 0) {
      return ep;
    }
  }
}

function randomEdgeOrientations(randomWord) {
  const eo = [];
  let sum = 0;

  for (let i = 0; i < 5; i++) {
    const orientation = randomInt(2, randomWord);

    eo.push(orientation);
    sum += orientation;
  }

  eo.push(sum % 2);

  return eo;
}

function randomTips(randomWord) {
  return Array.from(
    { length: 4 },
    () => randomInt(3, randomWord)
  );
}

export function randomLegalState(randomWord) {
  return {
    ep: randomEdgePermutation(randomWord),
    eo: randomEdgeOrientations(randomWord),
    tips: randomTips(randomWord)
  };
}
