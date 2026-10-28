import { randomInt, randomPermutation, shuffle } from "../../core/random.js";
import { FACES, solvedState, assertValidState } from "./state.js";
import { WING_SLOTS } from "./wings.js";

const FACE_ORDER = new Map(FACES.map((face, index) => [face, index]));
const sortedPair = (pair) => [...pair].sort((a, b) => FACE_ORDER.get(a) - FACE_ORDER.get(b));

function deriveEdgePairs() {
  const solved = solvedState();
  const pairs = new Map();
  for (const slot of WING_SLOTS) {
    const pair = sortedPair(slot.faceletIndices.map((index) => solved[index]));
    pairs.set(pair.join(""), pair);
  }
  const result = [...pairs.values()];
  if (result.length !== 12) throw new Error(`Expected 12 edge-colour pairs; found ${result.length}`);
  return result;
}

export const EDGE_COLOUR_PAIRS = Object.freeze(
  deriveEdgePairs().map((pair) => Object.freeze([...pair]))
);

/**
 * Uniformly sample the visible wing coordinate: each adjacent face-colour
 * pair occurs twice, and each slot has one sticker-order bit.
 *
 * This is not yet a proven reachable-state sampler.
 */
export function sample444WingState({ randomWord } = {}) {
  const edgePairs = shuffle(
    EDGE_COLOUR_PAIRS.flatMap((pair) => [pair.join(""), pair.join("")]),
    randomWord
  );
  const orientations = Array.from(
    { length: WING_SLOTS.length },
    () => randomInt(2, randomWord)
  );
  return { edgePairs, orientations };
}

/** Sample a permutation of 24 abstract labelled wings for experiments. */
export function sample444WingPermutation({ randomWord } = {}) {
  return randomPermutation(24, randomWord);
}

/**
 * Apply a visible wing coordinate while preserving corners and centres.
 * The resulting facelet state is not asserted to be reachable.
 */
export function applyWingStateToFacelets(state, wingState) {
  assertValidState(state);
  const { edgePairs, orientations } = wingState ?? {};

  if (!Array.isArray(edgePairs) || edgePairs.length !== WING_SLOTS.length ||
      !Array.isArray(orientations) || orientations.length !== WING_SLOTS.length) {
    throw new TypeError("Expected 24 wing pairs and 24 orientation bits");
  }

  const validPairs = new Set(EDGE_COLOUR_PAIRS.map((pair) => pair.join("")));
  const counts = new Map();
  for (const pair of edgePairs) {
    if (typeof pair !== "string" || !validPairs.has(pair)) {
      throw new TypeError(`Invalid wing edge pair: ${pair}`);
    }
    counts.set(pair, (counts.get(pair) ?? 0) + 1);
  }
  if (counts.size !== 12 || [...counts.values()].some((count) => count !== 2)) {
    throw new RangeError("Wing coordinate must contain each edge pair twice");
  }
  if (!orientations.every((orientation) => orientation === 0 || orientation === 1)) {
    throw new RangeError("Wing orientation values must be 0 or 1");
  }

  const result = [...state];
  for (let i = 0; i < WING_SLOTS.length; i++) {
    const pair = edgePairs[i].split("");
    const colours = orientations[i] === 0 ? pair : [...pair].reverse();
    const indices = WING_SLOTS[i].faceletIndices;
    result[indices[0]] = colours[0];
    result[indices[1]] = colours[1];
  }
  return result;
}
