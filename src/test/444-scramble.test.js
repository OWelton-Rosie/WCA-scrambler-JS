import assert from "node:assert/strict";
import test from "node:test";

import { generate444RandomWalkScramble } from "../puzzles/444/scramble.js";
import { applyMoves } from "../puzzles/444/moves.js";
import { isSolved, solvedState } from "../puzzles/444/state.js";

test("generates a 40-move 4x4 random walk by default", () => {
  const result = generate444RandomWalkScramble();

  assert.equal(result.method, "random-walk");
  assert.equal(result.moves.length, 40);
  assert.equal(result.scramble, result.moves.join(" "));
  assert.equal(result.state.length, 96);
  assert.equal(isSolved(result.state), false);
});

test("generated moves reproduce the returned state", () => {
  const result = generate444RandomWalkScramble({ length: 25 });

  assert.deepEqual(
    result.state,
    applyMoves(solvedState(), result.moves)
  );
});

test("supports a custom scramble length", () => {
  const result = generate444RandomWalkScramble({ length: 12 });

  assert.equal(result.moves.length, 12);
});

test("rejects invalid scramble lengths", () => {
  for (const length of [0, -1, 1.5, NaN]) {
    assert.throws(
      () => generate444RandomWalkScramble({ length }),
      RangeError
    );
  }
});