import assert from "node:assert/strict";
import test from "node:test";

import { generate444RandomWalkScramble, generate444Scramble } from "../../puzzles/444/scramble.js";
import { applyMoves } from "../../puzzles/444/moves.js";
import { isSolved, solvedState } from "../../puzzles/444/state.js";

test("generates a 40-move 4x4 random walk by default", () => {
  const result = generate444RandomWalkScramble();

  assert.equal(result.method, "random-walk");
  assert.equal(result.moves.length, 40);
  assert.equal(result.scramble, result.moves.join(" "));
  assert.equal(result.state.length, 96);
  assert.equal(isSolved(result.state), false);
});

test("generated moves reproduce the returned state", () => {
  const result = generate444RandomWalkScramble({ length: 25 });

  assert.deepEqual(
    result.state,
    applyMoves(solvedState(), result.moves)
  );
});

test("supports a custom scramble length", () => {
  const result = generate444RandomWalkScramble({ length: 12 });

  assert.equal(result.moves.length, 12);
});

test("rejects invalid scramble lengths", () => {
  for (const length of [0, -1, 1.5, NaN]) {
    assert.throws(
      () => generate444RandomWalkScramble({ length }),
      RangeError
    );
  }
});

test("random-state backend is reproducible across independent seeds", async () => {
  const seeds = ["seed one", "seed two"];
  const results = [];

  for (const seed of seeds) {
    const result = await generate444Scramble({ seed });
    assert.equal(result.method, "random-state");
    assert.equal(result.backend, "@cubesmith/scrambler");
    assert.ok(result.moves.length > 1);
    assert.equal(result.notation, result.moves.join(" "));
    assert.equal(isSolved(result.state), false);
    assert.deepEqual(
      applyMoves(result.state, result.moves.slice().reverse().map(invertMove)),
      solvedState()
    );
    results.push(result);
  }

  assert.notEqual(results[0].notation, results[1].notation);
});

test("random-state backend reproduces output for the same seed", async () => {
  const first = await generate444Scramble({ seed: "repeatable fixture" });
  const second = await generate444Scramble({ seed: "repeatable fixture" });

  assert.equal(first.notation, second.notation);
  assert.deepEqual(first.state, second.state);
});

function invertMove(move) {
  const match = move.match(/^(.*?)(2|')?$/);
  const suffix = match[2] ?? "";
  if (suffix === "2") return move;
  return suffix === "'" ? match[1] : `${match[1]}'`;
}

test("rejects local randomWord injection instead of weakening the backend RNG", async () => {
  await assert.rejects(
    generate444Scramble({ randomWord: () => 0 }),
    {
      name: "TypeError",
      message: /does not support randomWord injection/
    }
  );
});
