
import { randomInt } from "../../core/random.js";
import { applyMoves, MOVE_NAMES } from "./moves.js";
import { solvedState } from "./state.js";

function getMoveFace(move) {
  if (move.startsWith("2")) {
    return move[1];
  }

  return move[0];
}

/**
 * Generate a random walk from the solved 4x4 state.
 *
 * This samples move sequences, not uniformly distributed cube states.
 *
 * @param {object} options
 * @param {number} [options.length=40] Number of moves to generate.
 * @param {function} [options.randomWord] Optional uint32 random source.
 * @returns {{ moves: string[], state: string[] }}
 */
export function generateRandomWalkState({
  length = 40,
  randomWord
} = {}) {
  if (!Number.isSafeInteger(length) || length < 1) {
    throw new RangeError("Length must be a positive integer");
  }

  const moves = [];
  let previousFace = null;

  for (let i = 0; i < length; i++) {
    const candidates = MOVE_NAMES.filter(
      (move) => getMoveFace(move) !== previousFace
    );

    const move = candidates[randomInt(candidates.length, randomWord)];

    moves.push(move);
    previousFace = getMoveFace(move);
  }

  const state = applyMoves(solvedState(), moves);

  return { moves, state };
}
