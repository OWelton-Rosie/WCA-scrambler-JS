import { randomPermutation } from "../../core/random.js";

/**
 * Uniformly sample a permutation of the 24 labelled wing identities.
 *
 * Identity labels correspond to the 24 geometric wing locations in the
 * solved-state piece model. The labels are intentionally kept distinct even
 * where two wings have the same visible edge colours.
 *
 * This is only the wing-permutation coordinate. It does not assign sticker
 * orientation to a facelet state or prove joint reachability with corners
 * and centres.
 *
 * @param {{ randomWord?: () => number }} [options]
 * @returns {number[]} A permutation of integers 0..23.
 */
export function sample444WingPermutation({ randomWord } = {}) {
  return randomPermutation(24, randomWord);
}
