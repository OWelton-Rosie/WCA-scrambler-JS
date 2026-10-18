import test from "node:test";
import assert from "node:assert/strict";

import { generateMinx } from "../../puzzles/minx/scramble.js";

function seededRandomWord(seed) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6D2B79F5) >>> 0;

    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return (value ^ (value >>> 14)) >>> 0;
  };
}

test("generates a conventional 76-token Megaminx random-move scramble", () => {
  const result = generateMinx();

  assert.equal(result.event, "minx");
  assert.equal(result.method, "random-moves");
  assert.equal(result.state, null);
  assert.equal(result.moves.length, 76);
  assert.equal(result.notation, result.moves.join(" "));
  assert.equal(result.moves.filter(move => move === "U" || move === "U'").length, 6);
  assert.equal(result.moves.filter(move => move.startsWith("R")).length, 35);
  assert.equal(result.moves.filter(move => move.startsWith("D")).length, 35);

  for (const move of result.moves) {
    assert.ok(
      ["R++", "R--", "D++", "D--", "U", "U'"].includes(move),
      `Unexpected Megaminx move: ${move}`
    );
  }
});

test("formats Megaminx scrambles as seven rows of five R/D pairs", () => {
  const { moves } = generateMinx();
  let index = 0;

  assert.equal(moves.length, 76);

  // The first six rows have ten R/D turns and one U turn;
  // the final row has ten R/D turns and no U turn.
  for (let row = 0; row < 7; row++) {
    for (let pair = 0; pair < 5; pair++) {
      assert.match(moves[index++], /^R(?:\+\+|--)$/);
      assert.match(moves[index++], /^D(?:\+\+|--)$/);
    }

    if (row < 6) {
      assert.match(moves[index++], /^U'?$/);
    }
  }

  assert.equal(index, 76);
});

test("supports reproducible generation with an injected random source", () => {
  const first = generateMinx({ randomWord: seededRandomWord(12345) });
  const second = generateMinx({ randomWord: seededRandomWord(12345) });

  assert.equal(first.notation, second.notation);
  assert.deepEqual(first.moves, second.moves);
});

test("rejects invalid options", () => {
  assert.throws(
    () => generateMinx(null),
    { name: "TypeError", message: /options must be an object/ }
  );

  assert.throws(
    () => generateMinx({ randomWord: 42 }),
    { name: "TypeError" }
  );
});
