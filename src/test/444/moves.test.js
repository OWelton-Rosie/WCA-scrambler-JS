import test from "node:test";
import assert from "node:assert/strict";

import {
  solvedState,
  isSolved,
  isValidState
} from "../../puzzles/444/state.js";

import {
  MOVE_NAMES,
  getMovePermutation,
  parseMove,
  applyMove,
  applyMoves,
  invertMoves
} from "../../puzzles/444/moves.js";

test("all advertised move names parse successfully", () => {
  for (const move of MOVE_NAMES) {
    assert.doesNotThrow(
      () => parseMove(move),
      `Failed to parse ${move}`
    );
  }
});

test("every move exposes a bijective facelet permutation matching applyMove", () => {
  const solved = solvedState();

  for (const move of MOVE_NAMES) {
    const permutation = getMovePermutation(move);

    assert.equal(permutation.length, solved.length, `${move} permutation length`);
    assert.equal(new Set(permutation).size, solved.length, `${move} permutation must be bijective`);

    const expected = Array(solved.length);
    for (let source = 0; source < permutation.length; source++) {
      expected[permutation[source]] = solved[source];
    }

    assert.deepEqual(applyMove(solved, move), expected, `${move} permutation mismatch`);
  }
});

test("every move preserves a valid 4x4 state", () => {
  const solved = solvedState();

  for (const move of MOVE_NAMES) {
    const result = applyMove(solved, move);

    assert.ok(isValidState(result), `${move} produced an invalid state`);
    assert.notStrictEqual(result, solved, "Moves must return a new array");
    assert.ok(isSolved(solved), "The input state must remain unchanged");
  }
});

test("every move followed by its inverse restores the state", () => {
  const solved = solvedState();

  for (const move of MOVE_NAMES) {
    const result = applyMoves(
      solved,
      [move, ...invertMoves([move])]
    );

    assert.ok(
      isSolved(result),
      `${move} followed by its inverse did not solve the cube`
    );
  }
});

test("four quarter-turns restore the solved state", () => {
  const solved = solvedState();

  for (const move of [
    "R", "L", "U", "D", "F", "B",
    "2R", "2L", "2U", "2D", "2F", "2B",
    "Rw", "Lw", "Uw", "Dw", "Fw", "Bw"
  ]) {
    assert.ok(
      isSolved(applyMoves(solved, [move, move, move, move])),
      `${move} repeated four times did not solve the cube`
    );
  }
});

test("half-turns are their own inverses", () => {
  const solved = solvedState();

  for (const move of MOVE_NAMES.filter((name) => name.endsWith("2"))) {
    assert.ok(
      isSolved(applyMoves(solved, [move, move])),
      `${move} repeated twice did not solve the cube`
    );
  }
});

test("a sequence followed by its inverse restores the state", () => {
  const solved = solvedState();

  const sequence = [
    "R", "Uw", "2F'", "L2", "B", "Rw'",
    "D", "2R2", "F'", "Uw2", "Lw"
  ];

  const scrambled = applyMoves(solved, sequence);

  assert.ok(isValidState(scrambled));
  assert.ok(!isSolved(scrambled));

  const restored = applyMoves(scrambled, invertMoves(sequence));

  assert.ok(isSolved(restored));
});

test("string and array move sequences produce identical states", () => {
  const solved = solvedState();
  const sequence = ["R", "Uw", "2F'", "L2", "B"];

  assert.deepEqual(
    applyMoves(solved, sequence),
    applyMoves(solved, sequence.join(" "))
  );
});

test("invalid move notation is rejected", () => {
  const solved = solvedState();

  for (const move of ["X", "Rw3", "3R", "", "R2'"]) {
    assert.throws(
      () => applyMove(solved, move),
      `Expected ${JSON.stringify(move)} to be rejected`
    );
  }
});
