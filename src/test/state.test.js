
import test from "node:test";
import assert from "node:assert/strict";

import {
  identityState,
  isLegalState,
  permutationParity
} from "../puzzles/333/state.js";

test("identity state is legal", () => {
  assert.equal(isLegalState(identityState()), true);
});

test("permutation parity distinguishes odd and even permutations", () => {
  assert.equal(permutationParity([0, 1, 2, 3]), 0);
  assert.equal(permutationParity([1, 0, 2, 3]), 1);
  assert.equal(permutationParity([1, 2, 0, 3]), 0);
});

test("rejects corner twists that violate the orientation sum", () => {
  const state = identityState();
  state.co[0] = 1;

  assert.equal(isLegalState(state), false);
});

test("rejects edge flips that violate the orientation sum", () => {
  const state = identityState();
  state.eo[0] = 1;

  assert.equal(isLegalState(state), false);
});

test("rejects mismatched corner and edge permutation parity", () => {
  const state = identityState();
  [state.cp[0], state.cp[1]] = [state.cp[1], state.cp[0]];

  assert.equal(isLegalState(state), false);
});

test("rejects duplicate pieces", () => {
  const state = identityState();
  state.ep[0] = state.ep[1];

  assert.equal(isLegalState(state), false);
});
