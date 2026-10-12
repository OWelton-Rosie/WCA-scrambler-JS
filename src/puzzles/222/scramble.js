
import Cube from "cubejs";

import { randomLegalState } from "./random.js";
import { assertLegalState } from "./state.js";

import {
  initialiseSolver,
  cubeFromState,
  solveState,
  invertSolution
} from "./solver.js";

const FACES = ["U", "R", "F", "D", "L", "B"];
const SUFFIXES = ["", "2", "'"];

let excludedStates;

function stateKey(state) {
  return `${Array.from(state.cp).join(",")}|${Array.from(state.co).join(",")}`;
}

function getExcludedStates() {
  if (!excludedStates) {
    const states = new Set();

    states.add(stateKey({
      cp: [0, 1, 2, 3, 4, 5, 6, 7],
      co: Array(8).fill(0)
    }));

    for (const face of FACES) {
      for (const suffix of SUFFIXES) {
        const cube = new Cube().move(face + suffix);

        states.add(stateKey({
          cp: cube.cp,
          co: cube.co
        }));
      }
    }

    excludedStates = states;
  }

  return excludedStates;
}

export function isEligibleState(state) {
  assertLegalState(state);

  return !getExcludedStates().has(stateKey(state));
}

export function sampleEligibleState(randomWord) {
  while (true) {
    const state = randomLegalState(randomWord);

    if (isEligibleState(state)) {
      return {
        state,
        cube: cubeFromState(state)
      };
    }
  }
}

function hasSameCorners(cube, state) {
  return (
    Array.from(cube.cp).every((value, i) => value === state.cp[i]) &&
    Array.from(cube.co).every((value, i) => value === state.co[i])
  );
}

export async function generate222(randomWord) {
  await initialiseSolver();

  const { state, cube: target } =
    sampleEligibleState(randomWord);

  const solution = solveState(state);
  const notation = invertSolution(solution);

  const replayed = new Cube().move(notation);

  if (!hasSameCorners(replayed, state)) {
    throw new Error(
      "2×2 scramble replay failed: generated corner state does not match target"
    );
  }

  const solved = target.clone().move(solution);

  if (
    !Array.from(solved.cp).every((value, i) => value === i) ||
    !Array.from(solved.co).every(value => value === 0)
  ) {
    throw new Error(
      "2×2 solution verification failed: corners did not return to identity"
    );
  }

  return {
    event: "222",
    notation,
    moves: notation.split(/\s+/),
    state
  };
}
