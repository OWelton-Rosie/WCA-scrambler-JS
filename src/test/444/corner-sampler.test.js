import test from "node:test";
import assert from "node:assert/strict";

import {
  identityCornerState,
  isLegalCornerState
} from "../../puzzles/444/corners.js";
import { sample444CornerState } from "../../puzzles/444/corner-sampler.js";

function sequenceRandomWord(values) {
  let index = 0;
  return () => values[index++ % values.length];
}

test("samples a structurally legal corner coordinate", () => {
  for (let i = 0; i < 1000; i++) {
    const state = sample444CornerState();
    assert.equal(isLegalCornerState(state), true);
  }
});

test("corner sampler returns a permutation of all eight corners", () => {
  const state = sample444CornerState();

  assert.equal(state.cp.length, 8);
  assert.deepEqual([...state.cp].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7]);
});

test("corner orientations obey the twist-sum constraint", () => {
  for (let i = 0; i < 1000; i++) {
    const { co } = sample444CornerState();
    assert.equal(co.length, 8);
    assert.ok(co.every((orientation) => Number.isInteger(orientation) && orientation >= 0 && orientation < 3));
    assert.equal(co.reduce((sum, orientation) => sum + orientation, 0) % 3, 0);
  }
});

test("sampler can use an injected deterministic uint32 source", () => {
  const randomWord = sequenceRandomWord([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
  const first = sample444CornerState({ randomWord });
  const second = sample444CornerState({ randomWord: sequenceRandomWord([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]) });

  assert.deepEqual(first, second);
  assert.equal(isLegalCornerState(first), true);
});

test("corner coordinate sampler is not the identity-only state", () => {
  const state = sample444CornerState({ randomWord: () => 0 });
  assert.notDeepEqual(state, identityCornerState());
  assert.equal(isLegalCornerState(state), true);
});
