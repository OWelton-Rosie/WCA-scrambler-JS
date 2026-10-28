import { FACELETS, assertValidState } from "./state.js";
import { applyMoves, invertMoves } from "./moves.js";
import { CENTRE_SLOTS } from "./centres.js";
import { deriveCentreNeutralCommutators } from "./centre-neutral-macros.js";
import { countPairedEdges } from "./wing-pairing.js";
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

/**
 * Try one centre-neutral macro that improves wing pairing.
 *
 * This is a bounded one-step improvement primitive, not a complete pairing
 * solver. It checks every discovered macro and its inverse, prefers a fully
 * reduced result, and otherwise returns the best paired-edge-count increase.
 * Returns null when no candidate improves the current diagnostic score.
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
      fullyReduced: true
    };
  }

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
        fullyReduced: true
      };
    }

    if (
      pairedEdges > currentPairedEdges &&
      (best === null || pairedEdges > best.pairedEdges)
    ) {
      best = {
        moves: [...moves],
        state: nextState,
        currentPairedEdges,
        pairedEdges,
        fullyReduced: false
      };
    }
  }

  return best;
}
