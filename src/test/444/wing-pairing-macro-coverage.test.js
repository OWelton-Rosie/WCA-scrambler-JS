import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves, invertMoves } from "../../puzzles/444/moves.js";
import { FACELETS, solvedState } from "../../puzzles/444/state.js";
import { CENTRE_SLOTS } from "../../puzzles/444/centres.js";
import { deriveCentreNeutralCommutators } from "../../puzzles/444/centre-neutral-macros.js";
import {
  encodeWingPairPosition,
  estimateWingPairingMacroDepth,
  getWingPairDistance,
  getWingPairSignatures
} from "../../puzzles/444/wing-pair-pruning.js";

function centresAreSolved(state) {
  return CENTRE_SLOTS.every(
    ({ faceletIndex }) => state[faceletIndex] === FACELETS[faceletIndex].face
  );
}

function assertPairDistancesBounded(state, macroCount, label) {
  for (const signature of getWingPairSignatures()) {
    const position = encodeWingPairPosition(state, signature);
    assert.ok(
      getWingPairDistance(position, signature) <= macroCount,
      `${label}: ${signature} pair distance exceeded ${macroCount} macro steps`
    );
  }

  assert.ok(
    estimateWingPairingMacroDepth(state) <= macroCount,
    `${label}: aggregate lower bound exceeded known macro path`
  );
}

test("wing-pair pattern databases cover every discovered single-macro transition", () => {
  const solved = solvedState();
  const macros = deriveCentreNeutralCommutators();

  assert.ok(macros.length > 0);

  for (const [index, macro] of macros.entries()) {
    const state = applyMoves(solved, macro.moves);
    assert.ok(centresAreSolved(state), `macro ${index}: ${macro.notation} changed centre colours`);
    assertPairDistancesBounded(state, 1, `macro ${index}: ${macro.notation}`);
  }
});

test("wing-pair lower bounds remain admissible across a seeded multi-macro state corpus", () => {
  const macros = deriveCentreNeutralCommutators().filter(
    (macro) => macro.pairedEdges < 12
  );
  assert.ok(macros.length >= 4);

  let seed = 0x7f4a7c15;
  const random = (limit) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed % limit;
  };

  const solved = solvedState();

  for (let sample = 0; sample < 32; sample++) {
    const macroCount = 2 + (sample % 3);
    const selected = Array.from(
      { length: macroCount },
      () => macros[random(macros.length)]
    );
    const scramble = selected.flatMap((macro) => macro.moves);
    const state = applyMoves(solved, scramble);

    assert.ok(centresAreSolved(state), `sample ${sample}: centre colours changed`);
    assert.deepEqual(
      applyMoves(state, invertMoves(scramble)),
      solved,
      `sample ${sample}: inverse replay failed`
    );
    assertPairDistancesBounded(state, macroCount, `sample ${sample}`);
  }
});
