import { applyMoves } from "./moves.js";
import { solveReduced3x3 } from "./reduced-solver.js";
import { assertValidState, isSolved } from "./state.js";

/**
 * Solve a 4x4 whose centres are solved and wings are paired.
 *
 * The reduced 3x3 solver handles the remaining outer-layer moves.
 * This function does not reduce an arbitrary 4x4 state.
 *
 * @param {string[]} state A reduced 4x4 facelet state.
 * @returns {Promise<{solution: string, state: string[]}>}
 */
export async function solve444State(state) {
  assertValidState(state);

  const result = await solveReduced3x3(state);
  const solution = result.solution;

  const finalState = applyMoves(state, solution);

  if (!isSolved(finalState)) {
    throw new Error(
      "The 4x4 solution failed full-state verification"
    );
  }

  return {
    solution,
    state: finalState
  };
}