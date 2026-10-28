import test from "node:test";
import assert from "node:assert/strict";

import { FACELETS, solvedState } from "../../puzzles/444/state.js";
import { EDGE_SLOTS, WING_SLOTS } from "../../puzzles/444/wings.js";
import { applyMoves } from "../../puzzles/444/moves.js";
import { analyzeReduced444State } from "../../puzzles/444/reduced-solver.js";
import {
  deriveReducedParityMacros,
  repairReducedParityBounded
} from "../../puzzles/444/parity-macros.js";

function makeSingleEdgeFlipProjection() {
  const state = solvedState();
  const ufEdge = EDGE_SLOTS.find((edge) =>
    edge.wingSlotIndices.every((slotIndex) => {
      const slot = WING_SLOTS[slotIndex];
      const colours = slot.faceletIndices.map((index) => FACELETS[index].face).sort();
      return colours.join("") === ["F", "U"].sort().join("");
    })
  );
  assert.ok(ufEdge);

  for (const slotIndex of ufEdge.wingSlotIndices) {
    const slot = WING_SLOTS[slotIndex];
    const uIndex = slot.faceletIndices.find((index) => FACELETS[index].face === "U");
    const fIndex = slot.faceletIndices.find((index) => FACELETS[index].face === "F");
    assert.notEqual(uIndex, undefined);
    assert.notEqual(fIndex, undefined);
    state[uIndex] = "F";
    state[fIndex] = "U";
  }
  return state;
}

test("every discovered parity gadget, if any, is independently verified", () => {
  const macros = deriveReducedParityMacros();

  for (const macro of macros) {
    const state = applyMoves(solvedState(), macro.moves);
    const analysis = analyzeReduced444State(state);
    assert.equal(analysis.legal, false);
    if (macro.parity === "OLL") assert.equal(analysis.ollParity, true);
    if (macro.parity === "PLL") assert.equal(analysis.pllParity, true);
    assert.equal(analysis.facelets, macro.facelets);
  }
});

test("parity repair explicitly reports an unsupported single-edge-flip projection", () => {
  const state = makeSingleEdgeFlipProjection();
  const before = analyzeReduced444State(state);
  assert.equal(before.ollParity, true);
  assert.equal(before.legal, false);

  const result = repairReducedParityBounded(state, { maxSteps: 1 });

  assert.equal(result.solved, false);
  assert.equal(result.analysis.ollParity, true);
  assert.deepEqual(result.moves, []);
  assert.deepEqual(result.state, state);
});
