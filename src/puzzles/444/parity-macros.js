import { assertValidState, solvedState } from "./state.js";
import { applyMoves, invertMoves } from "./moves.js";
import { EDGE_SLOTS, WING_SLOTS } from "./wings.js";
import { getMovePermutation } from "./moves.js";
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

const VERIFIED_PARITY_ALGORITHMS = Object.freeze([
  Object.freeze({
    parity: "OLL",
    moves: Object.freeze([
      "Rw2", "B2", "U2", "Lw", "U2", "Rw'", "U2", "Rw", "U2",
      "F2", "Rw", "F2", "Lw'", "B2", "Rw2"
    ])
  }),
  Object.freeze({
    parity: "PLL",
    moves: Object.freeze([
      "2R2", "U2", "2R2", "Uw2", "2R2", "Uw2", "U2"
    ])
  })
]);

const EDGE_BY_WING_SLOT = (() => {
  const result = Array(24);
  for (const edge of EDGE_SLOTS) {
    for (const slotIndex of edge.wingSlotIndices) result[slotIndex] = edge.index;
  }
  return Object.freeze(result);
})();

function preservesWingPairingStructure(destinationBySource, sourceByDestination = null) {
  const inverse = sourceByDestination ?? inversePermutation(destinationBySource);
  // A macro that maps each destination edge's two slots back to the same
  // source edge preserves pairing for every reduced state, not just solved.
  for (const edge of EDGE_SLOTS) {
    const [first, second] = edge.wingSlotIndices;
    if (EDGE_BY_WING_SLOT[inverse[first]] !== EDGE_BY_WING_SLOT[inverse[second]]) {
      return false;
    }
  }
  return true;
}

function preservesCompositionPairing(first, second) {
  // The composed move is second(first(source)); its inverse is
  // first^-1(second^-1(destination)). Avoid allocating a 24-slot permutation
  // for every candidate pair in the quadratic discovery loop.
  for (const edge of EDGE_SLOTS) {
    const [firstSlot, secondSlot] = edge.wingSlotIndices;
    const sourceA = first.inverse[second.inverse[firstSlot]];
    const sourceB = first.inverse[second.inverse[secondSlot]];
    if (EDGE_BY_WING_SLOT[sourceA] !== EDGE_BY_WING_SLOT[sourceB]) return false;
  }
  return true;
}

function wingPermutationForMoves(moves) {
  let destinationBySource = WING_SLOTS.map((_, index) => index);

  for (const move of moves) {
    const faceletPermutation = getMovePermutation(move);
    const destinationBySlot = WING_SLOTS.map((slot) => {
      const destinationFacelets = slot.faceletIndices.map(
        (faceletIndex) => faceletPermutation[faceletIndex]
      );
      const destinationSlots = destinationFacelets.map((faceletIndex) =>
        WING_SLOTS.findIndex((candidate) =>
          candidate.faceletIndices.includes(faceletIndex)
        )
      );
      if (
        destinationSlots[0] < 0 ||
        destinationSlots[0] !== destinationSlots[1]
      ) {
        throw new Error(`Parity macro ${move} did not preserve wing geometry`);
      }
      return destinationSlots[0];
    });

    destinationBySource = destinationBySource.map(
      (currentDestination) => destinationBySlot[currentDestination]
    );
  }

  return destinationBySource;
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
        permutation: Object.freeze([...permutation]),
        inverse: Object.freeze(inversePermutation(permutation))
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

const cachedMacroResults = new Map();

/**
 * Discover parity gadgets using known reduction algorithms plus locally
 * derived centre-neutral commutators. Every candidate must preserve the centre
 * colours and wing-pair structure for every reduced state, and its solved-state
 * fixture must exhibit OLL/PLL parity under the independent reduced-state
 * analyser.
 *
 * The local search checks one macro and then at most maxCompositions ordered
 * two-macro compositions. The known algorithms are validated by this same
 * path rather than trusted by name or notation. If no verified gadget is
 * available, that is an explicit unsupported case, not proof that no longer
 * parity algorithm exists.
 */
export function deriveReducedParityMacros({ maxCompositions = 100_000 } = {}) {
  if (!Number.isSafeInteger(maxCompositions) || maxCompositions < 0) {
    throw new RangeError("maxCompositions must be a non-negative integer");
  }
  if (cachedMacroResults.has(maxCompositions)) {
    return cachedMacroResults.get(maxCompositions);
  }

  const solved = solvedState();
  const actions = buildActions();
  const found = new Map();

  // Seed the bounded search with standard reduction-parity algorithms. They
  // are still checked against this project's own move model, centre layout,
  // wing-pair structure, and reduced-state legality analyser before use.
  for (const algorithm of VERIFIED_PARITY_ALGORITHMS) {
    inspectCandidate(
      solved,
      algorithm.moves,
      wingPermutationForMoves(algorithm.moves),
      found
    );
  }

  for (const action of actions) {
    inspectCandidate(solved, action.moves, action.permutation, found);
    if (found.has("OLL") && found.has("PLL")) break;
  }

  let compositionsChecked = 0;
  if (!(found.has("OLL") && found.has("PLL"))) {
    outer: for (const first of actions) {
      for (const second of actions) {
        if (compositionsChecked >= maxCompositions) break outer;
        compositionsChecked++;
        if (!preservesCompositionPairing(first, second)) continue;
        const permutation = combinedPermutation(first.permutation, second.permutation);

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

  const macros = Object.freeze([...found.values()]);
  cachedMacroResults.set(maxCompositions, macros);
  return macros;
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
