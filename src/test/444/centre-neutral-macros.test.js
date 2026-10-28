import test from "node:test";
import assert from "node:assert/strict";

import { FACELETS, solvedState } from "../../puzzles/444/state.js";
import { applyMoves } from "../../puzzles/444/moves.js";
import { CENTRE_SLOTS } from "../../puzzles/444/centres.js";
import { deriveCentreNeutralCommutators } from "../../puzzles/444/centre-neutral-macros.js";

function centresAreSolved(state) {
  return CENTRE_SLOTS.every(
    ({ faceletIndex }) => state[faceletIndex] === FACELETS[faceletIndex].face
  );
}

test("derived centre-neutral commutators preserve centres and affect wings", () => {
  const solved = solvedState();
  const macros = deriveCentreNeutralCommutators();

  assert.ok(macros.length > 0, "expected at least one non-trivial centre-neutral commutator");

  for (const macro of macros) {
    assert.equal(centresAreSolved(applyMoves(solved, macro.moves)), true, macro.notation);
    assert.ok(macro.changedWingStickers > 0, macro.notation);
    assert.ok(
      macro.moves.some((move) => move.startsWith("2") || move.endsWith("w")),
      macro.notation
    );
  }
});

test("centre-neutral commutators also preserve centres after outer turns", () => {
  const outerScramble = applyMoves(solvedState(), "R U F L2 D' B");
  assert.equal(centresAreSolved(outerScramble), true);

  for (const macro of deriveCentreNeutralCommutators().slice(0, 20)) {
    const result = applyMoves(outerScramble, macro.moves);
    assert.equal(centresAreSolved(result), true, macro.notation);
  }
});
