import { FACELETS, assertValidState } from "./state.js";
import { applyMoves, invertMoves } from "./moves.js";
import { CENTRE_SLOTS } from "./centres.js";
import { WING_SLOTS } from "./wings.js";
import { deriveCentreNeutralCommutators } from "./centre-neutral-macros.js";
import { countPairedEdges } from "./wing-pairing.js";
import { evaluateWingPairingHeuristic } from "./wing-pair-pruning.js";
import { toReduced3x3Facelets } from "./reduced.js";

function areCentresSolved(state) {
  return CENTRE_SLOTS.every(
    ({ faceletIndex }) => state[faceletIndex] === FACELETS[faceletIndex].face
  );
}

function isFullyReduced(state) {
  try {
    toReduced3x3Facelets(state);
    return true;
  } catch {
    return false;
  }
}

function wingStateKey(state) {
  return WING_SLOTS
    .flatMap(({ faceletIndices }) => faceletIndices)
    .map((index) => state[index])
    .join("");
}

function tryEvaluateHeuristic(state) {
  try {
    return evaluateWingPairingHeuristic(state);
  } catch (error) {
    if (error instanceof RangeError) return null;
    throw error;
  }
}

function buildActions() {
  const actions = new Map();

  for (const macro of deriveCentreNeutralCommutators()) {
    const direct = [...macro.wingDestinationBySource];
    const inverse = Array(direct.length);
    direct.forEach((destination, source) => {
      inverse[destination] = source;
    });

    for (const [moves, permutation] of [
      [macro.moves, direct],
      [invertMoves(macro.moves), inverse]
    ]) {
      const key = permutation.join(",");
      if (actions.has(key)) continue;
      actions.set(key, Object.freeze({
        moves: Object.freeze([...moves]),
        permutationKey: key
      }));
    }
  }

  return Object.freeze(
    [...actions.values()].sort((a, b) => a.moves.length - b.moves.length)
  );
}

let cachedActions;
function getActions() {
  if (!cachedActions) cachedActions = buildActions();
  return cachedActions;
}

function evaluate(state, moves, nodesVisited, macroDepth = 0) {
  return {
    state,
    moves,
    nodesVisited,
    macroDepth,
    pairedEdges: countPairedEdges(state),
    heuristic: tryEvaluateHeuristic(state),
    estimatedMacroDepth: tryEvaluateHeuristic(state)?.maxDistance ?? null
  };
}

function compareNodes(a, b) {
  if (a.estimatedMacroDepth !== null && b.estimatedMacroDepth !== null) {
    if (a.estimatedMacroDepth !== b.estimatedMacroDepth) {
      return a.estimatedMacroDepth - b.estimatedMacroDepth;
    }
  } else if (a.estimatedMacroDepth !== null) {
    return -1;
  } else if (b.estimatedMacroDepth !== null) {
    return 1;
  }

  // Sum of pair distances is a non-admissible tie-breaker, not a proof bound.
  const aTotal = a.heuristic?.totalDistance ?? Number.POSITIVE_INFINITY;
  const bTotal = b.heuristic?.totalDistance ?? Number.POSITIVE_INFINITY;
  if (aTotal !== bTotal) return aTotal - bTotal;

  if (a.pairedEdges !== b.pairedEdges) return b.pairedEdges - a.pairedEdges;
  return a.moves.length - b.moves.length;
}

/**
 * Search multiple centre-neutral wing macros with a bounded beam.
 *
 * This is an experimental, incomplete pairing search. Its exact single-pair
 * pattern databases provide a useful lower bound when the state is in the
 * discovered macro orbit; outside that orbit it ranks by paired-edge count.
 * A non-solved result is returned explicitly when the depth/node budget is
 * exhausted. This does not prove that no solution exists.
 */
export function searchWingPairingBounded(
  state,
  { maxMacroDepth = 3, maxNodes = 20000, beamWidth = 100 } = {}
) {
  assertValidState(state);
  if (!areCentresSolved(state)) {
    throw new RangeError("Wing-pairing search requires solved centre colours");
  }
  if (!Number.isSafeInteger(maxMacroDepth) || maxMacroDepth < 0) {
    throw new RangeError("maxMacroDepth must be a non-negative integer");
  }
  if (!Number.isSafeInteger(maxNodes) || maxNodes < 1) {
    throw new RangeError("maxNodes must be a positive integer");
  }
  if (!Number.isSafeInteger(beamWidth) || beamWidth < 1) {
    throw new RangeError("beamWidth must be a positive integer");
  }

  if (isFullyReduced(state)) {
    return {
      solved: true,
      moves: [],
      state: [...state],
      depth: 0,
      primitiveMoveCount: 0,
      pairedEdges: countPairedEdges(state),
      estimatedMacroDepth: 0,
      nodesVisited: 0
    };
  }

  const initial = evaluate([...state], [], 0, 0);
  let frontier = [initial];
  let best = initial;
  let nodesVisited = 0;
  const visited = new Set([wingStateKey(state)]);
  const actions = getActions();

  for (let depth = 1; depth <= maxMacroDepth; depth++) {
    const nextFrontier = [];

    for (const node of frontier) {
      for (const action of actions) {
        if (nodesVisited >= maxNodes) break;
        nodesVisited++;

        const nextState = applyMoves(node.state, action.moves);
        if (!areCentresSolved(nextState)) {
          throw new Error("A discovered centre-neutral macro changed centre colours");
        }

        const key = wingStateKey(nextState);
        if (visited.has(key)) continue;
        visited.add(key);

        const moves = [...node.moves, ...action.moves];
        const candidate = evaluate(nextState, moves, nodesVisited, depth);

        if (isFullyReduced(nextState)) {
          return {
            solved: true,
            moves,
            state: nextState,
            depth,
            primitiveMoveCount: moves.length,
            pairedEdges: candidate.pairedEdges,
            estimatedMacroDepth: 0,
            nodesVisited
          };
        }

        if (compareNodes(candidate, best) < 0) best = candidate;
        nextFrontier.push(candidate);
      }
      if (nodesVisited >= maxNodes) break;
    }

    if (nextFrontier.length === 0 || nodesVisited >= maxNodes) break;
    nextFrontier.sort(compareNodes);
    frontier = nextFrontier.slice(0, beamWidth);
  }

  return {
    solved: false,
    moves: [...best.moves],
    state: [...best.state],
    depth: best.macroDepth,
    primitiveMoveCount: best.moves.length,
    pairedEdges: best.pairedEdges,
    estimatedMacroDepth: best.estimatedMacroDepth,
    nodesVisited
  };
}
