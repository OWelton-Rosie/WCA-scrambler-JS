import test from "node:test";
import assert from "node:assert/strict";

import { solvedState, isValidState } from "../../puzzles/444/state.js";
import { PIECE_LOCATIONS } from "../../puzzles/444/pieces.js";
import {
  applyCornerStateToFacelets,
  extractCornerState,
  isLegalCornerState
} from "../../puzzles/444/corners.js";
import { sample444CornerState } from "../../puzzles/444/corner-sampler.js";

const cornerFaceletIndices = new Set(
  PIECE_LOCATIONS
    .filter((location) => location.type === "corner")
    .flatMap((location) => location.faceletIndices)
);

test("sampled corner coordinates round-trip through the facelet model", () => {
  for (let i = 0; i < 500; i++) {
    const sampled = sample444CornerState();
    const state = applyCornerStateToFacelets(solvedState(), sampled);

    assert.ok(isValidState(state), `facelet colour counts at sample ${i}`);
    assert.deepEqual(extractCornerState(state), sampled);
    assert.equal(isLegalCornerState(extractCornerState(state)), true);
  }
});

test("writing corners preserves every non-corner facelet", () => {
  const base = solvedState();
  const sampled = sample444CornerState();
  const result = applyCornerStateToFacelets(base, sampled);

  for (let i = 0; i < base.length; i++) {
    if (!cornerFaceletIndices.has(i)) {
      assert.equal(result[i], base[i], `non-corner facelet ${i}`);
    }
  }
});

test("rejects malformed corner coordinates", () => {
  assert.throws(() => applyCornerStateToFacelets(solvedState(), {
    cp: [0, 0, 1, 2, 3, 4, 5, 6],
    co: Array(8).fill(0)
  }));
});
