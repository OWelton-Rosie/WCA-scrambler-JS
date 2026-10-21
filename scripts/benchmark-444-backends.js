import { performance } from "node:perf_hooks";
import {
  generateScramble as generateCubesmithScramble,
  prepareEvent,
} from "@cubesmith/scrambler";
import { applyMoves } from "../src/puzzles/444/moves.js";
import {
  assertValidState,
  isSolved,
  solvedState,
} from "../src/puzzles/444/state.js";

const sampleCount = Number(process.argv[2] ?? 100);
const roundCount = Number(process.argv[3] ?? 3);
const warmupCount = 5;

if (
  !Number.isSafeInteger(sampleCount) || sampleCount < 1 ||
  !Number.isSafeInteger(roundCount) || roundCount < 1
) {
  console.error(
    "Usage: node scripts/benchmark-444-backends.js [samples-per-backend-per-round] [rounds]",
  );
  process.exit(1);
}

/**
 * Replay the generated notation with this project's independent 4x4 model.
 * This catches invalid notation, malformed states, and solved outputs. It does
 * not prove random-state uniformity or full WCA conformance.
 */
function validateScramble(label, notation) {
  if (typeof notation !== "string" || notation.trim().length === 0) {
    throw new Error(`${label} returned an empty or non-string scramble`);
  }

  const moves = notation.trim().split(/\s+/);
  const state = applyMoves(solvedState(), moves);
  assertValidState(state);

  if (isSolved(state)) {
    throw new Error(`${label} returned a scramble that leaves the puzzle solved`);
  }

  return moves.length;
}

function summarize(label, values) {
  const sorted = [...values].sort((a, b) => a - b);
  const percentile = (p) =>
    sorted[Math.min(sorted.length - 1, Math.ceil(p * sorted.length) - 1)];
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

  console.log(
    `  ${label}: min ${sorted[0].toFixed(1)} ms | median ${percentile(0.5).toFixed(1)} ms | p95 ${percentile(0.95).toFixed(1)} ms | mean ${mean.toFixed(1)} ms | max ${sorted.at(-1).toFixed(1)} ms`,
  );
}

async function measureFirstGeneration(backend) {
  const started = performance.now();
  const notation = await backend.generate();
  const elapsed = performance.now() - started;
  validateScramble(backend.name, notation);
  backend.firstGenerationMs = elapsed;
}

async function warmUp(backend) {
  for (let index = 0; index < warmupCount; index += 1) {
    validateScramble(backend.name, await backend.generate());
  }
}

async function measureRound(backend) {
  const started = performance.now();
  const notation = await backend.generate();
  const elapsed = performance.now() - started;

  // Keep validation outside the timed interval so both backends measure
  // generation latency, not the cost of replaying through our local model.
  validateScramble(backend.name, notation);
  backend.samples.push(elapsed);
  backend.roundSamples.at(-1).push(elapsed);
}

console.log("Comparing warm 4×4 scramble generation on the same machine and Node version.");
console.log("Every generated sample is replayed and checked with this project's local 4×4 model.");
console.log("cubing.js is optional; install it with npm install --no-save cubing.");
console.log(`Samples: ${sampleCount} per backend per round; rounds: ${roundCount}; warm-up: ${warmupCount} per backend.`);

const cubesmith = {
  name: "@cubesmith/scrambler",
  generate: async () => (await generateCubesmithScramble("444")).moves,
  prepare: () => prepareEvent("444"),
  samples: [],
  roundSamples: [],
};
let cubingScramble;
try {
  ({ randomScrambleForEvent: cubingScramble } = await import("cubing/scramble"));
} catch (error) {
  console.error("\nCould not load cubing/scramble. Run npm install --no-save cubing and retry.");
  throw error;
}

const cubing = {
  name: "cubing.js",
  generate: async () => (await cubingScramble("444")).toString(),
  samples: [],
  roundSamples: [],
};

const backends = [cubesmith, cubing];

const preparationStarted = performance.now();
await cubesmith.prepare();
cubesmith.preparationMs = performance.now() - preparationStarted;

// Capture cold/first-call costs separately, then warm both backends before
// comparing steady-state calls. The backend order alternates each round to
// reduce systematic bias from one backend always running first.
for (const backend of backends) {
  await measureFirstGeneration(backend);
  await warmUp(backend);
}

for (let round = 0; round < roundCount; round += 1) {
  for (const backend of backends) backend.roundSamples.push([]);

  const order = round % 2 === 0 ? backends : [...backends].reverse();
  for (const backend of order) {
    for (let sample = 0; sample < sampleCount; sample += 1) {
      await measureRound(backend);
    }
  }

  console.log(`\nRound ${round + 1}`);
  for (const backend of backends) {
    summarize(backend.name, backend.roundSamples[round]);
  }
}

console.log("\nStartup");
console.log(`  @cubesmith/scrambler preparation: ${cubesmith.preparationMs.toFixed(1)} ms (separate from generation)`);
for (const backend of backends) {
  console.log(`  ${backend.name} first generation: ${backend.firstGenerationMs.toFixed(1)} ms`);
}

console.log(`\nAggregate warm results (${sampleCount * roundCount} samples per backend)`);
for (const backend of backends) {
  summarize(backend.name, backend.samples);
}

console.log("\nValidation passed: all measured scrambles parsed, replayed to valid 96-sticker states, and were not solved.");
console.log("This does not establish random-state uniformity, solver totality, or WCA conformance.");
