
import test from "node:test";
import assert from "node:assert/strict";

import { solvedState } from "../puzzles/444/state.js";
import { applyMoves } from "../puzzles/444/moves.js";

import {
  extractCornerState,
  identityCornerState,
  isLegalCornerState,
  assertLegalCornerState,
  cornerPermutationParity
} from "../puzzles/444/corners.js";

test("identity corner state is legal and solved", () => {
  const corners = extractCornerState(solvedState());

  assert.deepEqual(corners, identityCornerState());
  assert.equal(isLegalCornerState(corners), true);
  assert.equal(cornerPermutationParity(corners), 0);
});

test("extracts a legal corner state after outer turns", () => {
  const state = applyMoves(
    solvedState(),
    "R U F' L2 D B R' U2"
  );

  const corners = extractCornerState(state);

  assert.equal(isLegalCornerState(corners), true);
  assert.equal(new Set(corners.cp).size, 8);
  assert.ok(corners.co.every((orientation) =>
    orientation >= 0 && orientation <= 2
  ));
});

test("corner twists sum to zero modulo three after legal moves", () => {
  const sequences = [
    "R",
    "U",
    "F",
    "L",
    "D",
    "B",
    "R U R' U'",
    "F R U R' U' F'",
    "R U2 F' L2 D B R' U2",
    "Rw U 2F R' Uw2 D Lw' B2"
  ];

  for (const sequence of sequences) {
    const state = applyMoves(solvedState(), sequence);
    const corners = extractCornerState(state);

    assert.equal(
      corners.co.reduce((sum, value) => sum + value, 0) % 3,
      0,
      sequence
    );
  }
});

test("corner permutation parity is zero for solved state", () => {
  assert.equal(
    cornerPermutationParity(identityCornerState()),
    0
  );
});

test("corner permutation parity detects a single swap", () => {
  const corners = identityCornerState();
  [corners.cp[0], corners.cp[1]] = [corners.cp[1], corners.cp[0]];

  // The corner state remains structurally legal: corner parity alone
  // is not a complete 4x4 reachability test.
  assert.equal(isLegalCornerState(corners), true);
  assert.equal(cornerPermutationParity(corners), 1);
});

test("rejects duplicate corner identities", () => {
  const corners = identityCornerState();
  corners.cp[0] = corners.cp[1];

  assert.equal(isLegalCornerState(corners), false);
  assert.throws(() => assertLegalCornerState(corners));
});

test("rejects invalid corner orientations", () => {
  const corners = identityCornerState();
  corners.co[0] = 3;

  assert.equal(isLegalCornerState(corners), false);
});

test("rejects a corner twist sum that is not divisible by three", () => {
  const corners = identityCornerState();
  corners.co[0] = 1;

  assert.equal(isLegalCornerState(corners), false);
});

test("rejects malformed corner states", () => {
  assert.equal(isLegalCornerState(null), false);
  assert.equal(isLegalCornerState({}), false);
  assert.equal(
    isLegalCornerState({ cp: [0, 1], co: [0, 0] }),
    false
  );
});
