import { performance } from "node:perf_hooks";
import {
  generateScramble as generateRandomStateScramble
} from "@cubesmith/scrambler";
import { applyMoves } from "../src/puzzles/444/moves.js";
import { isSolved, solvedState } from "../src/puzzles/444/state.js";
import { prepare444Scrambler } from "../src/puzzles/444/scramble.js";

const requestedSamples = Number(process.argv[2] ?? 30);
const warmupSamples = 5;

if (!Number.isSafeInteger(requestedSamples) || requestedSamples < 1) {
  console.error("Usage: npm run benchmark:444 -- [positive-sample-count]");
  process.exitCode = 1;
} else {
  const format = (value) => `${value.toFixed(1)} ms`;

  const summarize = (values) => {
    const sorted = [...values].sort((a, b) => a - b);
    const percentile = (fraction) =>
      sorted[Math.min(sorted.length - 1, Math.ceil(fraction * sorted.length) - 1)];
    const total = values.reduce((sum, value) => sum + value, 0);

    return {
      min: sorted[0],
      median: percentile(0.5),
      p95: percentile(0.95),
      max: sorted[sorted.length - 1],
      mean: total / values.length
    };
  };

  const printSummary = (label, values) => {
    const summary = summarize(values);
    console.log(`\n${label} (${values.length} samples)`);
    console.log(`  Min:    ${format(summary.min)}`);
    console.log(`  Median: ${format(summary.median)}`);
    console.log(`  P95:    ${format(summary.p95)}`);
    console.log(`  Max:    ${format(summary.max)}`);
    console.log(`  Mean:   ${format(summary.mean)}`);
  };

  console.log("Preparing 4×4 solver tables (excluded from timings)...");
  const preparationStart = performance.now();
  await prepare444Scrambler();
  const preparationMs = performance.now() - preparationStart;

  // Warm up the backend and local replay path; do not include these in results.
  for (let index = 0; index < warmupSamples; index++) {
    const result = await generateRandomStateScramble("444", {
      seed: `benchmark-warmup-${index}`
    });
    const moves = result.moves.trim().split(/\\s+/);
    const state = applyMoves(solvedState(), moves);

    if (isSolved(state)) {
      throw new Error("The backend returned a solved scramble during warm-up");
    }
  }

  const backendTimings = [];
  const replayTimings = [];
  const combinedTimings = [];

  for (let index = 0; index < requestedSamples; index++) {
    const backendStart = performance.now();
    const result = await generateRandomStateScramble("444", {
      seed: `benchmark-${index}`
    });
    const backendMs = performance.now() - backendStart;

    const replayStart = performance.now();
    const notation = result.moves.trim();
    const moves = notation.split(/\\s+/);
    const state = applyMoves(solvedState(), moves);

    if (isSolved(state)) {
      throw new Error("The backend returned a solved scramble state");
    }
    const replayMs = performance.now() - replayStart;

    backendTimings.push(backendMs);
    replayTimings.push(replayMs);
    combinedTimings.push(backendMs + replayMs);
  }

  console.log(`Samples: ${requestedSamples}`);
  console.log(`Warm-up samples (excluded): ${warmupSamples}`);
  console.log(`Preparation (reported separately): ${format(preparationMs)}`);
  printSummary("Backend generation", backendTimings);
  printSummary("Local parse + replay + validation", replayTimings);
  printSummary("Combined measured work (backend + replay)", combinedTimings);
}
