
import { FACELETS, assertValidState, solvedState } from "./state.js";
import { CENTRE_SLOTS, extractCentreState } from "./centres.js";
import {
  EDGE_SLOTS,
  extractReducedEdges
} from "./wings.js";
import {
  extractCornerState,
  assertLegalCornerState,
  cornerPermutationParity
} from "./corners.js";

function permutationParity(permutation) {
  let parity = 0;

  for (let i = 0; i < permutation.length; i++) {
    for (let j = i + 1; j < permutation.length; j++) {
      if (permutation[i] > permutation[j]) {
        parity ^= 1;
      }
    }
  }

  return parity;
}

function edgeSignatureFromSolvedState(state, edgeSlot) {
  const wingIndex = edgeSlot.wingSlotIndices[0];
  const wing = extractReducedEdges(state)[edgeSlot.index].wings[0];

  // The solved edge identity is the colour pair at this geometric slot.
  // Use the wing index to keep the mapping tied to the fixed slot ordering.
  void wingIndex;

  return wing.signature;
}

const SOLVED_EDGE_ID_BY_SIGNATURE = new Map(
  EDGE_SLOTS.map((edge) => [
    edgeSignatureFromSolvedState(solvedState(), edge),
    edge.index
  ])
);

function centresAreSolved(state) {
  return extractCentreState(state).every(
    (centre) => centre.colour === centre.face
  );
}

function getReducedEdgePermutation(state) {
  const edges = extractReducedEdges(state);
  const permutation = [];

  for (const edge of edges) {
    const [first, second] = edge.wings;

    // A paired edge must have matching colour pairs and consistent
    // orientation across both wings.
    if (
      first.signature !== second.signature ||
      first.orientation === null ||
      first.orientation !== second.orientation
    ) {
      return null;
    }

    const identity = SOLVED_EDGE_ID_BY_SIGNATURE.get(first.signature);

    if (identity === undefined) {
      return null;
    }

    permutation.push(identity);
  }

  if (
    permutation.length !== 12 ||
    new Set(permutation).size !== 12
  ) {
    return null;
  }

  return permutation;
}

/**
 * Analyse PLL parity in a fully reduced 4x4 state.
 *
 * Returns null when the cube is not reduced enough for this analysis.
 * Otherwise returns:
 * {
 *   cornerParity: 0 | 1,
 *   edgeParity: 0 | 1,
 *   hasPLLParity: boolean,
 *   edgePermutation: number[]
 * }
 *
 * Assumes the conventional U/R/F/D/L/B colour scheme.
 */
export function analyzePLLParity(state) {
  assertValidState(state);

  if (!centresAreSolved(state)) {
    return null;
  }

  let cornerState;

  try {
    cornerState = extractCornerState(state);
    assertLegalCornerState(cornerState);
  } catch {
    return null;
  }

  const edgePermutation = getReducedEdgePermutation(state);

  if (!edgePermutation) {
    return null;
  }

  const cornerParity = cornerPermutationParity(cornerState);
  const edgeParity = permutationParity(edgePermutation);

  return {
    cornerParity,
    edgeParity,
    hasPLLParity: cornerParity !== edgeParity,
    edgePermutation
  };
}

export function hasPLLParity(state) {
  const analysis = analyzePLLParity(state);

  return analysis === null ? null : analysis.hasPLLParity;
}
