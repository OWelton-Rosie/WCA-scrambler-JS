import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves } from "../../puzzles/444/moves.js";
import { solvedState, isSolved } from "../../puzzles/444/state.js";
import { analyzeReduced444State } from "../../puzzles/444/reduced-solver.js";
import {
  deriveReducedParityMacros,
  repairReducedParityBounded
} from "../../puzzles/444/parity-macros.js";

test("derived parity macros are reduced and reproduce their declared parity", () => {
  const macros = deriveReducedParityMacros();
  assert.ok(macros.length > 0, "expected at least one derived parity gadget");

  for (const macro of macros) {
    const state = applyMoves(solvedState(), macro.moves);
    const analysis = analyzeReduced444State(state);
    assert.equal(analysis.legal, false);
    if (macro.parity === "OLL") assert.equal(analysis.ollParity, true);
    if (macro.parity === "PLL") assert.equal(analysis.pllParity, true);
    assert.equal(analysis.facelets, macro.facelets);
  }
});

test("bounded parity repair verifies a derived parity fixture through facelet replay", () => {
  const macro = deriveReducedParityMacros()[0];
  assert.ok(macro, "expected a derived parity gadget");
  const state = applyMoves(solvedState(), macro.moves);
  const result = repairReducedParityBounded(state, { maxSteps: 1 });

  assert.equal(result.solved, true);
  assert.equal(result.analysis.legal, true);
  assert.deepEqual(result.state, applyMoves(state, result.moves));
  assert.equal(isSolved(result.state), true);
});
