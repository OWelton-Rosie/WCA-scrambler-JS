import { assertValidState } from "./state.js";
import { applyMoves } from "./moves.js";
import {
  CENTRE_COLOUR_MOVES,
  CENTRE_COLOUR_NAMES,
  applyCentreColourMaskMoveIndex,
  encodeCentreColourMask,
  solvedCentreColourMask
} from "./centre-colour-coordinate.js";
import { getCentreColourDistance } from "./centre-colour-pruning.js";

const MOVE_NAMES = CENTRE_COLOUR_MOVES.map(({ move }) => move);
const MOVE_FAMILY = MOVE_NAMES.map((move) => move.replace(/['2]$/, ""));
const GOAL_MASKS = CENTRE_COLOUR_NAMES.map((colour) => solvedCentreColourMask(colour));

function masksFromState(state) {
  return CENTRE_COLOUR_NAMES.map((colour) => encodeCentreColourMask(state, colour));
}

function isGoal(masks) {
  return masks.every((mask, index) => mask === GOAL_MASKS[index]);
}

function heuristic(masks) {
  let maxDistance = 0;
  let distanceSum = 0;

  for (let i = 0; i < CENTRE_COLOUR_NAMES.length; i++) {
    const distance = getCentreColourDistance(masks[i], CENTRE_COLOUR_NAMES[i]);
    maxDistance = Math.max(maxDistance, distance);
    distanceSum += distance;
  }

  // A wide turn can change the positions of centres of at most four colours;
  // each individual pattern distance changes by at most one per move. Thus
  // ceil(sum / 4) is also admissible, and can be stronger than max(distance).
  return Math.max(maxDistance, Math.ceil(distanceSum / 4));
}

/**
 * Solve all 24 4×4 centres using outer and wide turns.
 *
 * Exact single-colour pattern databases provide an admissible lower bound.
 * This IDA* implementation is bounded; it reports search exhaustion rather
 * than claiming that a state is unsolvable.
 */
export function solve444CentresWithPatternDatabase(
  state,
  { maxDepth = 16, maxNodes = 1_000_000 } = {}
) {
  assertValidState(state);
  if (!Number.isSafeInteger(maxDepth) || maxDepth < 0) {
    throw new RangeError("maxDepth must be a non-negative integer");
  }
  if (!Number.isSafeInteger(maxNodes) || maxNodes < 1) {
    throw new RangeError("maxNodes must be a positive integer");
  }

  const start = masksFromState(state);
  if (isGoal(start)) {
    return { moves: [], state: [...state], depth: 0, nodesVisited: 0 };
  }

  let nodesVisited = 0;
  let limitReached = false;

  for (let depthLimit = heuristic(start); depthLimit <= maxDepth; depthLimit++) {
    const path = [];
    const seen = new Set();

    function search(masks, remaining, previousFamily) {
      if (nodesVisited >= maxNodes) {
        limitReached = true;
        return null;
      }
      nodesVisited++;

      if (isGoal(masks)) return [...path];
      if (remaining === 0 || heuristic(masks) > remaining) return null;

      const key = `${masks.join(",")}|${remaining}|${previousFamily ?? "-"}`;
      if (seen.has(key)) return null;
      seen.add(key);

      for (let moveIndex = 0; moveIndex < MOVE_NAMES.length; moveIndex++) {
        const family = MOVE_FAMILY[moveIndex];
        if (family === previousFamily) continue;

        const nextMasks = masks.map((mask) =>
          applyCentreColourMaskMoveIndex(mask, moveIndex)
        );

        path.push(MOVE_NAMES[moveIndex]);
        const result = search(nextMasks, remaining - 1, family);
        if (result !== null) return result;
        path.pop();
        if (limitReached) return null;
      }

      return null;
    }

    const moves = search(start, depthLimit, null);
    if (moves !== null) {
      const finalState = applyMoves(state, moves);
      if (!isGoal(masksFromState(finalState))) {
        throw new Error("Centre solver returned an unverified result");
      }
      return { moves, state: finalState, depth: moves.length, nodesVisited };
    }
    if (limitReached) break;
  }

  throw new RangeError(
    `No full centre solution found within depth ${maxDepth} and node limit ${maxNodes} (visited ${nodesVisited} nodes)`
  );
}
