
import test from "node:test";
import assert from "node:assert/strict";

import { solvedState } from "../puzzles/444/state.js";
import { applyMoves } from "../puzzles/444/moves.js";
import {
  extractWingState,
  extractReducedEdges
} from "../puzzles/444/wings.js";
import {
  analyzePLLParity,
  hasPLLParity
} from "../puzzles/444/parity.js";

test("every wing has a defined orientation in the solved state", () => {
  const wings = extractWingState(solvedState());

  assert.equal(wings.length, 24);

  for (const wing of wings) {
    assert.ok(
      wing.orientation === 0 || wing.orientation === 1,
      `Unexpected orientation for ${wing.signature}`
    );
  }
});

test("wing orientations remain defined after legal move sequences", () => {
  const sequences = [
    "R U F' L2 D B",
    "Rw U 2F R' Uw2 D Lw' B2",
    "2R 2U' 2F2 2L 2D' 2B2"
  ];

  for (const sequence of sequences) {
    const wings = extractWingState(
      applyMoves(solvedState(), sequence)
    );

    assert.equal(wings.length, 24);

    for (const wing of wings) {
      assert.ok(
        wing.orientation === 0 || wing.orientation === 1,
        `${sequence}: invalid orientation for ${wing.signature}`
      );
    }
  }
});

test("the solved cube has no PLL parity", () => {
  const result = analyzePLLParity(solvedState());

  assert.ok(result);
  assert.equal(result.cornerParity, 0);
  assert.equal(result.edgeParity, 0);
  assert.equal(result.hasPLLParity, false);
  assert.equal(hasPLLParity(solvedState()), false);
});

test("outer-layer scrambles preserve a valid reduced edge state", () => {
  const state = applyMoves(
    solvedState(),
    "R U2 F' L D B2"
  );

  const result = analyzePLLParity(state);

  assert.ok(result);
  assert.ok([0, 1].includes(result.cornerParity));
  assert.ok([0, 1].includes(result.edgeParity));
  assert.equal(result.edgePermutation.length, 12);
  assert.equal(new Set(result.edgePermutation).size, 12);
  assert.equal(result.hasPLLParity, false);
});

test("an unpaired or unreduced state is not classified as PLL parity", () => {
  const state = applyMoves(solvedState(), "2R");

  assert.equal(analyzePLLParity(state), null);
  assert.equal(hasPLLParity(state), null);
});

test("detects PLL parity after a standard parity algorithm", () => {
  // Equivalent to the familiar wide-turn form:
  // Rw2 R2 U2 Rw2 R2 Uw2 Rw2 R2 Uw2
  const state = applyMoves(
    solvedState(),
    "2R2 U2 2R2 Uw2 2R2 Uw2"
  );

  const result = analyzePLLParity(state);

  assert.ok(result, "Parity algorithm should leave a reduced state");
  assert.equal(result.hasPLLParity, true);
  assert.notEqual(result.cornerParity, result.edgeParity);
});

test("the PLL parity algorithm is reversible", () => {
  const solved = solvedState();
  const algorithm = "2R2 U2 2R2 Uw2 2R2 Uw2";
  const inverse = "Uw2 2R2 Uw2 2R2 U2 2R2";

  const result = applyMoves(
    applyMoves(solved, algorithm),
    inverse
  );

  assert.deepEqual(result, solved);
});

test("reduced-edge extraction returns twelve pairs of wings", () => {
  const edges = extractReducedEdges(solvedState());

  assert.equal(edges.length, 12);

  for (const edge of edges) {
    assert.equal(edge.wings.length, 2);
    assert.equal(
      edge.wings[0].signature,
      edge.wings[1].signature
    );
    assert.equal(
      edge.wings[0].orientation,
      edge.wings[1].orientation
    );
  }
});
