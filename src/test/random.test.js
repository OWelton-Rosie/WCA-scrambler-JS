import test from "node:test";
import assert from "node:assert/strict";

import { randomLegalState } from "../puzzles/333/random.js";
import { isLegalState } from "../puzzles/333/state.js";

test("generates legal 3x3 states", () => {
  for (let i = 0; i < 100; i++) {
    assert.equal(isLegalState(randomLegalState()), true);
  }
});

test("generates valid corner and edge permutations", () => {
  for (let i = 0; i < 100; i++) {
    const state = randomLegalState();

    assert.deepEqual(
      [...state.cp].sort((a, b) => a - b),
      [0, 1, 2, 3, 4, 5, 6, 7]
    );

    assert.deepEqual(
      [...state.ep].sort((a, b) => a - b),
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    );
  }
});

test("corner orientations sum to zero modulo three", () => {
  for (let i = 0; i < 100; i++) {
    const { co } = randomLegalState();

    assert.ok(co.every((value) => value >= 0 && value < 3));
    assert.equal(co.reduce((sum, value) => sum + value, 0) % 3, 0);
  }
});

test("edge orientations sum to zero modulo two", () => {
  for (let i = 0; i < 100; i++) {
    const { eo } = randomLegalState();

    assert.ok(eo.every((value) => value === 0 || value === 1));
    assert.equal(eo.reduce((sum, value) => sum + value, 0) % 2, 0);
  }
});

test("uses fixed centre positions", () => {
  assert.deepEqual(randomLegalState().center, [0, 1, 2, 3, 4, 5]);
});

test("supports a deterministic random source", () => {
  const randomWord = () => 0;

  assert.deepEqual(
    randomLegalState(randomWord),
    randomLegalState(randomWord)
  );
});


test("rejects a mismatched permutation-parity pair and resamples", () => {
  const identityCorners = [7, 6, 5, 4, 3, 2, 1];

  // This first edge permutation is odd: the first shuffle choice
  // swaps the final edge with edge zero; the remaining choices
  // preserve the order of the other edges.
  const oddEdges = [0, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const identityEdges = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const words = [
    ...identityCorners,
    ...oddEdges,
    ...identityCorners,
    ...identityEdges,
    ...Array(18).fill(0)
  ];

  let calls = 0;
  const randomWord = () => words[calls++];

  const state = randomLegalState(randomWord);

  // The first pair had different parity, so a second pair was sampled.
  assert.equal(calls, 54);
  assert.deepEqual(state.cp, [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(state.ep, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  assert.equal(isLegalState(state), true);
});
