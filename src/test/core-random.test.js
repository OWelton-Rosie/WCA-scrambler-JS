import test from "node:test";
import assert from "node:assert/strict";

import {
  randomInt,
  shuffle,
  randomPermutation
} from "../core/random.js";

const UINT32_MAX = 0xFFFFFFFF;

test("randomInt returns values within the requested range", () => {
  for (const max of [1, 2, 3, 6, 12, 100]) {
    const value = randomInt(max);

    assert.ok(value >= 0);
    assert.ok(value < max);
    assert.ok(Number.isInteger(value));
  }
});

test("randomInt handles the lower and upper output boundaries", () => {
  assert.equal(randomInt(10, () => 0), 0);
  assert.equal(randomInt(10, () => 9), 9);
});

test("randomInt rejects out-of-range words and continues sampling", () => {
  const words = [UINT32_MAX, 8];
  let calls = 0;

  const result = randomInt(3, () => words[calls++]);

  assert.equal(result, 2);
  assert.equal(calls, 2);
});

test("randomInt rejects invalid random words", () => {
  for (const word of [-1, 0x100000000, 1.5, NaN, Infinity]) {
    assert.throws(
      () => randomInt(10, () => word),
      {
        name: "RangeError",
        message: /Random source must return a uint32/
      }
    );
  }
});

test("randomInt rejects invalid ranges", () => {
  for (const max of [0, -1, 1.5, NaN, Infinity, 0x100000001]) {
    assert.throws(
      () => randomInt(max, () => 0),
      { name: "RangeError" }
    );
  }
});

test("shuffle does not mutate the input array", () => {
  const input = [1, 2, 3, 4];
  const original = [...input];

  const result = shuffle(input, () => 0);

  assert.deepEqual(input, original);
  assert.notEqual(result, input);
  assert.deepEqual([...result].sort(), original);
});

test("shuffle produces the expected result for a deterministic source", () => {
  assert.deepEqual(
    shuffle([0, 1, 2, 3], () => 0),
    [1, 2, 3, 0]
  );
});

test("randomPermutation returns a permutation of the requested size", () => {
  const result = randomPermutation(8);

  assert.equal(result.length, 8);
  assert.deepEqual(
    [...result].sort((a, b) => a - b),
    [0, 1, 2, 3, 4, 5, 6, 7]
  );
});

test("randomPermutation rejects invalid sizes", () => {
  for (const size of [0, -1, 1.5, NaN, Infinity]) {
    assert.throws(
      () => randomPermutation(size, () => 0),
      { name: "RangeError" }
    );
  }
});