import { assertValidState, isSolved } from "./state.js";
import { applyMoves } from "./moves.js";
import { CENTRE_SLOTS } from "./centres.js";
import { FACELETS } from "./state.js";
import { solve444CentresWithPatternDatabase } from "./centre-colour-solver.js";
import { searchWingPairingBounded } from "./wing-pairing-beam-search.js";
import { solveReduced3x3 } from "./reduced-solver.js";
import { toReduced3x3Facelets } from "./reduced.js";

function centresAreSolved(state) {
  return CENTRE_SLOTS.every(
    ({ faceletIndex }) => state[faceletIndex] === FACELETS[faceletIndex].face
  );
}

function replayAndCompare(input, moves, expected, stage) {
  const replayed = applyMoves(input, moves);
  if (replayed.some((sticker, index) => sticker !== expected[index])) {
    throw new Error(`${stage} stage returned a state that does not match move replay`);
  }
  return replayed;
}

/**
 * Attempt a bounded, end-to-end 4x4 solve using the current experimental
 * reduction stages.
 *
 * The function fails explicitly if centre search, wing pairing, or reduced
 * 3x3 legality checks cannot complete. It does not repair OLL/PLL parity and
 * is not a complete solver for arbitrary legal 4x4 states.
 */
export async function solve444Bounded(
  state,
  {
    centreMaxDepth = 16,
    centreMaxNodes = 1_000_000,
    wingMaxMacroDepth = 3,
    wingMaxNodes = 20_000,
    wingBeamWidth = 100
  } = {}
) {
  assertValidState(state);
  const initial = [...state];
  if (isSolved(initial)) {
    return {
      solved: true,
      moves: [],
      state: initial,
      stages: {
        centres: { moves: [], nodesVisited: 0 },
        wings: { moves: [], nodesVisited: 0 },
        reduced3x3: { moves: [] }
      }
    };
  }

  let current = initial;
  const stages = {};

  try {
    const result = solve444CentresWithPatternDatabase(current, {
      maxDepth: centreMaxDepth,
      maxNodes: centreMaxNodes
    });
    current = replayAndCompare(current, result.moves, result.state, "Centre");
    if (!centresAreSolved(current)) {
      throw new Error("Centre solver did not solve all 24 centre stickers");
    }
    stages.centres = {
      moves: [...result.moves],
      nodesVisited: result.nodesVisited
    };
  } catch (error) {
    throw new RangeError(`4x4 centre stage failed: ${error.message}`, { cause: error });
  }

  try {
    const result = searchWingPairingBounded(current, {
      maxMacroDepth: wingMaxMacroDepth,
      maxNodes: wingMaxNodes,
      beamWidth: wingBeamWidth
    });
    current = replayAndCompare(current, result.moves, result.state, "Wing-pairing");
    if (!result.solved) {
      throw new RangeError(
        `bounded wing search exhausted its budget (paired edges: ${result.pairedEdges}, nodes: ${result.nodesVisited})`
      );
    }
    if (!centresAreSolved(current)) {
      throw new Error("Wing-pairing stage changed solved centre colours");
    }
    // Conversion is a second independent check that all wings are paired.
    toReduced3x3Facelets(current);
    stages.wings = {
      moves: [...result.moves],
      nodesVisited: result.nodesVisited,
      macroDepth: result.depth
    };
  } catch (error) {
    throw new RangeError(`4x4 wing-pairing stage failed: ${error.message}`, { cause: error });
  }

  try {
    const result = await solveReduced3x3(current);
    const moves = result.solution ? result.solution.split(/\s+/).filter(Boolean) : [];
    const solved = applyMoves(current, moves);
    if (!isSolved(solved)) {
      throw new Error("The final 3x3 solution failed 4x4 facelet replay");
    }
    stages.reduced3x3 = {
      moves,
      facelets: result.facelets,
      parity: {
        oll: result.analysis.ollParity,
        pll: result.analysis.pllParity
      }
    };

    const allMoves = [
      ...stages.centres.moves,
      ...stages.wings.moves,
      ...moves
    ];
    const finalState = applyMoves(initial, allMoves);
    if (!isSolved(finalState)) {
      throw new Error("Combined end-to-end solution failed replay verification");
    }

    return { solved: true, moves: allMoves, state: finalState, stages };
  } catch (error) {
    throw new RangeError(`4x4 reduced 3x3 stage failed: ${error.message}`, { cause: error });
  }
}
