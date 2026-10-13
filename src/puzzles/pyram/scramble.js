
import {
  applyAlgorithm,
  assertLegalState,
  identityState
} from "./state.js";

import { randomLegalState } from "./random.js";

import {
  initialiseSolver,
  distanceToSolved,
  solveState,
  invertSolution
} from "./solver.js";

const MINIMUM_SOLUTION_LENGTH = 6;
const TIP_FACES = ["u", "l", "r", "b"];

function sameState(a, b) {
  return (
    a.ep.every((value, i) => value === b.ep[i]) &&
    a.eo.every((value, i) => value === b.eo[i]) &&
    a.tips.every((value, i) => value === b.tips[i])
  );
}

export function isEligibleState(state) {
  assertLegalState(state);

  return distanceToSolved(state) >= MINIMUM_SOLUTION_LENGTH;
}

export function sampleEligibleState(randomWord) {
  while (true) {
    const state = randomLegalState(randomWord);

    if (isEligibleState(state)) {
      return {
        state,
        distance: distanceToSolved(state)
      };
    }
  }
}

function addTipMoves(notation, state) {
  const replayed = applyAlgorithm(identityState(), notation);
  const tipMoves = [];

  for (let i = 0; i < 4; i++) {
    const correction = (state.tips[i] - replayed.tips[i] + 3) % 3;

    if (correction === 1) {
      tipMoves.push(TIP_FACES[i]);
    } else if (correction === 2) {
      tipMoves.push(`${TIP_FACES[i]}'`);
    }
  }

  return [notation, ...tipMoves].filter(Boolean).join(" ");
}

export async function generatePyram(randomWord) {
  await initialiseSolver();

  const { state } = sampleEligibleState(randomWord);

  const solution = solveState(state);
  const bodyScramble = invertSolution(solution);
  const notation = addTipMoves(bodyScramble, state);

  const replayed = applyAlgorithm(identityState(), notation);

  if (!sameState(replayed, state)) {
    throw new Error(
      "Pyraminx scramble replay failed: generated state does not match target"
    );
  }

  const solvedEdges = applyAlgorithm(
    { ...state, tips: [0, 0, 0, 0] },
    solution
  );

  if (
    !solvedEdges.ep.every((value, i) => value === i) ||
    !solvedEdges.eo.every(value => value === 0)
  ) {
    throw new Error("Pyraminx solution verification failed");
  }

  return {
    event: "pyram",
    notation,
    moves: notation.split(/\s+/),
    state
  };
}
