import { applyMoves, invertMoves } from "./moves.js";
import { solvedState } from "./state.js";
import { deriveCentreNeutralCommutators } from "./centre-neutral-macros.js";
import { countPairedEdges } from "./wing-pairing.js";
import { analyzeReduced444State } from "./reduced-solver.js";
import { toReduced3x3Facelets } from "./reduced.js";

function analyseIfReduced(state) {
  try {
    // This validates both centre colours and wing pairing before parity analysis.
    toReduced3x3Facelets(state);
    return analyzeReduced444State(state);
  } catch {
    return null;
  }
}

let cachedMacros;

/**
 * Discover short parity-changing gadgets from the locally derived
 * centre-neutral commutator set. A candidate must preserve centres, leave all
 * twelve wing pairs reduced, and produce a reproducible OLL/PLL parity flag
 * in the independent reduced-state analyser.
 *
 * Discovery may return no gadgets; callers must treat that as an unsupported
 * state rather than assume parity has been repaired.
 */
export function deriveReducedParityMacros() {
  if (cachedMacros) return cachedMacros;

  const solved = solvedState();
  const found = new Map();

  for (const macro of deriveCentreNeutralCommutators()) {
    if (macro.pairedEdges !== 12) continue;

    const state = applyMoves(solved, macro.moves);
    const analysis = analyseIfReduced(state);
    if (!analysis || analysis.legal) continue;

    for (const parity of ["OLL", "PLL"]) {
      if (!(parity === "OLL" ? analysis.ollParity : analysis.pllParity)) continue;

      const key = `${parity}:${macro.wingPermutationKey}`;
      if (found.has(key)) continue;
      found.set(key, Object.freeze({
        parity,
        moves: Object.freeze([...macro.moves]),
        inverseMoves: Object.freeze(invertMoves(macro.moves)),
        facelets: toReduced3x3Facelets(state),
        issues: Object.freeze([...analysis.issues]),
        wingPermutationKey: macro.wingPermutationKey
      }));
    }
  }

  cachedMacros = Object.freeze([...found.values()]);
  return cachedMacros;
}

/**
 * Attempt a bounded parity repair using discovered reduced-state gadgets.
 * The routine verifies every candidate through the 96-facelet model and the
 * reduced 3x3 legality analyser. It never assumes that a gadget works merely
 * because its solved-state fixture has a particular parity.
 */
export function repairReducedParityBounded(state, { maxSteps = 2 } = {}) {
  if (!Number.isSafeInteger(maxSteps) || maxSteps < 0) {
    throw new RangeError("maxSteps must be a non-negative integer");
  }

  let current = [...state];
  const moves = [];
  const visited = new Set([current.join("")]);
  const macros = deriveReducedParityMacros();

  for (let step = 0; step <= maxSteps; step++) {
    const analysis = analyseIfReduced(current);
    if (!analysis) {
      throw new RangeError("Parity repair requires a fully reduced 4x4 state");
    }
    if (analysis.legal) {
      return { solved: true, moves, state: current, analysis, steps: step };
    }
    if (step === maxSteps) break;

    let next = null;
    let nextMoves = null;
    let nextAnalysis = null;
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
          nextAnalysis = candidateAnalysis;
        }
      }
    }

    if (!next) break;
    visited.add(next.join(""));
    current = next;
    moves.push(...nextMoves);
  }

  const finalAnalysis = analyseIfReduced(current);
  return {
    solved: Boolean(finalAnalysis?.legal),
    moves,
    state: current,
    analysis: finalAnalysis,
    steps: moves.length === 0 ? 0 : undefined
  };
}
