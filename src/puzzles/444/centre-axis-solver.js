import { assertValidState } from "./state.js";
import { applyMoves } from "./moves.js";
import { encodeCentreAxisMask, solvedCentreAxisMask, CENTRE_AXIS_MOVES } from "./centre-axis-coordinate.js";
import { applyCentreAxisMaskMoveIndex, getCentreAxisDistance } from "./centre-axis-pruning.js";

const AXES = Object.freeze(["UD", "FB", "LR"]);
const WIDE_MOVE_INDICES = Object.freeze(
  CENTRE_AXIS_MOVES
    .map((entry, index) => ({ ...entry, index }))
    .filter((entry) => entry.move.includes("w"))
    .map((entry) => entry.index)
);
const MOVE_NAMES = CENTRE_AXIS_MOVES.map((entry) => entry.move);
const MOVE_FAMILY = MOVE_NAMES.map((move) => move.replace(/['2]$/, ""));

function masksFromState(state) {
  return AXES.map((axis) => encodeCentreAxisMask(state, axis));
}

const GOAL_MASKS = AXES.map((axis) => solvedCentreAxisMask(axis));

function isGoal(masks) {
  return masks.every((mask, index) => mask === GOAL_MASKS[index]);
}

function heuristic(masks) {
  let bound = 0;
  for (let i = 0; i < AXES.length; i++) {
    bound = Math.max(bound, getCentreAxisDistance(masks[i], AXES[i]));
  }
  return bound;
}

function moveMasks(masks, moveIndex) {
  return masks.map((mask) => applyCentreAxisMaskMoveIndex(mask, moveIndex));
}

/**
 * Solve the 4×4 centre axis-pair phase.
 *
 * Goal: all U/D-coloured centres occupy the U/D faces, all F/B centres occupy
 * the F/B faces, and all L/R centres occupy the L/R faces. Centres need not
 * yet be fully solved. Outer turns do not move centres, so the search uses
 * wide turns only. Exact single-axis BFS distances are combined with max(),
 * which remains an admissible lower bound for the joint goal.
 *
 * This is one phase of a reduction solver, not a complete 4×4 solver.
 */
export function solve444CentresToAxisPairs(
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

      const key = `${masks[0]},${masks[1]},${masks[2]}|${remaining}|${previousFamily ?? "-"}`;
      if (seen.has(key)) return null;
      seen.add(key);

      for (const moveIndex of WIDE_MOVE_INDICES) {
        const family = MOVE_FAMILY[moveIndex];

        // Consecutive turns of the same wide layer can be combined into one.
        if (family === previousFamily) continue;

        path.push(MOVE_NAMES[moveIndex]);
        const result = search(
          moveMasks(masks, moveIndex),
          remaining - 1,
          family
        );
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
        throw new Error("Centre axis-pair solver returned an unverified result");
      }
      return {
        moves,
        state: finalState,
        depth: moves.length,
        nodesVisited
      };
    }

    if (limitReached) break;
  }

  throw new RangeError(
    `No centre axis-pair solution found within depth ${maxDepth} and node limit ${maxNodes} (visited ${nodesVisited} nodes)`
  );
}
