
import {
  randomInt,
  randomPermutation
} from "../../core/random.js";

import { assertLegalState } from "./state.js";

const MOVABLE_CORNERS = [0, 1, 2, 3, 4, 5, 7];
const MOVABLE_POSITIONS = [0, 1, 2, 3, 4, 5, 7];

function randomCornerPermutation(randomWord) {
  const permutation = randomPermutation(7, randomWord);
  const cp = Array(8).fill(0);

  cp[6] = 6;

  for (let i = 0; i < MOVABLE_POSITIONS.length; i++) {
    cp[MOVABLE_POSITIONS[i]] = MOVABLE_CORNERS[permutation[i]];
  }

  return cp;
}

function randomCornerOrientations(randomWord) {
  const co = Array(8).fill(0);
  let sum = 0;

  // Six independent orientations. The final movable corner is
  // determined by the corner-orientation sum constraint.
  for (let i = 0; i < 6; i++) {
    co[i] = randomInt(3, randomWord);
    sum += co[i];
  }

  co[6] = 0;
  co[7] = (3 - (sum % 3)) % 3;

  return co;
}

export function randomLegalState(randomWord) {
  return assertLegalState({
    cp: randomCornerPermutation(randomWord),
    co: randomCornerOrientations(randomWord)
  });
}
