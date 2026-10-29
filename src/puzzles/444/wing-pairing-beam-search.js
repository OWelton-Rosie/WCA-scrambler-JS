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
      const inverseOfPermutation = Array(permutation.length);
      permutation.forEach((destination, source) => {
        inverseOfPermutation[destination] = source;
      });
      actions.set(key, Object.freeze({
        moves: Object.freeze([...moves]),
        permutationKey: key,
        permutation: Object.freeze([...permutation]),
        inversePermutationKey: inverseOfPermutation.join(",")
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
  const heuristic = tryEvaluateHeuristic(state);
  return {
    state,
    moves,
    nodesVisited,
    macroDepth,
    pairedEdges: countPairedEdges(state),
    heuristic,
    estimatedMacroDepth: heuristic?.maxDistance ?? null
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


/**
 * Iterative-deepening depth-first search over the same verified centre-neutral
 * macro set. Unlike the beam search, this does not discard a promising branch
 * merely because it falls outside a fixed-width frontier. It remains bounded
 * by maxMacroDepth and maxNodes, so exhaustion is not proof of impossibility.
 *
 * The max single-pair distance is used only when every pair coordinate is in
 * the exact pattern-database orbit. Outside that orbit the search remains
 * correct but loses this pruning advantage.
 */
export function searchWingPairingIdaBounded(
  state,
  { maxMacroDepth = 3, maxNodes = 100_000 } = {}
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

  const initial = [...state];
  if (isFullyReduced(initial)) {
    return {
      solved: true, moves: [], state: initial, depth: 0,
      primitiveMoveCount: 0, pairedEdges: countPairedEdges(initial),
      estimatedMacroDepth: 0, nodesVisited: 0, strategy: "ida"
    };
  }

  const actions = getActions();
  const actionByPermutation = new Map(
    actions.map((action) => [action.permutationKey, action])
  );
  const startHeuristic = tryEvaluateHeuristic(initial);
  const firstLimit = startHeuristic?.maxDistance ?? 0;
  let nodesVisited = 0;
  let budgetExhausted = false;
  let best = evaluate(initial, [], 0, 0);

  for (let depthLimit = firstLimit; depthLimit <= maxMacroDepth; depthLimit++) {
    const path = [];
    const seen = new Map();

    function search(current, remaining, previousPermutationKey) {
      if (nodesVisited >= maxNodes) {
        budgetExhausted = true;
        return null;
      }
      nodesVisited++;

      const node = evaluate(current, [...path], nodesVisited, depthLimit - remaining);
      if (compareNodes(node, best) < 0) best = node;
      if (isFullyReduced(current)) return [...path];
      if (remaining === 0) return null;

      const estimate = tryEvaluateHeuristic(current);
      if (estimate && estimate.maxDistance > remaining) return null;

      const key = wingStateKey(current);
      const previousRemaining = seen.get(key);
      if (previousRemaining !== undefined && previousRemaining >= remaining) return null;
      seen.set(key, remaining);

      for (const action of actions) {
        // Avoid immediately undoing the previous macro. The action set is
        // deduplicated by wing permutation, so equal keys imply equal effects.
        if (previousPermutationKey) {
          const previous = actionByPermutation.get(previousPermutationKey);
          if (previous?.inversePermutationKey === action.permutationKey) continue;
        }

        const nextState = applyMoves(current, action.moves);
        if (!areCentresSolved(nextState)) {
          throw new Error("A discovered centre-neutral macro changed centre colours");
        }

        path.push(...action.moves);
        const result = search(nextState, remaining - 1, action.permutationKey);
        if (result !== null) return result;
        path.splice(path.length - action.moves.length, action.moves.length);
        if (budgetExhausted) return null;
      }
      return null;
    }

    const moves = search(initial, depthLimit, null);
    if (moves !== null) {
      const finalState = applyMoves(initial, moves);
      if (!isFullyReduced(finalState)) {
        throw new Error("Wing-pair IDA search returned an unverified result");
      }
      return {
        solved: true, moves, state: finalState, depth: depthLimit,
        primitiveMoveCount: moves.length, pairedEdges: countPairedEdges(finalState),
        estimatedMacroDepth: 0, nodesVisited, strategy: "ida"
      };
    }
    if (budgetExhausted) break;
  }

  return {
    solved: false,
    moves: [...best.moves],
    state: [...best.state],
    depth: best.macroDepth,
    primitiveMoveCount: best.moves.length,
    pairedEdges: best.pairedEdges,
    estimatedMacroDepth: best.estimatedMacroDepth,
    nodesVisited,
    budgetExhausted,
    strategy: "ida"
  };
}
