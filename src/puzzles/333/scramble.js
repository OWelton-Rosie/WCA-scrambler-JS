
import Cube from "cubejs";

import { randomLegalState } from "./random.js";
import {
  initialiseSolver,
  cubeFromState,
  solveState,
  invertSolution
} from "./solver.js";

const FACES = ["U", "R", "F", "D", "L", "B"];
const SUFFIXES = ["", "2", "'"];

let excludedStates;

function getExcludedStates() {
  if (!excludedStates) {
    const states = new Set();

    // The solved state.
    states.add(new Cube().asString());

    // The 18 possible single face turns.
    for (const face of FACES) {
      for (const suffix of SUFFIXES) {
        states.add(
          new Cube().move(face + suffix).asString()
        );
      }
    }

    excludedStates = states;
  }

  return excludedStates;
}

/**
 * Returns whether a legal cube state is eligible for scrambling:
 * it must not be solved or one face turn from solved.
 */
export function isEligibleState(stateData) {
  const cube = cubeFromState(stateData);
  return !getExcludedStates().has(cube.asString());
}

/**
 * Repeatedly samples legal states until an eligible one is found.
 * An optional randomWord function supports deterministic testing.
 */
export function sampleEligibleState(randomWord) {
  while (true) {
    const stateData = randomLegalState(randomWord);

    if (isEligibleState(stateData)) {
      return {
        stateData,
        cube: cubeFromState(stateData)
      };
    }
  }
}

export async function generate333(randomWord) {
  await initialiseSolver();

  const { stateData, cube: target } =
    sampleEligibleState(randomWord);

  const solution = solveState(stateData);
  const notation = invertSolution(solution);

  // Verify that the scramble reaches the sampled target.
  const replayed = new Cube().move(notation);

  if (replayed.asString() !== target.asString()) {
    throw new Error(
      "Scramble replay failed: generated state does not match target"
    );
  }

  // Verify the solution independently.
  const solved = target.clone().move(solution);

  if (!solved.isSolved()) {
    throw new Error(
      "Solution verification failed: target did not return to solved"
    );
  }

  return {
    event: "333",
    notation,
    moves: notation.split(/\s+/),
    state: stateData
  };
}
