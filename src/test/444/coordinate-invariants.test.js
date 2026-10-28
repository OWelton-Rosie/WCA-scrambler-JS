import test from "node:test";
import assert from "node:assert/strict";

import { solvedState, isValidState } from "../../puzzles/444/state.js";
import { applyMove, applyMoves, MOVE_NAMES } from "../../puzzles/444/moves.js";
import { extractCornerState, isLegalCornerState } from "../../puzzles/444/corners.js";
import { centreColourCounts } from "../../puzzles/444/centres.js";
import { hasValidWingPairCounts } from "../../puzzles/444/wings.js";
import { hasExpectedPieceCounts } from "../../puzzles/444/pieces.js";

function deterministicMoves(count) {
  // A reproducible mixture of outer, wide and inner-layer turns.
  let word = 0x6d2b79f5;
  const moves = [];

  for (let i = 0; i < count; i++) {
    word = Math.imul(word ^ (word >>> 15), 1 | word);
    word ^= word + Math.imul(word ^ (word >>> 7), 61 | word);
    const index = (word ^ (word >>> 14)) >>> 0;
    moves.push(MOVE_NAMES[index % MOVE_NAMES.length]);
  }

  return moves;
}

function assertCoordinateInvariants(state, label) {
  assert.ok(isValidState(state), `${label}: facelet colour counts`);
  assert.ok(hasExpectedPieceCounts(state), `${label}: geometric piece counts`);
  assert.ok(isLegalCornerState(extractCornerState(state)), `${label}: corner coordinate`);

  const counts = centreColourCounts(state);
  assert.deepEqual(
    Object.values(counts).sort((a, b) => a - b),
    [4, 4, 4, 4, 4, 4],
    `${label}: four centres of each colour`
  );

  assert.ok(hasValidWingPairCounts(state), `${label}: two wings per edge-colour pair`);
}

test("every supported single move preserves the observable coordinate invariants", () => {
  const solved = solvedState();

  for (const move of MOVE_NAMES) {
    assertCoordinateInvariants(applyMove(solved, move), `move ${move}`);
  }
});

test("long deterministic legal sequences preserve the observable coordinate invariants", () => {
  let state = solvedState();
  const moves = deterministicMoves(600);

  for (let i = 0; i < moves.length; i++) {
    state = applyMove(state, moves[i]);

    if ((i + 1) % 25 === 0) {
      assertCoordinateInvariants(state, `after move ${i + 1}`);
    }
  }

  assertCoordinateInvariants(applyMoves(solvedState(), moves), "full sequence replay");
});
