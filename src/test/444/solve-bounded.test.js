import test from "node:test";
import assert from "node:assert/strict";

import { applyMoves } from "../../puzzles/444/moves.js";
import { isSolved, solvedState } from "../../puzzles/444/state.js";
import { solve444Bounded } from "../../puzzles/444/solve-bounded.js";

test("bounded end-to-end pipeline solves reduced legal scrambles and verifies full replay", async () => {
  const scrambles = [
    ["R"],
    ["R", "U", "F2"],
    ["L'", "D", "B", "R2"],
    ["R", "U", "R'", "U'", "F2", "D"]
  ];

  for (const scramble of scrambles) {
    const start = applyMoves(solvedState(), scramble);
    const result = await solve444Bounded(start);

    assert.equal(result.solved, true, scramble.join(" "));
    assert.ok(isSolved(result.state), scramble.join(" "));
    assert.deepEqual(applyMoves(start, result.moves), solvedState(), scramble.join(" "));
    assert.deepEqual(applyMoves(solvedState(), [...scramble, ...result.moves]), solvedState());
    assert.equal(result.stages.reduced3x3.parity.oll, false);
    assert.equal(result.stages.reduced3x3.parity.pll, false);
  }
});

test("bounded pipeline reports centre-search exhaustion as a stage-specific failure", async () => {
  const state = applyMoves(solvedState(), ["Rw"]);

  await assert.rejects(
    solve444Bounded(state, {
      centreMaxDepth: 0,
      centreMaxNodes: 100,
      wingMaxMacroDepth: 0,
      wingMaxNodes: 1,
      wingBeamWidth: 1
    }),
    (error) => {
      assert.equal(error instanceof RangeError, true);
      assert.match(error.message, /centre stage failed/i);
      return true;
    }
  );
});

test("solved input returns an empty verified solution without initialising the 3x3 solver", async () => {
  const result = await solve444Bounded(solvedState());
  assert.equal(result.solved, true);
  assert.deepEqual(result.moves, []);
  assert.deepEqual(result.state, solvedState());
  assert.equal(isSolved(result.state), true);
});

test("bounded pipeline reduces a single wide turn, then verifies the complete solution", async () => {
  for (const scramble of [["Rw"], ["Uw'"], ["Fw2"], ["2R'"]]) {
    const start = applyMoves(solvedState(), scramble);
    const result = await solve444Bounded(start, {
      centreMaxDepth: 4,
      centreMaxNodes: 100000,
      wingMaxMacroDepth: 2,
      wingMaxNodes: 5000,
      wingBeamWidth: 100
    });

    assert.equal(result.solved, true, scramble.join(" "));
    assert.ok(isSolved(result.state), scramble.join(" "));
    assert.ok(result.stages.centres.moves.length > 0, scramble.join(" "));
    assert.deepEqual(applyMoves(start, result.moves), solvedState(), scramble.join(" "));
    assert.deepEqual(applyMoves(solvedState(), [...scramble, ...result.moves]), solvedState());
  }
});

test("deterministic adversarial outer-turn sequences survive reduced 3x3 hand-off and full replay", async () => {
  const movePool = [
    "U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2",
    "D", "D'", "D2", "L", "L'", "L2", "B", "B'", "B2"
  ];
  let seed = 0x4d595df4;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 0x1_0000_0000;
  };

  for (let sample = 0; sample < 8; sample++) {
    const scramble = Array.from(
      { length: 12 + sample },
      () => movePool[Math.floor(random() * movePool.length)]
    );
    const start = applyMoves(solvedState(), scramble);
    const result = await solve444Bounded(start);

    assert.equal(result.solved, true, `sample ${sample}: ${scramble.join(" ")}`);
    assert.ok(isSolved(result.state), `sample ${sample}`);
    assert.deepEqual(
      applyMoves(start, result.moves),
      solvedState(),
      `sample ${sample}: replay mismatch`
    );
  }
});

test("bounded pipeline attempts a centre-neutral wide/outer commutator end to end", async () => {
  const scramble = ["Rw", "U", "Rw'"];
  const start = applyMoves(solvedState(), scramble);
  const result = await solve444Bounded(start, {
    centreMaxDepth: 6,
    centreMaxNodes: 100000,
    wingMaxMacroDepth: 4,
    wingMaxNodes: 20000,
    wingBeamWidth: 300
  });

  assert.equal(result.solved, true);
  assert.ok(isSolved(result.state));
  assert.deepEqual(applyMoves(start, result.moves), solvedState());
  assert.deepEqual(applyMoves(solvedState(), [...scramble, ...result.moves]), solvedState());
});

test("bounded pipeline solves a multi-wide-turn legal scramble with full replay verification", async () => {
  const scramble = ["Rw", "Uw'", "Fw2"];
  const start = applyMoves(solvedState(), scramble);
  const result = await solve444Bounded(start, {
    centreMaxDepth: 6,
    centreMaxNodes: 200000,
    wingMaxMacroDepth: 4,
    wingMaxNodes: 20000,
    wingBeamWidth: 300
  });

  assert.equal(result.solved, true);
  assert.ok(isSolved(result.state));
  assert.deepEqual(applyMoves(start, result.moves), solvedState());
  assert.deepEqual(applyMoves(solvedState(), [...scramble, ...result.moves]), solvedState());
});

test("bounded pipeline handles a mixed outer/wide sequence beyond a single commutator", async () => {
  const scramble = ["Rw", "U", "Rw'", "Fw"];
  const start = applyMoves(solvedState(), scramble);
  const result = await solve444Bounded(start, {
    centreMaxDepth: 8,
    centreMaxNodes: 200000,
    wingMaxMacroDepth: 5,
    wingMaxNodes: 30000,
    wingBeamWidth: 500
  });

  assert.equal(result.solved, true, scramble.join(" "));
  assert.ok(isSolved(result.state));
  assert.deepEqual(applyMoves(start, result.moves), solvedState());
  assert.deepEqual(applyMoves(solvedState(), [...scramble, ...result.moves]), solvedState());
});


test("bounded pipeline survives a longer adversarial mixed wide/outer scramble", async () => {
  const scramble = ["Rw", "U", "Rw'", "Fw", "U'"];
  const start = applyMoves(solvedState(), scramble);
  const result = await solve444Bounded(start, {
    centreMaxDepth: 10,
    centreMaxNodes: 300000,
    wingMaxMacroDepth: 6,
    wingMaxNodes: 50000,
    wingBeamWidth: 500,
    parityMaxSteps: 3
  });

  assert.equal(result.solved, true, scramble.join(" "));
  assert.ok(isSolved(result.state));
  assert.deepEqual(applyMoves(start, result.moves), solvedState());
  assert.deepEqual(applyMoves(solvedState(), [...scramble, ...result.moves]), solvedState());
  assert.deepEqual(result.state, applyMoves(start, result.moves));
});
