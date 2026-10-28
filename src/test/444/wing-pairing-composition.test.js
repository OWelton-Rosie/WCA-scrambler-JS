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
  const solved = solvedState();
  const second = macros.find((macro) =>
    macro.wingPermutationKey !== first.wingPermutationKey &&
    JSON.stringify(applyMoves(solved, [...first.moves, ...macro.moves])) !== JSON.stringify(solved)
  );
  assert.ok(second);

  const sequence = [...first.moves, ...second.moves];
  const state = applyMoves(solvedState(), sequence);
  const restored = applyMoves(state, invertMoves(sequence));

  assert.notDeepEqual(state, solvedState());
  assert.deepEqual(restored, solvedState());
});

test("bounded search returns a replayable result for a two-macro composition", () => {
  const macros = deriveCentreNeutralCommutators().filter(
    (macro) => macro.pairedEdges < 12
  );
  assert.ok(macros.length >= 2);

  const first = macros[0];
  const solved = solvedState();
  const second = macros.find((macro) =>
    macro.wingPermutationKey !== first.wingPermutationKey &&
    JSON.stringify(applyMoves(solved, [...first.moves, ...macro.moves])) !== JSON.stringify(solved)
  );
  assert.ok(second);

  const state = applyMoves(solvedState(), [...first.moves, ...second.moves]);
  const result = searchWingPairingBounded(state, {
    maxMacroDepth: 2,
    maxNodes: 5000,
    beamWidth: 100
  });

  assert.equal(result.solved, false);
  assert.ok(result.nodesVisited <= 5000);
  assert.deepEqual(result.state, applyMoves(state, result.moves));
  assert.ok(result.depth >= 0 && result.depth <= 2);
  assert.ok(result.primitiveMoveCount === result.moves.length);
});
