
import test from "node:test";
import assert from "node:assert/strict";

import {
  solvedState,
  isSolved
} from "../../puzzles/444/state.js";

import {
  applyMoves
} from "../../puzzles/444/moves.js";

import {
  PIECE_LOCATIONS,
  extractPieces,
  extractCorners,
  extractCentres,
  extractWings,
  pieceCounts,
  hasExpectedPieceCounts
} from "../../puzzles/444/pieces.js";

test("the cube contains 8 corners, 24 centres and 24 wings", () => {
  const state = solvedState();

  assert.deepEqual(pieceCounts(state), {
    corners: 8,
    centres: 24,
    wings: 24
  });

  assert.equal(PIECE_LOCATIONS.length, 56);
  assert.equal(hasExpectedPieceCounts(state), true);
});

test("each piece location has the correct number of stickers", () => {
  const pieces = extractPieces(solvedState());

  assert.ok(pieces.corners.every((piece) => piece.stickers.length === 3));
  assert.ok(pieces.centres.every((piece) => piece.stickers.length === 1));
  assert.ok(pieces.wings.every((piece) => piece.stickers.length === 2));
});

test("all facelet indices belong to exactly one piece location", () => {
  const indices = PIECE_LOCATIONS.flatMap(
    (location) => location.faceletIndices
  );

  assert.equal(indices.length, 96);
  assert.equal(new Set(indices).size, 96);

  for (let index = 0; index < 96; index++) {
    assert.ok(indices.includes(index));
  }
});

test("the extraction helpers return the corresponding piece groups", () => {
  const state = solvedState();

  assert.equal(extractCorners(state).length, 8);
  assert.equal(extractCentres(state).length, 24);
  assert.equal(extractWings(state).length, 24);
});

test("solved corners have distinct colour signatures", () => {
  const corners = extractCorners(solvedState());
  const signatures = corners.map((piece) => piece.signature);

  assert.equal(new Set(signatures).size, 8);
});

test("solved edge wings have duplicate signatures in pairs", () => {
  const wings = extractWings(solvedState());
  const counts = new Map();

  for (const wing of wings) {
    counts.set(
      wing.signature,
      (counts.get(wing.signature) ?? 0) + 1
    );
  }

  assert.equal(counts.size, 12);

  for (const count of counts.values()) {
    assert.equal(count, 2);
  }
});

test("each face has four centre stickers in the solved state", () => {
  const centres = extractCentres(solvedState());

  for (const face of ["U", "R", "F", "D", "L", "B"]) {
    assert.equal(
      centres.filter((centre) => centre.stickers[0].colour === face).length,
      4
    );
  }
});

test("piece extraction remains structurally valid after outer turns", () => {
  const state = applyMoves(
    solvedState(),
    "R U2 F' L D Rw U' 2F B2"
  );

  assert.equal(hasExpectedPieceCounts(state), true);

  const pieces = extractPieces(state);

  assert.equal(pieces.corners.length, 8);
  assert.equal(pieces.centres.length, 24);
  assert.equal(pieces.wings.length, 24);

  assert.ok(pieces.corners.every((piece) => piece.stickers.length === 3));
  assert.ok(pieces.centres.every((piece) => piece.stickers.length === 1));
  assert.ok(pieces.wings.every((piece) => piece.stickers.length === 2));
});

test("applying a sequence and its inverse restores extracted pieces", () => {
  const solved = solvedState();
  const sequence = "R U2 F' L D Rw U' 2F B2";

  const scrambled = applyMoves(solved, sequence);
  const restored = applyMoves(
    scrambled,
    "B2 2F' U Rw' D' L' F U2 R'"
  );

  assert.deepEqual(restored, solved);
  assert.equal(isSolved(restored), true);
});
