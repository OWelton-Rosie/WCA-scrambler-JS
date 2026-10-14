
import test from "node:test";
import assert from "node:assert/strict";

import {
  solvedState,
  isValidState
} from "../puzzles/444/state.js";

import { applyMoves } from "../puzzles/444/moves.js";

import {
  generateRandomWalkState
} from "../puzzles/444/random.js";

function deterministicRandomWord() {
  return 0;
}

test("generates the requested number of moves", () => {
  const result = generateRandomWalkState({
    length: 40,
    randomWord: deterministicRandomWord
  });

  assert.equal(result.moves.length, 40);
});

test("generates a valid 4x4 facelet state", () => {
  const { state } = generateRandomWalkState({
    length: 40,
    randomWord: deterministicRandomWord
  });

  assert.ok(isValidState(state));
});

test("generated state matches replaying its moves", () => {
  const { moves, state } = generateRandomWalkState({
    length: 30,
    randomWord: deterministicRandomWord
  });

  assert.deepEqual(
    state,
    applyMoves(solvedState(), moves)
  );
});

test("does not choose consecutive moves on the same face", () => {
  const { moves } = generateRandomWalkState({
    length: 100,
    randomWord: deterministicRandomWord
  });

  const faceOf = (move) =>
    move.startsWith("2") ? move[1] : move[0];

  for (let i = 1; i < moves.length; i++) {
    assert.notEqual(
      faceOf(moves[i]),
      faceOf(moves[i - 1]),
      `Consecutive moves use the same face: ${moves[i - 1]} ${moves[i]}`
    );
  }
});

test("the same random source produces the same result", () => {
  const options = {
    length: 40,
    randomWord: deterministicRandomWord
  };

  assert.deepEqual(
    generateRandomWalkState(options),
    generateRandomWalkState(options)
  );
});

test("rejects invalid move counts", () => {
  for (const length of [0, -1, 1.5, NaN, Infinity]) {
    assert.throws(
      () => generateRandomWalkState({ length }),
      RangeError
    );
  }
});
