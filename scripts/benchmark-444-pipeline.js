import { performance } from "node:perf_hooks";
import { applyMoves, MOVE_NAMES } from "../src/puzzles/444/moves.js";
import { isSolved, solvedState } from "../src/puzzles/444/state.js";
import { solve444Bounded } from "../src/puzzles/444/solve-bounded.js";

const samplesPerFamily = Number(process.argv[2] ?? 3);
const scrambleLength = Number(process.argv[3] ?? 8);

if (!Number.isSafeInteger(samplesPerFamily) || samplesPerFamily < 1 ||
    !Number.isSafeInteger(scrambleLength) || scrambleLength < 1) {
  console.error("Usage: node scripts/benchmark-444-pipeline.js [samples-per-family] [scramble-length]");
  process.exitCode = 1;
} else {
  const families = [
    { name: "outer", moves: MOVE_NAMES.filter((move) => !move.startsWith("2") && !move.includes("w")) },
    { name: "outer+wide", moves: MOVE_NAMES.filter((move) => !move.startsWith("2")) },
    { name: "all-layer", moves: [...MOVE_NAMES] }
  ];

  function seededRandom(seed) {
    let state = seed >>> 0;
    return () => {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      return state / 0x1_0000_0000;
    };
  }

  function makeScramble(pool, seed, length) {
    const random = seededRandom(seed);
    const result = [];
    let previousFace = null;

    while (result.length < length) {
      const move = pool[Math.floor(random() * pool.length)];
      const face = move.startsWith("2") ? move[1] : move[0];
      if (face === previousFace) continue;
      result.push(move);
      previousFace = face;
    }
    return result;
  }

  function stageFromError(error) {
    const message = String(error?.message ?? error);
    const match = message.match(/4x4 (centre|wing-pairing|parity|reduced 3x3) stage failed/i);
    return match?.[1] ?? "unknown";
  }

  const records = [];
  let sampleIndex = 0;

  for (const family of families) {
    for (let index = 0; index < samplesPerFamily; index++) {
      const scramble = makeScramble(
        family.moves,
        0x4d595df4 + sampleIndex * 0x9e3779b9,
        scrambleLength
      );
      const input = applyMoves(solvedState(), scramble);
      const start = performance.now();

      try {
        const result = await solve444Bounded(input);
        const elapsedMs = performance.now() - start;
        const replayValid = isSolved(applyMoves(input, result.moves));
        if (!result.solved || !replayValid || !isSolved(result.state)) {
          throw new Error("solver returned an invalid final replay");
        }

        records.push({
          sample: sampleIndex,
          family: family.name,
          scramble,
          outcome: "solved",
          stage: "complete",
          elapsedMs: Number(elapsedMs.toFixed(2)),
          centreNodes: result.stages.centres.nodesVisited,
          wingBeamNodes: result.stages.wings.beamNodesVisited,
          wingNodes: result.stages.wings.nodesVisited,
          wingDepth: result.stages.wings.macroDepth,
          paritySteps: result.stages.parity.steps,
          solutionMoves: result.moves.length
        });
      } catch (error) {
        records.push({
          sample: sampleIndex,
          family: family.name,
          scramble,
          outcome: "failed",
          stage: stageFromError(error),
          elapsedMs: Number((performance.now() - start).toFixed(2)),
          error: String(error?.message ?? error)
        });
      }
      sampleIndex++;
    }
  }

  const totals = new Map();
  for (const record of records) {
    const key = `${record.family}:${record.outcome === "solved" ? "solved" : record.stage}`;
    totals.set(key, (totals.get(key) ?? 0) + 1);
  }

  console.log(JSON.stringify({
    benchmark: "bounded-4x4-pipeline",
    seedPolicy: "fixed LCG seeds; reproducible for identical code and runtime",
    samplesPerFamily,
    scrambleLength,
    total: records.length,
    outcomes: Object.fromEntries(totals),
    records
  }, null, 2));
}
