
import Cube from "cubejs";

let initialisation;

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

export function cubeFromState(state) {
  return new Cube({
    center: state.center ?? [0, 1, 2, 3, 4, 5],
    cp: state.cp,
    co: state.co,
    ep: state.ep,
    eo: state.eo
  });
}

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

export function invertSolution(solution) {
  return Cube.inverse(solution).trim();
}
