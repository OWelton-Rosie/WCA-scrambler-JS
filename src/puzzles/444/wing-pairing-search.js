import { FACELETS, assertValidState } from "./state.js";
import { applyMoves, invertMoves } from "./moves.js";
import { CENTRE_SLOTS } from "./centres.js";
import { deriveCentreNeutralCommutators } from "./centre-neutral-macros.js";
import { countPairedEdges } from "./wing-pairing.js";
import { estimateWingPairingMacroDepth } from "./wing-pair-pruning.js";
import { toReduced3x3Facelets } from "./reduced.js";

function areCentresSolved(state) {
  return CENTRE_SLOTS.every(
    ({ faceletIndex }) => state[faceletIndex] === FACELETS[index].face
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

function tryEstimateMacroDepth(state) {
  try {
    return estimateWingPairingMacroDepth(state);
  } catch (error) {
    if (error instanceof RangeError) return null;
    throw error;
  }
}

/**
 * Try one centre-neutral macro that improves wing pairing.
 *
 * This is a bounded one-step improvement primitive, not a complete pairing
 * solver. It checks each discovered macro and its inverse, prefers a fully
 * reduced result, and otherwise ranks candidates by the exact single-pair
 * macro-depth heuristic when the state lies in the discovered macro orbit.
 * Outside that orbit it falls back to the paired-edge diagnostic.
 */
export function findWingPairingImprovement(state) {
  assertValidState(state);
  if (!areCentresSolved(state)) {
    throw new RangeError("Wing-pairing improvement requires solved centre colours");
  }

  const currentPairedEdges = countPairedEdges(state);
  if (isFullyReduced(state)) {
    return {
      moves: [],
      state: [...state],
      currentPairedEdges,
      pairedEdges: currentPairedEdges,
      estimatedMacroDepth: 0,
      fullyReduced: true
    };
  }

  const currentMacroDepth = tryEstimateMacroDepth(state);
  const candidates = [];
  const seen = new Set();
  for (const macro of deriveCentreNeutralCommutators()) {
    for (const moves of [macro.moves, invertMoves(macro.moves)]) {
      const key = moves.join(" ");
      if (seen.has(key)) continue;
      seen.add(key);
      candidates.push(moves);
    }
  }

  let best = null;
  for (const moves of candidates) {
    const nextState = applyMoves(state, moves);
    if (!areCentresSolved(nextState)) {
      throw new Error("A discovered centre-neutral macro changed centre colours");
    }

    const pairedEdges = countPairedEdges(nextState);
    const fullyReduced = isFullyReduced(nextState);
    if (fullyReduced) {
      return {
        moves: [...moves],
        state: nextState,
        currentPairedEdges,
        pairedEdges,
        estimatedMacroDepth: 0,
        fullyReduced: true
      };
    }

    const estimatedMacroDepth = currentMacroDepth === null
      ? null
      : tryEstimateMacroDepth(nextState);
    const improvesDepth = (
      currentMacroDepth !== null &&
      estimatedMacroDepth !== null &&
      estimatedMacroDepth < currentMacroDepth
    );
    const improvesPairCount = pairedEdges > currentPairedEdges;
    if (!improvesDepth && !improvesPairCount) continue;

    const candidate = {
      moves: [...moves],
      state: nextState,
      currentPairedEdges,
      pairedEdges,
      estimatedMacroDepth,
      fullyReduced: false
    };

    const better = best === null ||
      (
        candidate.estimatedMacroDepth !== null &&
        (
          best.estimatedMacroDepth === null ||
          candidate.estimatedMacroDepth < best.estimatedMacroDepth
        )
      ) ||
      (
        candidate.estimatedMacroDepth === best.estimatedMacroDepth &&
        candidate.pairedEdges > best.pairedEdges
      ) ||
      (
        candidate.estimatedMacroDepth === null &&
        best.estimatedMacroDepth === null &&
        candidate.pairedEdges > best.pairedEdges
      );

    if (better) best = candidate;
  }

  return best;
}
