
import test from "node:test";
import assert from "node:assert/strict";

import { randomInt, shuffle } from "../core/random.js";
import { randomLegalState } from "../puzzles/333/random.js";
import { isLegalState } from "../puzzles/333/state.js";

test("randomInt returns values inside the requested range", () => {
  assert.equal(randomInt(1, () => 0), 0);
  assert.equal(randomInt(10, () => 9), 9);
  assert.equal(randomInt(10, () => 10), 0);
});

test("randomInt rejects invalid ranges", () => {
  for (const value of [0, -1, 1.5, NaN, Infinity]) {
    assert.throws(() => randomInt(value), RangeError);
  }
});

test("randomInt rejects invalid random-source values", () => {
  assert.throws(() => randomInt(10, () => -1), RangeError);
  assert.throws(() => randomInt(10, () => 0x100000000), RangeError);
});

test("randomInt rejects the biased tail of the uint32 range", () => {
  const range = 0x100000000;
  const limit = Math.floor(range / 10) * 10;

  const values = [limit, 9];
  const result = randomInt(10, () => values.shift());

  assert.equal(result, 9);
});

test("shuffle returns a permutation of its input", () => {
  const input = [1, 2, 3, 4, 5];
  const result = shuffle(input);

  assert.deepEqual([...result].sort(), input);
  assert.deepEqual(input, [1, 2, 3, 4, 5]);
});

test("random legal states satisfy all cube invariants", () => {
  for (let i = 0; i < 200; i++) {
    assert.equal(isLegalState(randomLegalState()), true);
  }
});
