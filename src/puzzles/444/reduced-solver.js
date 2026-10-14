import Cube from "cubejs";

import { initialiseSolver } from "../333/solver.js";
import { isLegalState, permutationParity } from "../333/state.js";
import { toReduced3x3Facelets } from "./reduced.js";

const FACE_COLOURS = ["U", "R", "F", "D", "L", "B"];
const FACELET_COUNT = 54;

function assertValidFaceletString(facelets) {
  if (typeof facelets !== "string" || facelets.length !== FACELET_COUNT) {
    throw new TypeError("Expected a 54-character 3x3 facelet string");
  }

  for (const colour of FACE_COLOURS) {
    const count = [...facelets].filter((sticker) => sticker === colour).length;

    if (count !== 9) {
      throw new TypeError(
        `Invalid 3x3 facelet string: expected 9 ${colour} stickers`
      );
    }
  }

  if ([...facelets].some((sticker) => !FACE_COLOURS.includes(sticker))) {
    throw new TypeError("Invalid 3x3 facelet string: unknown face colour");
  }
}

/**
 * Inspect a 3x3 facelet representation for the two parity conditions
 * that can occur when reducing a 4x4.
 *
 * This diagnoses parity; it does not repair it.
 */
export function analyzeReduced3x3Facelets(facelets) {
  assertValidFaceletString(facelets);

  const cube = Cube.fromString(facelets);

  const state = {
    center: [...cube.center],
    cp: [...cube.cp],
    co: [...cube.co],
    ep: [...cube.ep],
    eo: [...cube.eo]
  };

  const cornerOrientationSum = state.co.reduce(
    (sum, orientation) => sum + orientation,
    0
  );

  const edgeOrientationSum = state.eo.reduce(
    (sum, orientation) => sum + orientation,
    0
  );

  const cornerPermutationParity = permutationParity(state.cp);
  const edgePermutationParity = permutationParity(state.ep);

  const issues = [];

  if (cornerOrientationSum % 3 !== 0) {
    issues.push("Invalid corner orientation sum");
  }

  if (edgeOrientationSum % 2 !== 0) {
    issues.push("OLL parity: the reduced edge orientation sum is odd");
  }

  if (cornerPermutationParity !== edgePermutationParity) {
    issues.push("PLL parity: corner and edge permutation parity differ");
  }

  if (!isLegalState(state) && issues.length === 0) {
    issues.push("The projected state fails the 3x3 legality checks");
  }

  return {
    facelets,
    state,
    legal: isLegalState(state),
    cornerOrientationSum,
    edgeOrientationSum,
    cornerPermutationParity,
    edgePermutationParity,
    ollParity: edgeOrientationSum % 2 !== 0,
    pllParity: cornerPermutationParity !== edgePermutationParity,
    issues
  };
}

/**
 * Inspect a reduced 4x4 state.
 *
 * The reduction converter rejects unsolved centres and incompatible
 * wing stickers before the projected 3x3 state is analysed.
 */
export function analyzeReduced444State(state) {
  return analyzeReduced3x3Facelets(toReduced3x3Facelets(state));
}

/**
 * Solve the final 3x3 stage of a reduced 4x4.
 *
 * This deliberately refuses states with OLL or PLL parity.
 * A future 4x4 reduction stage must resolve those cases first.
 */
export async function solveReduced3x3(state) {
  const analysis = analyzeReduced444State(state);

  if (!analysis.legal) {
    throw new RangeError(
      `Cannot solve reduced 3x3 state: ${analysis.issues.join("; ")}`
    );
  }

  await initialiseSolver();

  const cube = Cube.fromString(analysis.facelets);
  const solution = cube.solve();

  if (typeof solution !== "string") {
    throw new Error("The 3x3 solver did not return a solution");
  }

  const verified = cube.clone().move(solution);

  if (!verified.isSolved()) {
    throw new Error("The 3x3 solver returned an unverified solution");
  }

  return {
    facelets: analysis.facelets,
    solution: solution.trim(),
    analysis
  };
}
