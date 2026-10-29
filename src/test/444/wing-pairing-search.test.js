import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves } from "../../puzzles/444/moves.js";
import { solvedState } from "../../puzzles/444/state.js";
import { toReduced3x3Facelets } from "../../puzzles/444/reduced.js";
import { deriveCentreNeutralCommutators } from "../../puzzles/444/centre-neutral-macros.js";
import { findWingPairingImprovement } from "../../puzzles/444/wing-pairing-search.js";
import { countPairedEdges } from "../../puzzles/444/wing-pairing.js";

test("one-step macro search can undo a known centre-neutral wing disruption", () => {
  const macro = deriveCentreNeutralCommutators().find(
    (candidate) => candidate.pairedEdges < 12
  );
  assert.ok(macro, "expected a centre-neutral macro that disrupts wing pairing");

  const disrupted = applyMoves(solvedState(), macro.moves);
  assert.ok(countPairedEdges(disrupted) < 12);

  const result = findWingPairingImprovement(disrupted);
  assert.ok(result);
  assert.equal(result.fullyReduced, true);
  assert.equal(result.pairedEdges, 12);
  assert.equal(toReduced3x3Facelets(result.state).length, 54);
  assert.ok(result.moves.length > 0);
});

test("wing-pairing improvement rejects states with unsolved centres", () => {
  const state = applyMoves(solvedState(), "Rw");
  assert.throws(
    () => findWingPairingImprovement(state),
    /requires solved centre colours/
  );
});
