import { shuffle } from "../../core/random.js";

const FACE_COLOURS = Object.freeze(["U", "R", "F", "D", "L", "B"]);

/**
 * Uniformly sample the visible colour assignment of the 24 4x4 centre slots.
 *
 * Each face colour occurs four times. Shuffling this multiset uniformly
 * gives every distinct visible arrangement the same probability, because
 * every arrangement has exactly (4!)^6 labelled preimages.
 *
 * This samples centre colours only. It does not establish full 4x4
 * reachability and is not a complete random-state generator.
 *
 * @param {{ randomWord?: () => number }} [options]
 * @returns {string[]} 24 centre colours in CENTRE_SLOTS order.
 */
export function sample444CentreColours({ randomWord } = {}) {
  const colours = FACE_COLOURS.flatMap((colour) => Array(4).fill(colour));
  return shuffle(colours, randomWord);
}
