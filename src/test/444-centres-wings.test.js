
import test from "node:test";
import assert from "node:assert/strict";

import { solvedState } from "../puzzles/444/state.js";
import { applyMoves } from "../puzzles/444/moves.js";

import {
  CENTRE_SLOTS,
  extractCentreState,
  centreColourCounts,
  hasValidCentreColourCounts
} from "../puzzles/444/centres.js";

import {
  WING_SLOTS,
  extractWingState,
  wingPairCounts,
  hasValidWingPairCounts
} from "../puzzles/444/wings.js";

const SEQUENCES = [
  "R U F' L2 D B",
  "Rw U 2F R' Uw2 D Lw' B2",
  "2R 2U' 2F2 2L 2D' 2B2",
  "R U2 F' L D Rw U' 2F B2"
];

test("the cube has 24 centre slots and 24 wing slots", () => {
  assert.equal(CENTRE_SLOTS.length, 24);
  assert.equal(WING_SLOTS.length, 24);
});

test("every centre slot identifies exactly one facelet", () => {
  const indices = CENTRE_SLOTS.map((slot) => slot.faceletIndex);

  assert.equal(new Set(indices).size, 24);

  for (const slot of CENTRE_SLOTS) {
    assert.equal(slot.position.length, 3);
    assert.ok(Number.isInteger(slot.faceletIndex));
  }
});

test("every wing slot identifies exactly two facelets", () => {
  const indices = WING_SLOTS.flatMap(
    (slot) => slot.faceletIndices
  );

  assert.equal(indices.length, 48);
  assert.equal(new Set(indices).size, 48);

  for (const slot of WING_SLOTS) {
    assert.equal(slot.position.length, 3);
    assert.equal(slot.faceletIndices.length, 2);
  }
});

test("solved centres have four stickers of each colour", () => {
  const state = solvedState();

  assert.deepEqual(centreColourCounts(state), {
    U: 4,
    R: 4,
    F: 4,
    D: 4,
    L: 4,
    B: 4
  });

  assert.equal(extractCentreState(state).length, 24);
  assert.equal(hasValidCentreColourCounts(state), true);
});

test("solved wings contain 12 edge pairs, twice each", () => {
  const state = solvedState();
  const counts = wingPairCounts(state);

  assert.equal(extractWingState(state).length, 24);
  assert.equal(counts.size, 12);

  for (const count of counts.values()) {
    assert.equal(count, 2);
  }

  assert.equal(hasValidWingPairCounts(state), true);
});

test("centre and wing checks survive legal move sequences", () => {
  for (const sequence of SEQUENCES) {
    const state = applyMoves(solvedState(), sequence);

    assert.equal(
      hasValidCentreColourCounts(state),
      true,
      `centre counts failed for: ${sequence}`
    );

    assert.equal(
      hasValidWingPairCounts(state),
      true,
      `wing pair counts failed for: ${sequence}`
    );
  }
});

test("wing extraction preserves the ordered sticker observations", () => {
  const wings = extractWingState(
    applyMoves(solvedState(), "Rw U 2F R'")
  );

  for (const wing of wings) {
    assert.equal(wing.stickers.length, 2);
    assert.equal(wing.edgeColours.length, 2);
    assert.equal(
      wing.signature,
      [...wing.edgeColours].join("")
    );

    for (const sticker of wing.stickers) {
      assert.ok(["U", "R", "F", "D", "L", "B"].includes(sticker.face));
      assert.ok(["U", "R", "F", "D", "L", "B"].includes(sticker.colour));
    }
  }
});

test("the extractors reject invalid facelet states", () => {
  const invalid = solvedState();
  invalid[0] = "X";

  assert.throws(() => extractCentreState(invalid));
  assert.throws(() => extractWingState(invalid));
});
