import test from "node:test";
import assert from "node:assert/strict";

import { solvedState } from "../../puzzles/444/state.js";
import { applyMoves } from "../../puzzles/444/moves.js";
import { encodeCentreAxisMask, solvedCentreAxisMask } from "../../puzzles/444/centre-axis-coordinate.js";
import { buildCentreAxisPruningTable, getCentreAxisDistance } from "../../puzzles/444/centre-axis-pruning.js";
import { solve444CentresToAxisPairs } from "../../puzzles/444/centre-axis-solver.js";

test("UD centre-axis BFS reaches the entire 8-of-24 coordinate space", () => {
  const result = buildCentreAxisPruningTable("UD");
  assert.equal(result.coordinateCount, 735471);
  assert.equal(result.maxDistance, 8);
  assert.equal(getCentreAxisDistance(solvedCentreAxisMask("UD"), "UD"), 0);
  assert.equal(buildCentreAxisPruningTable("UD").cached, true);
});

test("centre-axis exact distances are admissible on legal outer/wide move sequences", () => {
  const cases = [
    ["R", 1],
    ["Rw U F2", 3],
    ["Rw U' Fw R2", 4]
  ];

  for (const [sequence, upperBound] of cases) {
    const moves = sequence.split(" ");
    const state = applyMoves(solvedState(), moves);
    const mask = encodeCentreAxisMask(state, "UD");
    assert.ok(getCentreAxisDistance(mask, "UD") <= upperBound, sequence);
  }
});


test("centre axis-pair solver reduces a short wide-turn scramble", () => {
  const scramble = ["Rw", "Uw'", "Fw2"];
  const state = applyMoves(solvedState(), scramble);
  const result = solve444CentresToAxisPairs(state, {
    maxDepth: 6,
    maxNodes: 200000
  });

  assert.ok(result.depth <= 3);
  assert.ok(result.nodesVisited > 0);
  for (const axis of ["UD", "FB", "LR"]) {
    assert.equal(
      encodeCentreAxisMask(result.state, axis),
      solvedCentreAxisMask(axis),
      `${axis} centres did not reach their correct axis pair`
    );
  }
});
