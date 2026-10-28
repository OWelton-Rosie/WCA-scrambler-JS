import { shuffle } from "../../core/random.js";
import { assertValidState } from "./state.js";
import { CENTRE_SLOTS } from "./centres.js";

const FACE_COLOURS = Object.freeze(["U", "R", "F", "D", "L", "B"]);

/** Uniformly sample the visible arrangement of four centres of each colour. */
export function sample444CentreColours({ randomWord } = {}) {
  const colours = FACE_COLOURS.flatMap((colour) => Array(4).fill(colour));
  return shuffle(colours, randomWord);
}

/**
 * Apply a centre coordinate while preserving all non-centre facelets.
 * This is a representation helper, not a reachability check.
 */
export function applyCentreColoursToFacelets(state, colours) {
  assertValidState(state);
  if (!Array.isArray(colours) || colours.length !== CENTRE_SLOTS.length) {
    throw new TypeError("Expected 24 centre colours");
  }

  const counts = Object.fromEntries(FACE_COLOURS.map((colour) => [colour, 0]));
  for (const colour of colours) {
    if (!Object.hasOwn(counts, colour)) throw new TypeError(`Invalid centre colour: ${colour}`);
    counts[colour]++;
  }
  if (!FACE_COLOURS.every((colour) => counts[colour] === 4)) {
    throw new RangeError("Centre coordinate must contain four of each colour");
  }

  const result = [...state];
  for (let i = 0; i < CENTRE_SLOTS.length; i++) {
    result[CENTRE_SLOTS[i].faceletIndex] = colours[i];
  }
  return result;
}
