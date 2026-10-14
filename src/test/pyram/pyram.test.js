
import test from "node:test";
import assert from "node:assert/strict";

import { generate, events } from "../../index.js";

import {
  identityState,
  isLegalState,
  applyAlgorithm
} from "../../puzzles/pyram/state.js";

import { randomLegalState } from "../../puzzles/pyram/random.js";

import {
  distanceToSolved,
  solveState
} from "../../puzzles/pyram/solver.js";

import {
  isEligibleState,
  sampleEligibleState
} from "../../puzzles/pyram/scramble.js";

function seededRandomWord(seed = 123456789) {
  let value = seed >>> 0;

  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value;
  };
}

function assertSameState(actual, expected) {
  assert.deepEqual(actual.ep, expected.ep);
  assert.deepEqual(actual.eo, expected.eo);
  assert.deepEqual(actual.tips, expected.tips);
}

test("advertises the Pyraminx event", () => {
  assert.deepEqual(events, ["333", "222", "pyram", "444"]);
});

test("identity state is legal and solved", () => {
  const state = identityState();

  assert.equal(isLegalState(state), true);
  assert.deepEqual(state.ep, [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(state.eo, Array(6).fill(0));
  assert.deepEqual(state.tips, Array(4).fill(0));
  assert.equal(distanceToSolved(state), 0);
});

test("generates legal Pyraminx states", () => {
  for (let i = 0; i < 100; i++) {
    const state = randomLegalState();

    assert.equal(isLegalState(state), true);
    assert.equal(new Set(state.ep).size, 6);
    assert.equal(state.ep.reduce((sum, value) => sum + value, 0) >= 0, true);
    assert.equal(state.eo.reduce((sum, value) => sum + value, 0) % 2, 0);

    assert.ok(state.tips.every(
      value => Number.isInteger(value) && value >= 0 && value < 3
    ));
  }
});

test("supports an injected deterministic random source", () => {
  const first = randomLegalState(seededRandomWord(12345));
  const second = randomLegalState(seededRandomWord(12345));

  assert.deepEqual(first, second);
});

test("rejects invalid Pyraminx states", () => {
  assert.equal(
    isLegalState({
      ep: [0, 1, 2],
      eo: [0, 0, 0],
      tips: [0, 0, 0, 0]
    }),
    false
  );

  const oddPermutation = identityState();
  [oddPermutation.ep[0], oddPermutation.ep[1]] =
    [oddPermutation.ep[1], oddPermutation.ep[0]];

  assert.equal(isLegalState(oddPermutation), false);

  const invalidOrientation = identityState();
  invalidOrientation.eo[0] = 2;

  assert.equal(isLegalState(invalidOrientation), false);

  const oddOrientationSum = identityState();
  oddOrientationSum.eo[0] = 1;

  assert.equal(isLegalState(oddOrientationSum), false);

  const invalidTips = identityState();
  invalidTips.tips[0] = 3;

  assert.equal(isLegalState(invalidTips), false);
});

test("each face turn has order three", () => {
  for (const face of ["U", "L", "R", "B"]) {
    const result = applyAlgorithm(
      identityState(),
      `${face} ${face} ${face}`
    );

    assertSameState(result, identityState());
  }
});

test("each face turn is undone by its inverse", () => {
  for (const face of ["U", "L", "R", "B"]) {
    const result = applyAlgorithm(
      identityState(),
      `${face} ${face}'`
    );

    assertSameState(result, identityState());
  }
});

test("tip moves affect only their corresponding tip", () => {
  const result = applyAlgorithm(identityState(), "u r'");

  assert.deepEqual(result.ep, identityState().ep);
  assert.deepEqual(result.eo, identityState().eo);
  assert.deepEqual(result.tips, [1, 0, 2, 0]);
});

test("solver solves sampled edge states", () => {
  const state = randomLegalState(seededRandomWord(1001));
  const solution = solveState(state);

  const solved = applyAlgorithm(state, solution);

  assert.deepEqual(solved.ep, [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(solved.eo, Array(6).fill(0));
});

test("sampler returns an eligible state", () => {
  const { state, distance } = sampleEligibleState(
    seededRandomWord(1002)
  );

  assert.equal(isLegalState(state), true);
  assert.equal(isEligibleState(state), true);
  assert.ok(distance >= 6);
  assert.ok(distanceToSolved(state) >= 6);
});

test("generated scrambles use valid Pyraminx notation", async () => {
  const result = await generate("pyram", {
    randomWord: seededRandomWord(1003)
  });

  assert.equal(result.event, "pyram");
  assert.ok(result.notation.length > 0);
  assert.deepEqual(result.moves, result.notation.split(/\s+/));

  for (const move of result.moves) {
    assert.match(move, /^[ULRBulrb]'?$/);
  }
});

test("generated scrambles replay to their sampled target", async () => {
  const result = await generate("pyram", {
    randomWord: seededRandomWord(1004)
  });

  const replayed = applyAlgorithm(identityState(), result.notation);

  assertSameState(replayed, result.state);
});

test("generated Pyraminx states meet the six-move floor", async () => {
  const result = await generate("pyram", {
    randomWord: seededRandomWord(1005)
  });

  assert.equal(isEligibleState(result.state), true);
  assert.ok(distanceToSolved(result.state) >= 6);
});

test("the same injected random source reproduces the same scramble", async () => {
  const first = await generate("pyram", {
    randomWord: seededRandomWord(987654)
  });

  const second = await generate("pyram", {
    randomWord: seededRandomWord(987654)
  });

  assert.equal(first.notation, second.notation);
  assert.deepEqual(first.moves, second.moves);
  assert.deepEqual(first.state, second.state);
});
