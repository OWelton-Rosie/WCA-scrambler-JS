import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves, invertMoves } from "../../puzzles/444/moves.js";
import { solvedState } from "../../puzzles/444/state.js";
import { deriveCentreNeutralCommutators } from "../../puzzles/444/centre-neutral-macros.js";
import { searchWingPairingBounded } from "../../puzzles/444/wing-pairing-beam-search.js";
import { countPairedEdges } from "../../puzzles/444/wing-pairing.js";

test("two-macro compositions preserve centres and are reversible in the facelet model", () => {
  const macros = deriveCentreNeutralCommutators().filter(
    (macro) => macro.pairedEdges < 12
  );
  assert.ok(macros.length >= 2);

  const first = macros[0];
  const second = macros.find(
    (macro) => macro.wingPermutationKey !== first.wingPermutationKey
  );
  assert.ok(second);

  const sequence = [...first.moves, ...second.moves];
  const state = applyMoves(solvedState(), sequence);
  const restored = applyMoves(state, invertMoves(sequence));

  assert.equal(countPairedEdges(state) <= 12, true);
  assert.deepEqual(restored, solvedState());
});

test("bounded search solves a state produced by two distinct centre-neutral macros when budget permits", () => {
  const macros = deriveCentreNeutralCommutators().filter(
    (macro) => macro.pairedEdges < 12
  );
  assert.ok(macros.length >= 2);

  const first = macros[0];
  const second = macros.find(
    (macro) => macro.wingPermutationKey !== first.wingPermutationKey
  );
  assert.ok(second);

  const state = applyMoves(solvedState(), [...first.moves, ...second.moves]);
  const result = searchWingPairingBounded(state, {
    maxMacroDepth: 3,
    maxNodes: 100000,
    beamWidth: 1000
  });

  assert.equal(result.solved, true, JSON.stringify({
    depth: result.depth,
    pairedEdges: result.pairedEdges,
    estimatedMacroDepth: result.estimatedMacroDepth,
    nodesVisited: result.nodesVisited
  }));
  assert.equal(result.pairedEdges, 12);
  assert.deepEqual(result.state, applyMoves(state, result.moves));
});
