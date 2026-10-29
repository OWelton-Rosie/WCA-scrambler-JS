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
import { toReduced3x3Facelets } from "../../puzzles/444/reduced.js";

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
  assert.doesNotThrow(() => toReduced3x3Facelets(result.state));
});

test("bounded IDA reports exhaustion on a multi-macro state when its node limit is one", () => {
  const macros = deriveCentreNeutralCommutators().filter(
    (candidate) => candidate.pairedEdges < 12
  );
  let seed = 0x1b873593;
  const random = (limit) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed % limit;
  };

  let disrupted;
  for (let sample = 0; sample <= 5; sample++) {
    const macroCount = 2 + (sample % 2);
    const selected = Array.from({ length: macroCount }, () => macros[random(macros.length)]);
    if (sample === 5) {
      disrupted = applyMoves(solvedState(), selected.flatMap((macro) => macro.moves));
    }
  }
  assert.ok(disrupted);
  const result = searchWingPairingIdaBounded(disrupted, {
    maxMacroDepth: 3,
    maxNodes: 1
  });

  assert.equal(result.solved, false);
  assert.equal(result.budgetExhausted, true);
  assert.equal(result.nodesVisited, 1);
  assert.deepEqual(result.state, applyMoves(disrupted, result.moves));
});


test("IDA search replay-verifies a deterministic batch of multi-macro states", () => {
  const macros = deriveCentreNeutralCommutators().filter(
    (candidate) => candidate.pairedEdges < 12
  );
  assert.ok(macros.length >= 4);

  let seed = 0x1b873593;
  const random = (limit) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed % limit;
  };

  let solvedSamples = 0;
  for (let sample = 0; sample < 6; sample++) {
    const macroCount = 2 + (sample % 2);
    const selected = Array.from({ length: macroCount }, () => macros[random(macros.length)]);
    const scramble = selected.flatMap((macro) => macro.moves);
    const disrupted = applyMoves(solvedState(), scramble);

    const result = searchWingPairingIdaBounded(disrupted, {
      maxMacroDepth: macroCount,
      maxNodes: 150000
    });

    assert.deepEqual(result.state, applyMoves(disrupted, result.moves), `sample ${sample} replay`);
    if (result.solved) {
      solvedSamples++;
      assert.ok(result.depth <= macroCount, `sample ${sample}`);
      assert.doesNotThrow(() => toReduced3x3Facelets(result.state), `sample ${sample} reduced`);
    } else {
      assert.equal(result.budgetExhausted, true, `sample ${sample} should report budget exhaustion`);
    }
  }
  assert.ok(solvedSamples >= 4, `expected at least four solved samples; got ${solvedSamples}/6`);
});
