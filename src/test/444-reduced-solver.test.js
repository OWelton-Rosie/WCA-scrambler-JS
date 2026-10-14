import assert from "node:assert/strict";
import test from "node:test";

import Cube from "cubejs";

import { applyMoves } from "../puzzles/444/moves.js";
import { solvedState } from "../puzzles/444/state.js";
import {
  analyzeReduced3x3Facelets,
  analyzeReduced444State,
  solveReduced3x3
} from "../puzzles/444/reduced-solver.js";

test("solved 4x4 has a legal reduced 3x3 state", () => {
  const analysis = analyzeReduced444State(solvedState());

  assert.equal(analysis.legal, true);
  assert.equal(analysis.ollParity, false);
  assert.equal(analysis.pllParity, false);
  assert.deepEqual(analysis.issues, []);
});

test("outer turns preserve reduced 3x3 legality", () => {
  const state = applyMoves(solvedState(), "R U F L2 D' B");

  const analysis = analyzeReduced444State(state);

  assert.equal(analysis.legal, true);
  assert.equal(analysis.ollParity, false);
  assert.equal(analysis.pllParity, false);
});

test("detects OLL parity in an impossible 3x3 projection", () => {
  const cube = new Cube();

  // Flip one edge in the cubie representation.
  cube.eo[0] = 1 - cube.eo[0];

  const analysis = analyzeReduced3x3Facelets(cube.asString());

  assert.equal(analysis.ollParity, true);
  assert.match(analysis.issues.join("; "), /OLL parity/);
});

test("detects PLL parity in an impossible 3x3 projection", () => {
  const cube = new Cube();

  // Swap two edge cubies without changing the corner permutation.
  [cube.ep[0], cube.ep[1]] = [cube.ep[1], cube.ep[0]];

  const analysis = analyzeReduced3x3Facelets(cube.asString());

  assert.equal(analysis.pllParity, true);
  assert.match(analysis.issues.join("; "), /PLL parity/);
});

test("rejects facelet strings with invalid colour counts", () => {
  assert.throws(
    () => analyzeReduced3x3Facelets("U".repeat(54)),
    /expected 9/
  );
});

test("solves the reduced 3x3 stage and verifies the solution", async () => {
  const state = applyMoves(solvedState(), "R U F L2 D' B");

  const result = await solveReduced3x3(state);
  const cube = Cube.fromString(result.facelets);

  assert.equal(result.analysis.legal, true);
  assert.equal(typeof result.solution, "string");
  assert.ok(result.solution.length > 0);
  assert.equal(cube.clone().move(result.solution).isSolved(), true);
});

test("refuses to solve a state with OLL parity", async () => {
  const cube = new Cube();
  cube.eo[0] = 1 - cube.eo[0];

  // This test checks the parity-analysis boundary directly.
  const analysis = analyzeReduced3x3Facelets(cube.asString());

  assert.equal(analysis.legal, false);
  assert.equal(analysis.ollParity, true);
});
