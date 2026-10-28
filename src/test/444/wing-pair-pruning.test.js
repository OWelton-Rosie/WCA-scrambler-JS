import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves } from "../../puzzles/444/moves.js";
import { solvedState } from "../../puzzles/444/state.js";
import { deriveCentreNeutralCommutators } from "../../puzzles/444/centre-neutral-macros.js";
import {
  buildWingPairPruningTable,
  encodeWingPairPosition,
  estimateWingPairingMacroDepth,
  getWingPairDistance,
  getWingPairSignatures
} from "../../puzzles/444/wing-pair-pruning.js";

test("each wing-pair pattern database includes its solved coordinate", () => {
  for (const signature of getWingPairSignatures()) {
    const result = buildWingPairPruningTable(signature);
    assert.ok(result.coordinateCount >= 1);
    assert.equal(getWingPairDistance(encodeWingPairPosition(solvedState(), signature), signature), 0);
    assert.equal(buildWingPairPruningTable(signature).cached, true);
  }
});

test("wing-pair distances are exact for one centre-neutral macro step", () => {
  const macro = deriveCentreNeutralCommutators().find(
    (candidate) => candidate.pairedEdges < 12
  );
  assert.ok(macro);

  const state = applyMoves(solvedState(), macro.moves);
  for (const signature of getWingPairSignatures()) {
    const position = encodeWingPairPosition(state, signature);
    assert.ok(getWingPairDistance(position, signature) <= 1, signature);
  }
  assert.ok(estimateWingPairingMacroDepth(state) <= 1);
});

test("wing-pair coordinates reject malformed inputs", () => {
  assert.throws(() => getWingPairDistance([0, 0], "UR"), /distinct/);
  assert.throws(() => getWingPairDistance([0, 24], "UR"), /indices/);
  assert.throws(() => getWingPairDistance([0, 1], "XX"), /Unknown/);
});

test("wing-pair pattern databases remain admissible across two-macro compositions", () => {
  const macros = deriveCentreNeutralCommutators().filter(
    (candidate) => candidate.pairedEdges < 12
  );
  assert.ok(macros.length >= 2);

  const first = macros[0];
  const second = macros.find(
    (candidate) => candidate.wingPermutationKey !== first.wingPermutationKey
  );
  assert.ok(second);

  const state = applyMoves(solvedState(), [...first.moves, ...second.moves]);
  for (const signature of getWingPairSignatures()) {
    const position = encodeWingPairPosition(state, signature);
    assert.ok(getWingPairDistance(position, signature) <= 2, signature);
  }
  assert.ok(estimateWingPairingMacroDepth(state) <= 2);
});
