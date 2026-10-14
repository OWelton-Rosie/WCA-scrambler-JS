import assert from "node:assert/strict";
import test from "node:test";

import Cube from "cubejs";

import { FACELETS, solvedState } from "../../puzzles/444/state.js";
import { applyMove } from "../../puzzles/444/moves.js";
import {
  solvedReduced3x3Facelets,
  toReduced3x3Facelets
} from "../../puzzles/444/reduced.js";

test("solved 4x4 converts to a solved 3x3 facelet string", () => {
  const expected =
    "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";

  assert.equal(toReduced3x3Facelets(solvedState()), expected);
  assert.equal(solvedReduced3x3Facelets(), expected);
});

test("converted solved state is accepted by cubejs", () => {
  const cube = Cube.fromString(toReduced3x3Facelets(solvedState()));

  assert.equal(cube.isSolved(), true);
});

test("rejects a state with unsolved centres", () => {
  const state = applyMove(solvedState(), "2R");

  assert.throws(
    () => toReduced3x3Facelets(state),
    /not reduced|centres are not solved/
  );
});

test("rejects a state with inconsistent wing pairing", () => {
  const state = solvedState();

  // Find two wing stickers on different faces and exchange their colours.
  // This preserves the total count of each colour but corrupts the
  // colour agreement required by the reduced edge projection.
  const wings = FACELETS
    .map((facelet, index) => ({ ...facelet, index }))
    .filter(({ position }) =>
      position.filter((coordinate) => Math.abs(coordinate) === 3).length === 2
    );

  let corrupted = false;

  for (let i = 0; i < wings.length && !corrupted; i++) {
    for (let j = i + 1; j < wings.length; j++) {
      if (wings[i].face === wings[j].face) continue;

      const candidate = [...state];
      [candidate[wings[i].index], candidate[wings[j].index]] =
        [candidate[wings[j].index], candidate[wings[i].index]];

      try {
        toReduced3x3Facelets(candidate);
      } catch (error) {
        if (/not reduced/.test(error.message)) {
          assert.throws(
            () => toReduced3x3Facelets(candidate),
            /not reduced/
          );
          corrupted = true;
          break;
        }
      }
    }
  }

  assert.equal(corrupted, true, "Expected to find a wing corruption rejected by the converter");
});
