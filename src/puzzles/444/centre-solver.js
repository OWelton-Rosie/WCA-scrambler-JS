
import { FACELETS, assertValidState } from "./state.js";
import { applyMove, MOVE_NAMES, parseMove } from "./moves.js";

const NORMAL_TO_FACE = new Map([
  ["0,1,0", "U"],
  ["1,0,0", "R"],
  ["0,0,1", "F"],
  ["0,-1,0", "D"],
  ["-1,0,0", "L"],
  ["0,0,-1", "B"]
]);

// A 4x4 centre facelet has coordinates with absolute values 3, 1, 1.
const CENTRE_FACELETS = FACELETS.flatMap((facelet, index) => {
  const coordinates = facelet.position.map(Math.abs).sort((a, b) => a - b);

  if (
    coordinates[0] !== 1 ||
    coordinates[1] !== 1 ||
    coordinates[2] !== 3
  ) {
    return [];
  }

  const face = NORMAL_TO_FACE.get(facelet.normal.join(","));

  if (!face) {
    throw new Error(`Unknown facelet normal: ${facelet.normal}`);
  }

  return [{ index, face }];
});

if (CENTRE_FACELETS.length !== 24) {
  throw new Error(
    `Expected 24 centre facelets; found ${CENTRE_FACELETS.length}`
  );
}

function centreKey(state) {
  return CENTRE_FACELETS
    .map(({ index }) => state[index])
    .join("");
}

/**
 * Return whether all 24 centre stickers match their respective faces.
 */
export function areCentresSolved(state) {
  assertValidState(state);

  return CENTRE_FACELETS.every(
    ({ index, face }) => state[index] === face
  );
}

function misplacedCentreCount(state) {
  let count = 0;

  for (const { index, face } of CENTRE_FACELETS) {
    if (state[index] !== face) count++;
  }

  return count;
}


function centreLowerBound(state) {
  // An inner-slice quarter-turn affects at most eight centre stickers.
  // This is an admissible lower bound for iterative-deepening search.
  return Math.ceil(misplacedCentreCount(state) / 8);
}

function sliceKey(move) {
  const { axis, layers } = parseMove(move);
  return `${axis}:${layers.join(",")}`;
}

// Outer and wide turns do not provide additional centre-colour moves.
const CENTRE_MOVES = MOVE_NAMES.filter((move) => move.startsWith("2"));

/**
 * Search for a sequence that solves the centres of a 4x4 state.
 *
 * This is a bounded search, not a complete arbitrary-state 4x4 solver.
 *
 * @param {number[]} state A 96-facelet 4x4 state.
 * @param {object} options Search limits.
 * @param {number} options.maxDepth Maximum solution length (default 4).
 * @param {number} options.maxNodes Maximum nodes searched (default 100000).
 * @returns {{ moves: string[], state: number[], depth: number, nodesVisited: number }}
 */
export function solveCentresBounded(
  state,
  { maxDepth = 4, maxNodes = 100000 } = {}
) {
  assertValidState(state);

  if (!Number.isSafeInteger(maxDepth) || maxDepth < 0) {
    throw new RangeError("maxDepth must be a non-negative integer");
  }

  if (!Number.isSafeInteger(maxNodes) || maxNodes < 1) {
    throw new RangeError("maxNodes must be a positive integer");
  }

  if (areCentresSolved(state)) {
    return {
      moves: [],
      state: [...state],
      depth: 0,
      nodesVisited: 0
    };
  }

  const start = [...state];
  let nodesVisited = 0;
  let limitReached = false;

  for (
    let depthLimit = centreLowerBound(start);
    depthLimit <= maxDepth;
    depthLimit++
  ) {
    const path = [];
    const seen = new Set();

    function search(current, remaining, previousSlice) {
      if (nodesVisited >= maxNodes) {
        limitReached = true;
        return null;
      }

      nodesVisited++;

      if (areCentresSolved(current)) {
        return [...path];
      }

      if (remaining === 0 || centreLowerBound(current) > remaining) {
        return null;
      }

      const key =
        `${centreKey(current)}|${remaining}|${previousSlice ?? "-"}`;

      if (seen.has(key)) return null;
      seen.add(key);

      for (const move of CENTRE_MOVES) {
        const currentSlice = sliceKey(move);

        // Consecutive turns of the same slice can be combined into one.
        if (currentSlice === previousSlice) continue;

        const next = applyMove(current, move);
        path.push(move);

        const result = search(next, remaining - 1, currentSlice);

        if (result !== null) return result;

        path.pop();

        if (limitReached) return null;
      }

      return null;
    }

    const moves = search(start, depthLimit, null);

    if (moves !== null) {
      const solvedState = moves.reduce(
        (current, move) => applyMove(current, move),
        start
      );

      if (!areCentresSolved(solvedState)) {
        throw new Error("Centre search returned an unverified solution");
      }

      return {
        moves,
        state: solvedState,
        depth: moves.length,
        nodesVisited
      };
    }

    if (limitReached) break;
  }

  throw new RangeError(
    `No centre solution found within depth ${maxDepth} ` +
    `and node limit ${maxNodes} (visited ${nodesVisited} nodes)`
  );
}
