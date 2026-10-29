import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves, MOVE_NAMES, invertMoves } from "../../puzzles/444/moves.js";
import { solvedState, isValidState } from "../../puzzles/444/state.js";
import { extractCornerState, isLegalCornerState } from "../../puzzles/444/corners.js";
import { centreColourCounts } from "../../puzzles/444/centres.js";
import { hasValidWingPairCounts } from "../../puzzles/444/wings.js";
import { hasExpectedPieceCounts } from "../../puzzles/444/pieces.js";

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

function assertLegalMoveReachabilityEvidence(state, label) {
  assert.ok(isValidState(state), `${label}: sticker counts`);
  assert.ok(hasExpectedPieceCounts(state), `${label}: geometric piece counts`);
  assert.ok(isLegalCornerState(extractCornerState(state)), `${label}: corner permutation/orientation`);
  assert.deepEqual(
    Object.values(centreColourCounts(state)).sort((a, b) => a - b),
    [4, 4, 4, 4, 4, 4],
    `${label}: centre colour counts`
  );
  assert.ok(hasValidWingPairCounts(state), `${label}: wing colour-pair counts`);
}

test("every supported move followed by its inverse restores the exact facelet state", () => {
  const solved = solvedState();
  for (const move of MOVE_NAMES) {
    const state = applyMoves(solved, [move]);
    assert.deepEqual(applyMoves(state, invertMoves([move])), solved, move);
  }
});

test("stratified deterministic legal-state corpus preserves observable invariants and inverse replay", () => {
  const solved = solvedState();
  const families = [
    { name: "outer", moves: MOVE_NAMES.filter((move) => !move.startsWith("2") && !move.includes("w")) },
    { name: "outer+wide", moves: MOVE_NAMES.filter((move) => !move.startsWith("2")) },
    { name: "all-layer", moves: [...MOVE_NAMES] }
  ];

  let sample = 0;
  for (const family of families) {
    for (let caseIndex = 0; caseIndex < 24; caseIndex++) {
      const random = seededRandom(0x6d2b79f5 + sample * 0x9e3779b9);
      const scramble = [];
      let previousFace = null;

      while (scramble.length < 20 + (caseIndex % 21)) {
        const move = family.moves[Math.floor(random() * family.moves.length)];
        const face = move.startsWith("2") ? move[1] : move[0];
        if (face === previousFace) continue;
        scramble.push(move);
        previousFace = face;
      }

      const state = applyMoves(solved, scramble);
      assertLegalMoveReachabilityEvidence(state, `${family.name} sample ${caseIndex}`);
      assert.deepEqual(
        applyMoves(state, invertMoves(scramble)),
        solved,
        `${family.name} sample ${caseIndex}: inverse replay`
      );
      sample++;
    }
  }
});
