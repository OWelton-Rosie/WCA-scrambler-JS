import test from "node:test";
import assert from "node:assert/strict";

import { solvedState } from "../../puzzles/444/state.js";
import { applyMoves } from "../../puzzles/444/moves.js";
import {
  CENTRE_COLOUR_COORDINATE_SIZE,
  CENTRE_COLOUR_NAMES,
  encodeCentreColourMask,
  rankCentreColourMask,
  solvedCentreColourMask
} from "../../puzzles/444/centre-colour-coordinate.js";
import { buildCentreColourPruningTable, getCentreColourDistance } from "../../puzzles/444/centre-colour-pruning.js";
import { solve444CentresWithPatternDatabase } from "../../puzzles/444/centre-colour-solver.js";

function combinations(n, k, start = 0, chosen = [], result = []) {
  if (chosen.length === k) {
    result.push(chosen.reduce((mask, bit) => mask | (1 << bit), 0));
    return result;
  }
  for (let bit = start; bit <= n - (k - chosen.length); bit++) {
    chosen.push(bit);
    combinations(n, k, bit + 1, chosen, result);
    chosen.pop();
  }
  return result;
}

test("4-of-24 centre-colour ranking is a bijection", () => {
  const masks = combinations(24, 4);
  assert.equal(masks.length, CENTRE_COLOUR_COORDINATE_SIZE);
  const ranks = new Set(masks.map(rankCentreColourMask));
  assert.equal(ranks.size, CENTRE_COLOUR_COORDINATE_SIZE);
  assert.equal(Math.min(...ranks), 0);
  assert.equal(Math.max(...ranks), CENTRE_COLOUR_COORDINATE_SIZE - 1);
});

test("each exact centre-colour pattern database covers its full coordinate", () => {
  for (const colour of CENTRE_COLOUR_NAMES) {
    const result = buildCentreColourPruningTable(colour);
    assert.equal(result.coordinateCount, CENTRE_COLOUR_COORDINATE_SIZE);
    assert.equal(getCentreColourDistance(solvedCentreColourMask(colour), colour), 0);
    assert.equal(buildCentreColourPruningTable(colour).cached, true);
  }
});

test("centre-colour pattern distances are admissible for legal wide-turn sequences", () => {
  const cases = [
    ["Rw", 1],
    ["Rw Uw' Fw2", 3],
    ["Rw Uw' Fw2 Lw D Uw2", 6]
  ];

  for (const [sequence, upperBound] of cases) {
    const state = applyMoves(solvedState(), sequence);
    for (const colour of CENTRE_COLOUR_NAMES) {
      const mask = encodeCentreColourMask(state, colour);
      assert.ok(
        getCentreColourDistance(mask, colour) <= upperBound,
        `${colour} distance exceeded sequence length for ${sequence}`
      );
    }
  }
});

test("full-centre IDA* solves a short wide-turn scramble", () => {
  const scramble = ["Rw", "Uw'", "Fw2"];
  const state = applyMoves(solvedState(), scramble);
  const result = solve444CentresWithPatternDatabase(state, {
    maxDepth: 3,
    maxNodes: 100000
  });

  assert.ok(result.depth <= 3);
  assert.ok(result.nodesVisited > 0);
  for (const colour of CENTRE_COLOUR_NAMES) {
    assert.equal(
      encodeCentreColourMask(result.state, colour),
      solvedCentreColourMask(colour),
      `${colour} centres were not solved`
    );
  }
});
