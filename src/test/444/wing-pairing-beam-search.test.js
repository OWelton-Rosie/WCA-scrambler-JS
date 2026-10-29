import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves } from "../../puzzles/444/moves.js";
import { solvedState } from "../../puzzles/444/state.js";
import { deriveCentreNeutralCommutators } from "../../puzzles/444/centre-neutral-macros.js";
import {
  searchWingPairingBounded,
  searchWingPairingIdaBounded
} from "../../puzzles/444/wing-pairing-beam-search.js";
import { countPairedEdges } from "../../puzzles/444/wing-pairing.js";

test("bounded beam search returns immediately for a fully reduced state", () => {
  const result = searchWingPairingBounded(solvedState());
  assert.equal(result.solved, true);
  assert.equal(result.depth, 0);
  assert.equal(result.primitiveMoveCount, 0);
  assert.equal(result.pairedEdges, 12);
  assert.equal(result.nodesVisited, 0);
});

test("bounded beam search can reverse a known wing-pairing disruption", () => {
  const macro = deriveCentreNeutralCommutators().find(
    (candidate) => candidate.pairedEdges < 12
  );
  assert.ok(macro);

  const disrupted = applyMoves(solvedState(), macro.moves);
  assert.ok(countPairedEdges(disrupted) < 12);

  const result = searchWingPairingBounded(disrupted, {
    maxMacroDepth: 1,
    maxNodes: 20000,
    beamWidth: 100
  });

  assert.equal(result.solved, true);
  assert.equal(result.depth, 1);
  assert.equal(result.primitiveMoveCount, result.moves.length);
  assert.equal(result.pairedEdges, 12);
});

test("bounded beam search reports exhaustion rather than claiming unsolvability", () => {
  const macro = deriveCentreNeutralCommutators().find(
    (candidate) => candidate.pairedEdges < 12
  );
  const disrupted = applyMoves(solvedState(), macro.moves);
  const result = searchWingPairingBounded(disrupted, {
    maxMacroDepth: 0,
    maxNodes: 100,
    beamWidth: 10
  });

  assert.equal(result.solved, false);
  assert.equal(result.depth, 0);
  assert.equal(result.primitiveMoveCount, 0);
  assert.equal(result.nodesVisited, 0);
});

test("bounded beam search rejects states with unsolved centres", () => {
  assert.throws(
    () => searchWingPairingBounded(applyMoves(solvedState(), "Rw")),
    /requires solved centre colours/
  );
});


test("bounded IDA search reverses a disrupted wing state without beam pruning", () => {
  const macro = deriveCentreNeutralCommutators().find(
    (candidate) => candidate.pairedEdges < 12
  );
  assert.ok(macro);
  const disrupted = applyMoves(solvedState(), macro.moves);

  const result = searchWingPairingIdaBounded(disrupted, {
    maxMacroDepth: 1,
    maxNodes: 50000
  });

  assert.equal(result.solved, true);
  assert.equal(result.strategy, "ida");
  assert.equal(result.depth, 1);
  assert.equal(result.pairedEdges, 12);
  assert.deepEqual(result.state, applyMoves(disrupted, result.moves));
});

test("bounded IDA search solves composed-macro states with replay verification", () => {
  const macros = deriveCentreNeutralCommutators().filter(
    (candidate) => candidate.pairedEdges < 12
  );
  assert.ok(macros.length >= 2);

  const first = macros[0];
  const second = macros.find((candidate) =>
    candidate.wingPermutationKey !== first.wingPermutationKey
  );
  assert.ok(second);

  const scramble = [...first.moves, ...second.moves];
  const disrupted = applyMoves(solvedState(), scramble);
  const result = searchWingPairingIdaBounded(disrupted, {
    maxMacroDepth: 2,
    maxNodes: 100000
  });

  assert.equal(result.solved, true, scramble.join(" "));
  assert.ok(result.depth <= 2);
  assert.ok(result.depth >= 1);
  assert.equal(result.pairedEdges, 12);
  assert.deepEqual(result.state, applyMoves(disrupted, result.moves));
  assert.deepEqual(applyMoves(solvedState(), [...scramble, ...result.moves]), solvedState());
});

test("bounded IDA search reports budget exhaustion without claiming unsolvability", () => {
  const macro = deriveCentreNeutralCommutators().find(
    (candidate) => candidate.pairedEdges < 12
  );
  const disrupted = applyMoves(solvedState(), macro.moves);
  const result = searchWingPairingIdaBounded(disrupted, {
    maxMacroDepth: 3,
    maxNodes: 1
  });

  assert.equal(result.solved, false);
  assert.equal(result.budgetExhausted, true);
  assert.equal(result.nodesVisited, 1);
});
