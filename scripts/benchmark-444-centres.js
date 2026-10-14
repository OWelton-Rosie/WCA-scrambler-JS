import { randomInt } from "../src/core/random.js";
import { applyMoves, parseMove, MOVE_NAMES } from "../src/puzzles/444/moves.js";
import { solveCentresBounded } from "../src/puzzles/444/centre-solver.js";
import { solvedState } from "../src/puzzles/444/state.js";

const LENGTHS = [1, 2, 3, 4, 5, 6];
const TRIALS_PER_LENGTH = 3;
const MAX_DEPTH = 5;
const MAX_NODES = 25_000;

const INNER_MOVES = MOVE_NAMES.filter((move) => move.startsWith("2"));

function createRandomWord(seed) {
  let state = seed >>> 0 || 0x9e3779b9;

  return () => {
    // xorshift32: deterministic test data, not a cryptographic RNG.
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return state >>> 0;
  };
}

function sliceKey(move) {
  const { axis, layers } = parseMove(move);
  return `${axis}:${layers.join(",")}`;
}

function makeCentreScramble(length, seed) {
  const randomWord = createRandomWord(seed);
  const moves = [];
  let previousSlice = null;

  while (moves.length < length) {
    const candidates = INNER_MOVES.filter(
      (move) => sliceKey(move) !== previousSlice
    );
    const move = candidates[randomInt(candidates.length, randomWord)];

    moves.push(move);
    previousSlice = sliceKey(move);
  }

  return moves;
}

function benchmarkCase(length, trial) {
  const seed = (0x44400000 + length * 100 + trial) >>> 0;
  const scramble = makeCentreScramble(length, seed);
  const state = applyMoves(solvedState(), scramble);
  const start = process.hrtime.bigint();

  try {
    const result = solveCentresBounded(state, {
      maxDepth: MAX_DEPTH,
      maxNodes: MAX_NODES
    });
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;

    return {
      length,
      trial,
      seed,
      scramble: scramble.join(" "),
      status: "solved",
      depth: result.depth,
      nodes: result.nodesVisited,
      elapsedMs,
      error: ""
    };
  } catch (error) {
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
    const message = error instanceof Error ? error.message : String(error);

    return {
      length,
      trial,
      seed,
      scramble: scramble.join(" "),
      status: Number(message.match(/visited (\d+) nodes/)?.[1] ?? 0) >= MAX_NODES
        ? "node-limit"
        : "depth-limit",
      depth: "",
      nodes: Number(message.match(/visited (\d+) nodes/)?.[1] ?? MAX_NODES),
      elapsedMs,
      error: message
    };
  }
}

const results = [];

for (const length of LENGTHS) {
  for (let trial = 1; trial <= TRIALS_PER_LENGTH; trial++) {
    const result = benchmarkCase(length, trial);
    results.push(result);

    console.log(
      [
        `length=${result.length}`,
        `trial=${result.trial}`,
        `seed=${result.seed}`,
        `status=${result.status}`,
        `depth=${result.depth === "" ? "-" : result.depth}`,
        `nodes=${result.nodes}`,
        `ms=${result.elapsedMs.toFixed(2)}`,
        `scramble="${result.scramble}"`
      ].join(" | ")
    );
  }
}

console.log("\nSummary by scramble length");
console.log("length | solved/trials | avg ms | avg nodes | max ms");

for (const length of LENGTHS) {
  const group = results.filter((result) => result.length === length);
  const solved = group.filter((result) => result.status === "solved");
  const average = (values) =>
    values.length
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : 0;

  console.log(
    [
      String(length).padStart(6),
      `${solved.length}/${group.length}`.padStart(13),
      average(group.map((result) => result.elapsedMs)).toFixed(2).padStart(7),
      average(group.map((result) => result.nodes)).toFixed(0).padStart(10),
      Math.max(...group.map((result) => result.elapsedMs)).toFixed(2).padStart(7)
    ].join(" | ")
  );
}

console.log(
  `\nConfiguration: ${TRIALS_PER_LENGTH} trials/length, ` +
  `maxDepth=${MAX_DEPTH}, maxNodes=${MAX_NODES} per case. ` +
  "Results are reproducible for this code version and Node runtime."
);
