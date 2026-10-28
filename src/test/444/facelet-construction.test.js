import test from "node:test";
import assert from "node:assert/strict";

import { solvedState, isValidState } from "../../puzzles/444/state.js";
import { PIECE_LOCATIONS } from "../../puzzles/444/pieces.js";
import { extractCornerState, isLegalCornerState, applyCornerStateToFacelets } from "../../puzzles/444/corners.js";
import { sample444CornerState } from "../../puzzles/444/corner-sampler.js";
import { sample444CentreColours, applyCentreColoursToFacelets } from "../../puzzles/444/centre-sampler.js";
import { extractCentreState } from "../../puzzles/444/centres.js";
import { sample444WingPermutation, applyWingPermutationToFacelets } from "../../puzzles/444/wing-sampler.js";
import { extractWingState, hasValidWingPairCounts } from "../../puzzles/444/wings.js";

function deterministicSource(seed = 0x12345678) {
  let word = seed >>> 0;
  return () => {
    word = (Math.imul(word, 1664525) + 1013904223) >>> 0;
    return word;
  };
}

test("sampled coordinates construct facelet states with valid sticker counts and round trips", () => {
  for (let sample = 0; sample < 250; sample++) {
    const randomWord = deterministicSource(sample + 1);
    let state = solvedState();
    const corners = sample444CornerState({ randomWord });
    const centres = sample444CentreColours({ randomWord });
    const wings = sample444WingPermutation({ randomWord });

    state = applyCornerStateToFacelets(state, corners);
    state = applyCentreColoursToFacelets(state, centres);
    state = applyWingPermutationToFacelets(state, wings);

    assert.ok(isValidState(state), `sample ${sample}: sticker counts`);
    assert.ok(isLegalCornerState(extractCornerState(state)), `sample ${sample}: corner legality`);
    assert.deepEqual(extractCornerState(state), corners, `sample ${sample}: corner round trip`);
    assert.deepEqual(
      extractCentreState(state).map((centre) => centre.colour),
      centres,
      `sample ${sample}: centre round trip`
    );
    assert.ok(hasValidWingPairCounts(state), `sample ${sample}: wing pair counts`);
    assert.deepEqual(
      [...wings].sort((a, b) => a - b),
      Array.from({ length: 24 }, (_, index) => index),
      `sample ${sample}: labelled wing permutation`
    );
  }
});

test("coordinate writers preserve facelets outside their own piece class", () => {
  const base = solvedState();
  const centreIndices = new Set(PIECE_LOCATIONS.filter((p) => p.type === "centre").flatMap((p) => p.faceletIndices));
  const wingIndices = new Set(PIECE_LOCATIONS.filter((p) => p.type === "wing").flatMap((p) => p.faceletIndices));
  const cornerIndices = new Set(PIECE_LOCATIONS.filter((p) => p.type === "corner").flatMap((p) => p.faceletIndices));
  const randomWord = deterministicSource();

  const afterCorners = applyCornerStateToFacelets(base, sample444CornerState({ randomWord }));
  for (let i = 0; i < base.length; i++) if (!cornerIndices.has(i)) assert.equal(afterCorners[i], base[i]);

  const afterCentres = applyCentreColoursToFacelets(base, sample444CentreColours({ randomWord }));
  for (let i = 0; i < base.length; i++) if (!centreIndices.has(i)) assert.equal(afterCentres[i], base[i]);

  const afterWings = applyWingPermutationToFacelets(base, sample444WingPermutation({ randomWord }));
  for (let i = 0; i < base.length; i++) if (!wingIndices.has(i)) assert.equal(afterWings[i], base[i]);
});

test("facelet writers reject malformed centre and wing coordinates", () => {
  const base = solvedState();
  assert.throws(() => applyCentreColoursToFacelets(base, Array(24).fill("U")));
  assert.throws(() => applyWingPermutationToFacelets(base, []));
  assert.throws(() => applyWingPermutationToFacelets(base, Array(24).fill(0)));
});
