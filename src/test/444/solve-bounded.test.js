import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves } from "../../puzzles/444/moves.js";
import { isSolved, solvedState } from "../../puzzles/444/state.js";
import { solve444Bounded } from "../../puzzles/444/solve-bounded.js";

test("bounded end-to-end pipeline solves reduced legal scrambles and verifies full replay", async () => {
  const scrambles = [
    ["R"],
    ["R", "U", "F2"],
    ["L'", "D", "B", "R2"],
    ["R", "U", "R'", "U'", "F2", "D"]
  ];

  for (const scramble of scrambles) {
    const start = applyMoves(solvedState(), scramble);
    const result = await solve444Bounded(start);

    assert.equal(result.solved, true, scramble.join(" "));
    assert.ok(isSolved(result.state), scramble.join(" "));
    assert.deepEqual(applyMoves(start, result.moves), solvedState(), scramble.join(" "));
    assert.deepEqual(applyMoves(solvedState(), [...scramble, ...result.moves]), solvedState());
    assert.equal(result.stages.reduced3x3.parity.oll, false);
    assert.equal(result.stages.reduced3x3.parity.pll, false);
  }
});

test("bounded pipeline reports centre-search exhaustion as a stage-specific failure", async () => {
  const state = applyMoves(solvedState(), ["Rw"]);

  await assert.rejects(
    solve444Bounded(state, {
      centreMaxDepth: 0,
      centreMaxNodes: 100,
      wingMaxMacroDepth: 0,
      wingMaxNodes: 1,
      wingBeamWidth: 1
    }),
    (error) => {
      assert.equal(error instanceof RangeError, true);
      assert.match(error.message, /centre stage failed/i);
      return true;
    }
  );
});

test("solved input returns an empty verified solution without initialising the 3x3 solver", async () => {
  const result = await solve444Bounded(solvedState());
  assert.equal(result.solved, true);
  assert.deepEqual(result.moves, []);
  assert.deepEqual(result.state, solvedState());
  assert.equal(isSolved(result.state), true);
});
