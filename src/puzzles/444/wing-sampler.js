import { randomPermutation } from "../../core/random.js";
import { assertValidState } from "./state.js";
import { WING_SLOTS } from "./wings.js";
import { WING_IDENTITY_COLOURS_BY_SLOT } from "./wing-coordinate.js";

/**
 * Uniformly sample the permutation of 24 labelled wing identities.
 *
 * Sticker placement is derived from the facelet move model in
 * wing-coordinate.js. No independent wing-orientation bits are sampled.
 */
export function sample444WingPermutation({ randomWord } = {}) {
  return randomPermutation(WING_SLOTS.length, randomWord);
}

/**
 * Apply a labelled wing permutation to the facelet state.
 *
 * permutation[slot] is the solved wing identity occupying that slot. The
 * identity-to-slot sticker mapping is derived by replaying legal moves through
 * the independent facelet permutation model. This writes wings only and does
 * not itself prove that the combined corner/centre/wing state is reachable.
 */
export function applyWingPermutationToFacelets(state, permutation) {
  assertValidState(state);

  if (!Array.isArray(permutation) || permutation.length !== WING_SLOTS.length) {
    throw new TypeError("Expected a permutation of 24 wing identities");
  }

  const seen = new Set(permutation);
  if (
    seen.size !== WING_SLOTS.length ||
    !permutation.every((identity) =>
      Number.isInteger(identity) && identity >= 0 && identity < WING_SLOTS.length
    )
  ) {
    throw new RangeError("Wing identities must be a permutation of 0..23");
  }

  const result = [...state];

  for (let slotIndex = 0; slotIndex < WING_SLOTS.length; slotIndex++) {
    const identity = permutation[slotIndex];
    const colours = WING_IDENTITY_COLOURS_BY_SLOT[identity][slotIndex];
    const faceletIndices = WING_SLOTS[slotIndex].faceletIndices;

    result[faceletIndices[0]] = colours[0];
    result[faceletIndices[1]] = colours[1];
  }

  return result;
}
