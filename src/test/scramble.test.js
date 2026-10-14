
import test from "node:test";
import assert from "node:assert/strict";
import Cube from "cubejs";

import { generate, events } from "../index.js";
import {
  isEligibleState,
  sampleEligibleState
} from "../puzzles/333/scramble.js";
import { solveState } from "../puzzles/333/solver.js";
import { applyMoves } from "../puzzles/444/moves.js";
import { isSolved as is444Solved, isValidState as isValid444State } from "../puzzles/444/state.js";

const FACES = ["U", "R", "F", "D", "L", "B"];
const SUFFIXES = ["", "2", "'"];

// A deterministic uint32 source for reproducible tests.
// This is test-only; it is not intended for production randomness.
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

test("advertises all implemented events", () => {
  assert.deepEqual(events, ["333", "222", "pyram", "444"]);
});

test("rejects unsupported events", async () => {
  await assert.rejects(
    generate("999"),
    {
      name: "RangeError",
      message: /Unsupported event/
    }
  );
});

test("4x4 generates a random-state scramble and replays it with the local move model", async () => {
  const result = await generate("444", { seed: "cubesmith 444" });

  assert.equal(result.event, "444");
  assert.equal(result.method, "random-state");
  assert.equal(result.backend, "@cubesmith/scrambler");
  assert.ok(result.notation.length > 0);
  assert.ok(result.moves.length > 1);
  assert.equal(result.notation, result.moves.join(" "));
  assert.equal(isValid444State(result.state), true);
  assert.equal(is444Solved(result.state), false);
  assert.deepEqual(
    applyMoves(result.state, result.moves.slice().reverse().map(invert444Move)),
    (await import("../puzzles/444/state.js")).solvedState()
  );
});

function invert444Move(move) {
  const match = move.match(/^(.*?)(2|')?$/);
  const suffix = match[2] ?? "";
  if (suffix === "2") return move;
  return suffix === "'" ? match[1] : `${match[1]}'`;
}

test("rejects an invalid injected random source", async () => {
  await assert.rejects(
    generate("333", { randomWord: 42 }),
    {
      name: "TypeError",
      message: /randomWord must be a function/
    }
  );
});

test("rejects all 19 ineligible states", () => {
  const excluded = [
    new Cube()
  ];

  for (const face of FACES) {
    for (const suffix of SUFFIXES) {
      excluded.push(new Cube().move(face + suffix));
    }
  }

  // Ensure the test really covers 19 distinct states.
  const uniqueStates = new Set(
    excluded.map((cube) => cube.asString())
  );

  assert.equal(excluded.length, 19);
  assert.equal(uniqueStates.size, 19);

  for (const cube of excluded) {
    assert.equal(
      isEligibleState(cube.toJSON()),
      false,
      `State should be excluded: ${cube.asString()}`
    );
  }
});

test("accepts an eligible state requiring at least two face turns", () => {
  const cube = new Cube().move("R U");

  assert.equal(isEligibleState(cube.toJSON()), true);
});

test("the sampler returns an eligible state", () => {
  const { stateData, cube } = sampleEligibleState(
    seededRandomWord(123456)
  );

  assert.equal(isEligibleState(stateData), true);
  assert.equal(cube.asString(), new Cube(stateData).asString());
});

test("generated scrambles replay to their sampled target", async () => {
  const result = await generate("333", {
    randomWord: seededRandomWord(1001)
  });

  const replayed = new Cube().move(result.notation);
  const target = new Cube(result.state);

  assert.equal(replayed.asString(), target.asString());
  assert.equal(result.event, "333");
  assert.ok(result.notation.length > 0);
  assert.deepEqual(
    result.moves,
    result.notation.split(/\s+/)
  );
});

test("generated states cannot be solved in zero or one face turn", async () => {
  const result = await generate("333", {
    randomWord: seededRandomWord(1002)
  });

  assert.equal(isEligibleState(result.state), true);
});

test("solver solutions actually solve sampled targets", async () => {
  const result = await generate("333", {
    randomWord: seededRandomWord(1003)
  });

  const solution = solveState(result.state);
  const target = new Cube(result.state).move(solution);

  assert.equal(target.isSolved(), true);
});

test("the scramble and solution undo each other", async () => {
  const result = await generate("333", {
    randomWord: seededRandomWord(1004)
  });

  const solution = solveState(result.state);
  const scrambled = new Cube().move(result.notation);

  assert.equal(
    scrambled.asString(),
    new Cube(result.state).asString()
  );

  assert.equal(
    scrambled.clone().move(solution).isSolved(),
    true
  );
});

test("the same injected random source reproduces the same scramble", async () => {
  const first = await generate("333", {
    randomWord: seededRandomWord(987654)
  });

  const second = await generate("333", {
    randomWord: seededRandomWord(987654)
  });

  assert.equal(first.notation, second.notation);
  assert.deepEqual(first.moves, second.moves);
  assert.deepEqual(first.state, second.state);
});
