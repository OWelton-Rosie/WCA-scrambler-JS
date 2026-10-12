
import test from "node:test";
import assert from "node:assert/strict";
import Cube from "cubejs";

import {
  identityState,
  isLegalState
} from "../puzzles/222/state.js";

import { randomLegalState } from "../puzzles/222/random.js";

import {
  cubeFromState,
  to333State
} from "../puzzles/222/solver.js";

import {
  generate222,
  isEligibleState,
  sampleEligibleState
} from "../puzzles/222/scramble.js";

function seededRandomWord(seed = 123456789) {
  let value = seed >>> 0;

  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value;
  };
}

function assertSameCorners(actual, expected) {
  assert.deepEqual(Array.from(actual.cp), Array.from(expected.cp));
  assert.deepEqual(Array.from(actual.co), Array.from(expected.co));
}

test("identity state is legal and solved", () => {
  const state = identityState();

  assert.equal(isLegalState(state), true);
  assert.deepEqual(state.cp, [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(state.co, Array(8).fill(0));
});

test("generates legal states reachable using U, R and F", () => {
  for (let i = 0; i < 100; i++) {
    const state = randomLegalState();

    assert.equal(isLegalState(state), true);
    assert.equal(new Set(state.cp).size, 8);
    assert.equal(state.cp[6], 6);
    assert.equal(state.co[6], 0);
    assert.equal(
      state.co.reduce((sum, value) => sum + value, 0) % 3,
      0
    );
  }
});

test("rejects invalid corner states", () => {
  assert.equal(
    isLegalState({ cp: [0, 1, 2], co: [0, 0, 0] }),
    false
  );

  const badOrientation = identityState();
  badOrientation.co[0] = 3;

  assert.equal(isLegalState(badOrientation), false);

  const invalidOrientationSum = identityState();
  invalidOrientationSum.co[0] = 1;

  assert.equal(isLegalState(invalidOrientationSum), false);
});

test("adapts odd corner parity to a legal 3x3 state", () => {
  const state = identityState();

  [state.cp[0], state.cp[1]] = [state.cp[1], state.cp[0]];

  const adapted = to333State(state);

  assert.equal(isLegalState(state), true);
  assert.equal(
    adapted.ep[0] !== 0 || adapted.ep[1] !== 1,
    true
  );
  assert.equal(adapted.ep.length, 12);
});

test("rejects the solved state and all 18 single face turns", () => {
  const states = new Set();

  states.add(JSON.stringify({
    cp: identityState().cp,
    co: identityState().co
  }));

  const faces = ["U", "R", "F", "D", "L", "B"];
  const suffixes = ["", "2", "'"];

  for (const face of faces) {
    for (const suffix of suffixes) {
      const cube = new Cube().move(face + suffix);

      const state = {
        cp: Array.from(cube.cp),
        co: Array.from(cube.co)
      };

      states.add(JSON.stringify(state));

      if (["U", "R", "F"].includes(face)) {
        assert.equal(isEligibleState(state), false);
      } else {
        assert.throws(
          () => isEligibleState(state),
          /Invalid 2x2 cube state/
        );
      }
    }
  }

  assert.equal(states.size, 19);
  assert.equal(isEligibleState(identityState()), false);
});

test("sampler returns an eligible legal state", () => {
  const { state, cube } = sampleEligibleState(seededRandomWord());

  assert.equal(isLegalState(state), true);
  assert.equal(isEligibleState(state), true);

  assertSameCorners(cube, state);
  assertSameCorners(cubeFromState(state), state);
});

test("generated scramble uses only U, R and F moves", async () => {
  const result = await generate222(seededRandomWord(987654321));

  assert.equal(result.event, "222");
  assert.ok(result.notation.length > 0);
  assert.deepEqual(result.moves, result.notation.split(/\s+/));

  for (const move of result.moves) {
    assert.match(move, /^(U|R|F)(2|'|)$/);
  }
});

test("generated scramble replays to the sampled 2x2 corner state", async () => {
  const result = await generate222(seededRandomWord(987654321));
  const replayed = new Cube().move(result.notation);

  assertSameCorners(replayed, result.state);
});

test("generated scramble's inverse returns the cube to solved", async () => {
  const result = await generate222(seededRandomWord(246813579));

  const cube = new Cube().move(result.notation);

  assert.equal(
    cube.clone().move(Cube.inverse(result.notation)).isSolved(),
    true
  );
});
