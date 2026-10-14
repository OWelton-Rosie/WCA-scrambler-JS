
import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves } from "../puzzles/444/moves.js";
import { solvedState } from "../puzzles/444/state.js";
import {
  areCentresSolved,
  solveCentresBounded
} from "../puzzles/444/centre-solver.js";

test("solved state already has solved centres", () => {
  const state = solvedState();

  assert.equal(areCentresSolved(state), true);

  const result = solveCentresBounded(state);

  assert.deepEqual(result.moves, []);
  assert.deepEqual(result.state, state);
  assert.equal(result.depth, 0);
});

test("solves centres after an inner-slice turn", () => {
  const state = applyMoves(solvedState(), "2R");

  assert.equal(areCentresSolved(state), false);

  const result = solveCentresBounded(state, { maxDepth: 2 });

  assert.equal(areCentresSolved(result.state), true);
  assert.deepEqual(
    applyMoves(state, result.moves),
    result.state
  );
});

test("solves centres after two inner-slice turns", () => {
  const state = applyMoves(solvedState(), "2R 2U");

  assert.equal(areCentresSolved(state), false);

  const result = solveCentresBounded(state, { maxDepth: 3 });

  assert.equal(areCentresSolved(result.state), true);
  assert.deepEqual(
    applyMoves(state, result.moves),
    result.state
  );
});

test("rejects invalid search limits", () => {
  const state = solvedState();

  assert.throws(
    () => solveCentresBounded(state, { maxDepth: -1 }),
    RangeError
  );

  assert.throws(
    () => solveCentresBounded(state, { maxNodes: 0 }),
    RangeError
  );
});

test("reports when the search depth is insufficient", () => {
  const state = applyMoves(solvedState(), "2R");

  assert.throws(
    () => solveCentresBounded(state, { maxDepth: 0 }),
    /No centre solution found/
  );
});
