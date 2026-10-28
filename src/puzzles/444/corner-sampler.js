import { randomInt, randomPermutation } from "../../core/random.js";

/**
 * Sample the corner coordinate of a 4x4 state.
 *
 * This samples the corner permutation uniformly from S8 and the corner
 * orientation uniformly from the 3^7 admissible orientation vectors. The
 * eighth orientation is determined by the twist-sum constraint.
 *
 * Important: this is only the corner coordinate. It is NOT a complete 4x4
 * state sampler and must not be used alone to produce competition scrambles.
 *
 * @param {{ randomWord?: () => number }} [options]
 * @returns {{ cp: number[], co: number[] }}
 */
export function sample444CornerState({ randomWord } = {}) {
  const cp = randomPermutation(8, randomWord);
  const co = [];

  let twistSum = 0;

  for (let i = 0; i < 7; i++) {
    const orientation = randomInt(3, randomWord);
    co.push(orientation);
    twistSum += orientation;
  }

  co.push((3 - (twistSum % 3)) % 3);

  return { cp, co };
}
