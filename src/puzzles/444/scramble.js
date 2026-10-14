import { generateRandomWalkState } from "./random.js";

/**
 * Generate a 4x4 scramble using a random walk from the solved state.
 *
 * This samples move sequences, not uniformly distributed legal states.
 * It is an interim generator, not a WCA random-state implementation.
 *
 * @param {object} options
 * @param {number} [options.length=40] Number of moves.
 * @param {function} [options.randomWord] Optional uint32 random source.
 * @returns {{
 *   scramble: string,
 *   moves: string[],
 *   state: string[],
 *   method: "random-walk"
 * }}
 */
export function generate444RandomWalkScramble(options = {}) {
  const { moves, state } = generateRandomWalkState(options);

  return {
    scramble: moves.join(" "),
    moves,
    state,
    method: "random-walk"
  };
}