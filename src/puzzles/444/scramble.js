
import { generateRandomWalkState } from "./random.js";
import { applyMoves } from "./moves.js";
import { isSolved, solvedState } from "./state.js";
import {
  generateScramble as generateRandomStateScramble,
  prepareEvent
} from "@cubesmith/scrambler";

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

/**
 * Prepare the 4x4 solver before the first scramble is requested.
 *
 * The backend builds and caches its required tables during preparation.
 * Subsequent calls reuse the prepared data.
 */
export async function prepare444Scrambler() {
  await prepareEvent("444");
}

/**
 * Generate a 4x4x4 random-state scramble using the MIT-licensed
 * @cubesmith/scrambler reduction solver.
 *
 * The backend samples a legal random state, solves it using a reduction
 * pipeline, corrects reduction parity, and verifies the solution.
 * The scramble is replayed through this project's independent facelet model.
 *
 * A seed is supported for reproducible tests. The local randomWord injection
 * is deliberately rejected: forwarding only a 32-bit draw as a seed would
 * not preserve the backend's random-state distribution.
 *
 * @param {{ seed?: string | number, randomWord?: function }} [options]
 */
export async function generate444Scramble(options = {}) {
  if (options.randomWord !== undefined) {
    throw new TypeError(
      "The 4x4 backend does not support randomWord injection; use seed for reproducible tests"
    );
  }

  const backendOptions = options.seed === undefined
    ? {}
    : { seed: options.seed };

  const result = await generateRandomStateScramble(
    "444",
    backendOptions
  );

  const notation = result.moves.trim();
  const moves = notation.split(/\s+/);

  const state = applyMoves(solvedState(), moves);

  if (isSolved(state)) {
    throw new Error("The 4x4 backend returned a solved scramble state");
  }

  return {
    event: "444",
    notation,
    moves,
    state,
    method: result.quality,
    backend: "@cubesmith/scrambler"
  };
}
