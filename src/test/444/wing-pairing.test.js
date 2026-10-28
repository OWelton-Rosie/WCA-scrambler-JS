import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves } from "../../puzzles/444/moves.js";
import { solvedState } from "../../puzzles/444/state.js";
import { areWingsPaired, countPairedEdges } from "../../puzzles/444/wing-pairing.js";

test("solved state has all twelve wing pairs paired", () => {
  assert.equal(countPairedEdges(solvedState()), 12);
  assert.equal(areWingsPaired(solvedState()), true);
});

test("outer turns preserve wing pairing", () => {
  const state = applyMoves(solvedState(), "R U F L2 D' B");
  assert.equal(countPairedEdges(state), 12);
  assert.equal(areWingsPaired(state), true);
});

test("a wide turn exposes the wing pairing diagnostic", () => {
  const state = applyMoves(solvedState(), "Rw");
  const pairedEdges = countPairedEdges(state);

  assert.ok(Number.isInteger(pairedEdges));
  assert.ok(pairedEdges >= 0 && pairedEdges <= 12);
});
