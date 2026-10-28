import test from "node:test";
import assert from "node:assert/strict";

import { solvedState } from "../../puzzles/444/state.js";
import { applyMove, applyMoves, MOVE_NAMES } from "../../puzzles/444/moves.js";
import {
  CENTRE_AXIS_COORDINATE_SIZE,
  CENTRE_AXIS_COLOURS,
  CENTRE_AXIS_MOVES,
  applyCentreAxisMaskMove,
  centreAxisMaskPopulation,
  encodeCentreAxisMask,
  isCentreAxisMask,
  solvedCentreAxisMask
} from "../../puzzles/444/centre-axis-coordinate.js";

const AXES = Object.keys(CENTRE_AXIS_COLOURS);

test("each solved axis coordinate is an 8-of-24 mask", () => {
  assert.equal(CENTRE_AXIS_COORDINATE_SIZE, 735471);
  assert.equal(CENTRE_AXIS_MOVES.length, 36);

  for (const axis of AXES) {
    const mask = solvedCentreAxisMask(axis);
    assert.ok(isCentreAxisMask(mask));
    assert.equal(centreAxisMaskPopulation(mask), 8);
  }
});

test("centre-axis transitions exactly project every supported outer and wide move", () => {
  const solved = solvedState();
  const moves = MOVE_NAMES.filter((move) => !move.startsWith("2"));

  for (const move of moves) {
    const moved = applyMove(solved, move);

    for (const axis of AXES) {
      assert.equal(
        applyCentreAxisMaskMove(encodeCentreAxisMask(solved, axis), move),
        encodeCentreAxisMask(moved, axis),
        `${axis} coordinate disagrees after ${move}`
      );
    }
  }
});

test("centre-axis transitions commute with long legal move sequences", () => {
  let word = 0x7f4a7c15;
  const moves = [];

  for (let i = 0; i < 400; i++) {
    word = (Math.imul(word, 1664525) + 1013904223) >>> 0;
    moves.push(MOVE_NAMES.filter((move) => !move.startsWith("2"))[word % 36]);
  }

  const moved = applyMoves(solvedState(), moves);

  for (const axis of AXES) {
    let mask = solvedCentreAxisMask(axis);
    for (const move of moves) mask = applyCentreAxisMaskMove(mask, move);
    assert.equal(mask, encodeCentreAxisMask(moved, axis), `${axis} sequence projection`);
  }
});

test("centre-axis mask helpers reject invalid coordinates and moves", () => {
  assert.equal(isCentreAxisMask(0), false);
  assert.throws(() => applyCentreAxisMaskMove(0, "R"), RangeError);
  assert.throws(() => applyCentreAxisMaskMove(solvedCentreAxisMask("UD"), "2R"), RangeError);
  assert.throws(() => solvedCentreAxisMask("XX"), RangeError);
});
