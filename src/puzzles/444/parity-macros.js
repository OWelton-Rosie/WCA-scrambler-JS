import { assertValidState, solvedState } from "./state.js";
import { applyMoves, invertMoves } from "./moves.js";
import { EDGE_SLOTS } from "./wings.js";
import { deriveCentreNeutralCommutators } from "./centre-neutral-macros.js";
import { analyzeReduced444State } from "./reduced-solver.js";
import { toReduced3x3Facelets } from "./reduced.js";

function analyseIfReduced(state) {
  try {
    toReduced3x3Facelets(state);
    return analyzeReduced444State(state);
  } catch {
    return null;
  }
}

function inversePermutation(destinationBySource) {
  const inverse = Array(destinationBySource.length);
  destinationBySource.forEach((destination, source) => {
    inverse[destination] = source;
  });
  return inverse;
}

function preservesWingPairingStructure(destinationBySource) {
  const sourceByDestination = inversePermutation(destinationBySource);
  const edgeByWingSlot = Array(24);

  for (const edge of EDGE_SLOTS) {
    for (const slotIndex of edge.wingSlotIndices) {
      edgeByWingSlot[slotIndex] = edge.index;
    }
  }

  // A macro that maps each destination edge's two slots back to the same
  // source edge preserves pairing for every reduced state, not just solved.
  return EDGE_SLOTS.every((edge) => {
    const [first, second] = edge.wingSlotIndices;
    return edgeByWingSlot[sourceByDestination[first]] ===
      edgeByWingSlot[sourceByDestination[second]];
  });
}

function buildActions() {
  const actions = [];
  const seen = new Set();

  for (const macro of deriveCentreNeutralCommutators()) {
    const direct = [...macro.wingDestinationBySource];
    const inverse = inversePermutation(direct);

    for (const [moves, permutation] of [
      [macro.moves, direct],
      [invertMoves(macro.moves), inverse]
    ]) {
      const key = moves.join(" ");
      if (seen.has(key)) continue;
      seen.add(key);
      actions.push(Object.freeze({
        moves: Object.freeze([...moves]),
        permutation: Object.freeze([...permutation])
      }));
    }
  }

  return Object.freeze(actions);
}

function combinedPermutation(first, second) {
  return first.map((destination) => second[destination]);
}

function inspectCandidate(solved, moves, permutation, found) {
  if (!preservesWingPairingStructure(permutation)) return;

  const state = applyMoves(solved, moves);
  const analysis = analyseIfReduced(state);
  if (!analysis || analysis.legal) return;

  for (const parity of ["OLL", "PLL"]) {
    const present = parity === "OLL" ? analysis.ollParity : analysis.pllParity;
    if (!present || found.has(parity)) continue;

    found.set(parity, Object.freeze({
      parity,
      moves: Object.freeze([...moves]),
      inverseMoves: Object.freeze(invertMoves(moves)),
      facelets: toReduced3x3Facelets(state),
      issues: Object.freeze([...analysis.issues]),
      wingPermutation: Object.freeze([...permutation])
    }));
  }
}

let cachedMacros;

/**
 * Discover parity gadgets by composing the local centre-neutral commutators.
 * A candidate must preserve the centre colours and the pairing structure for
 * every reduced state, and its solved-state fixture must exhibit the declared
 * OLL/PLL parity under the independent reduced-state analyser.
 *
 * Searches one macro and then ordered two-macro compositions. It may still
 * find no gadget; that is an explicit unsupported case, not proof that no
 * longer parity algorithm exists.
 */
export function deriveReducedParityMacros() {
  if (cachedMacros) return cachedMacros;

  const solved = solvedState();
  const actions = buildActions();
  const found = new Map();

  for (const action of actions) {
    inspectCandidate(solved, action.moves, action.permutation, found);
    if (found.has("OLL") && found.has("PLL")) break;
  }

  if (!(found.has("OLL") && found.has("PLL"))) {
    outer: for (const first of actions) {
      for (const second of actions) {
        const permutation = combinedPermutation(first.permutation, second.permutation);
        if (!preservesWingPairingStructure(permutation)) continue;

        inspectCandidate(
          solved,
          [...first.moves, ...second.moves],
          permutation,
          found
        );
        if (found.has("OLL") && found.has("PLL")) break outer;
      }
    }
  }

  cachedMacros = Object.freeze([...found.values()]);
  return cachedMacros;
}

/**
 * Attempt a bounded parity repair using verified gadgets. Every candidate is
 * replayed on the current facelet state and accepted only if the resulting
 * reduced 3x3 is legal. If the discovered gadget set cannot repair the state,
 * the function returns solved:false rather than claiming success.
 */
export function repairReducedParityBounded(state, { maxSteps = 2 } = {}) {
  assertValidState(state);
  if (!Number.isSafeInteger(maxSteps) || maxSteps < 0) {
    throw new RangeError("maxSteps must be a non-negative integer");
  }

  let current = [...state];
  const moves = [];
  const visited = new Set([current.join("")]);
  let steps = 0;

  for (let step = 0; step <= maxSteps; step++) {
    const analysis = analyseIfReduced(current);
    if (!analysis) {
      throw new RangeError("Parity repair requires a fully reduced 4x4 state");
    }
    if (analysis.legal) {
      return { solved: true, moves, state: current, analysis, steps: step };
    }
    if (step === maxSteps) break;

    const macros = deriveReducedParityMacros();
    let next = null;
    let nextMoves = null;
    let bestIssueCount = analysis.issues.length;

    for (const macro of macros) {
      for (const sequence of [macro.moves, macro.inverseMoves]) {
        const candidate = applyMoves(current, sequence);
        const candidateAnalysis = analyseIfReduced(candidate);
        if (!candidateAnalysis) continue;

        if (candidateAnalysis.legal) {
          return {
            solved: true,
            moves: [...moves, ...sequence],
            state: candidate,
            analysis: candidateAnalysis,
            steps: step + 1
          };
        }

        if (candidateAnalysis.issues.length < bestIssueCount) {
          const key = candidate.join("");
          if (visited.has(key)) continue;
          bestIssueCount = candidateAnalysis.issues.length;
          next = candidate;
          nextMoves = sequence;
        }
      }
    }

    if (!next) break;
    visited.add(next.join(""));
    current = next;
    moves.push(...nextMoves);
    steps++;
  }

  return {
    solved: false,
    moves,
    state: current,
    analysis: analyseIfReduced(current),
    steps
  };
}
