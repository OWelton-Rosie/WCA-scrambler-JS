import test from "node:test";
import assert from "node:assert/strict";

import { randomLegalState } from "../../puzzles/333/random.js";
import { isLegalState } from "../../puzzles/333/state.js";

test("generates a legal state", () => {
  const state = randomLegalState();

  assert.equal(isLegalState(state), true);
});

test("supports an injected deterministic random source", () => {
  const randomWord = () => 0;
  const first = randomLegalState(randomWord);
  const second = randomLegalState(randomWord);

  assert.deepEqual(first, second);
});

test("generates valid corner and edge orientations", () => {
  for (let i = 0; i < 100; i++) {
    const state = randomLegalState();

    assert.equal(
      state.co.reduce((sum, value) => sum + value, 0) % 3,
      0
    );

    assert.equal(
      state.eo.reduce((sum, value) => sum + value, 0) % 2,
      0
    );
  }
});

test("generates matching corner and edge permutation parity", () => {
  for (let i = 0; i < 100; i++) {
    const state = randomLegalState();

    assert.equal(isLegalState(state), true);
  }
});