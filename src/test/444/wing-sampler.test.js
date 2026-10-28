import test from "node:test";
import assert from "node:assert/strict";

import { sample444WingPermutation } from "../../puzzles/444/wing-sampler.js";

test("samples a permutation of all 24 labelled wings", () => {
  for (let i = 0; i < 1000; i++) {
    const permutation = sample444WingPermutation();
    assert.equal(permutation.length, 24);
    assert.deepEqual(
      [...permutation].sort((a, b) => a - b),
      Array.from({ length: 24 }, (_, index) => index)
    );
  }
});

test("wing permutation sampling is reproducible with an injected source", () => {
  const makeSource = () => {
    let word = 0;
    return () => word++ >>> 0;
  };

  assert.deepEqual(
    sample444WingPermutation({ randomWord: makeSource() }),
    sample444WingPermutation({ randomWord: makeSource() })
  );
});

test("rejects malformed random words", () => {
  assert.throws(
    () => sample444WingPermutation({ randomWord: () => 0x100000000 }),
    RangeError
  );
});
