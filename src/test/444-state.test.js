
import test from "node:test";
import assert from "node:assert/strict";

import {
  FACELET_COUNT,
  FACELETS,
  solvedState,
  isValidState,
  isSolved
} from "../puzzles/444/state.js";

import {
  parseMove,
  applyMove,
  applyMoves,
  invertMoves
} from "../puzzles/444/moves.js";

test("the solved state has 96 facelets and 16 stickers per colour", () => {
  const state = solvedState();

  assert.equal(FACELET_COUNT, 96);
  assert.equal(FACELETS.length, 96);
  assert.equal(state.length, 96);
  assert.equal(isValidState(state), true);
  assert.equal(isSolved(state), true);

  for (const face of ["U", "R", "F", "D", "L", "B"]) {
    assert.equal(state.filter((colour) => colour === face).length, 16);
  }
});

test("facelet identities are unique", () => {
  assert.equal(
    new Set(FACELETS.map((facelet) => facelet.key)).size,
    96
  );
});

test("each supported move preserves a valid colour state", () => {
  const moves = [
    "R", "R'", "R2",
    "L", "L'", "L2",
    "U", "U'", "U2",
    "D", "D'", "D2",
    "F", "F'", "F2",
    "B", "B'", "B2",
    "Rw", "Lw", "Uw", "Dw", "Fw", "Bw",
    "r", "l", "u", "d", "f", "b",
    "2R", "2L", "2U", "2D", "2F", "2B"
  ];

  for (const move of moves) {
    const state = applyMove(solvedState(), move);

    assert.equal(isValidState(state), true, move);
    assert.equal(isSolved(state), false, move);
  }
});

test("every face turn followed by its inverse restores the state", () => {
  const moves = [
    "R", "L", "U", "D", "F", "B",
    "Rw", "Lw", "Uw", "Dw", "Fw", "Bw",
    "2R", "2L", "2U", "2D", "2F", "2B"
  ];

  for (const move of moves) {
    const inverse = invertMoves([move]);
    const result = applyMoves(
      applyMove(solvedState(), move),
      inverse
    );

    assert.deepEqual(result, solvedState(), move);
  }
});

test("half turns are their own inverses", () => {
  for (const move of ["R2", "Rw2", "2R2", "U2", "F2"]) {
    assert.deepEqual(
      applyMoves(applyMove(solvedState(), move), invertMoves([move])),
      solvedState(),
      move
    );
  }
});

test("move sequences can be inverted", () => {
  const sequence = ["R", "U'", "2F", "Rw2", "B"];

  const result = applyMoves(
    applyMoves(solvedState(), sequence),
    invertMoves(sequence)
  );

  assert.deepEqual(result, solvedState());
});

test("move application does not mutate its input", () => {
  const state = solvedState();
  const original = [...state];

  applyMove(state, "R");

  assert.deepEqual(state, original);
});

test("invalid moves and invalid states are rejected", () => {
  assert.throws(() => parseMove("X"), RangeError);
  assert.throws(() => parseMove("Rw3"), RangeError);
  assert.throws(() => applyMove([], "R"), TypeError);

  const invalid = solvedState();
  invalid[0] = "X";

  assert.equal(isValidState(invalid), false);
  assert.throws(() => applyMove(invalid, "R"), TypeError);
});
