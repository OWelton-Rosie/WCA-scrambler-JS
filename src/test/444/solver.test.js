import assert from "node:assert/strict";
import test from "node:test";

import { applyMoves } from "../../puzzles/444/moves.js";
import { solve444State } from "../../puzzles/444/solver.js";
import { isSolved, solvedState } from "../../puzzles/444/state.js";

test("solves a reduced 4x4 and verifies the full state", async () => {
  const state = applyMoves(
    solvedState(),
    "R U F L2 D' B"
  );

  const result = await solve444State(state);

  assert.equal(typeof result.solution, "string");
  assert.ok(result.solution.length > 0);
  assert.equal(isSolved(result.state), true);

  const replayed = applyMoves(state, result.solution);
  assert.equal(isSolved(replayed), true);
});

test("rejects an invalid 4x4 state", async () => {
  await assert.rejects(
    () => solve444State([]),
    /Invalid 4x4 facelet state/
  );
});