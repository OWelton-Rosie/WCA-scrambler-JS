import Cube from "cubejs";
import { assertLegalState } from "./state.js";

let initialisation;

/**
 * Initialise cubejs's solver tables once.
 *
 * Concurrent callers share the same initialisation promise. If initialisation
 * fails, clear the cached promise so a later call can retry.
 */
export async function initialiseSolver() {
  if (!initialisation) {
    initialisation = Promise.resolve().then(() => {
      Cube.initSolver();
    });
  }

  try {
    await initialisation;
  } catch (error) {
    initialisation = undefined;
    throw error;
  }
}

/**
 * Convert a legal cubie state into a cubejs Cube.
 *
 * States may omit `center`; when omitted, the fixed identity centre
 * arrangement is used.
 */
export function cubeFromState(state) {
  assertLegalState(state);

  return new Cube({
    center: state.center ?? [0, 1, 2, 3, 4, 5],
    cp: state.cp,
    co: state.co,
    ep: state.ep,
    eo: state.eo
  });
}

/**
 * Solve a legal cube state and verify the returned solution.
 *
 * Call initialiseSolver() before calling this function.
 */
export function solveState(state) {
  const cube = cubeFromState(state);
  const solution = cube.solve();

  if (typeof solution !== "string" || !solution.trim()) {
    throw new Error("Solver did not return a valid solution");
  }

  if (!cube.clone().move(solution).isSolved()) {
    throw new Error("Solver returned a solution that failed verification");
  }

  return solution.trim();
}

/**
 * Invert a move sequence, producing the sequence that undoes it.
 */
export function invertSolution(solution) {
  return Cube.inverse(solution).trim();
}