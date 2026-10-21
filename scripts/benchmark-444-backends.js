import { performance } from "node:perf_hooks";
import {
  generateScramble as generateCubesmithScramble,
  prepareEvent,
} from "@cubesmith/scrambler";

const sampleCount = Number(process.argv[2] ?? 50);
const warmupCount = 5;

if (!Number.isSafeInteger(sampleCount) || sampleCount < 1) {
  console.error("Usage: node scripts/benchmark-444-backends.js [positive-sample-count]");
  process.exit(1);
}

function summarize(label, values) {
  const sorted = [...values].sort((a, b) => a - b);
  const percentile = (p) => sorted[Math.min(sorted.length - 1, Math.ceil(p * sorted.length) - 1)];
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  console.log(`  ${label}: min ${sorted[0].toFixed(1)} ms | median ${percentile(0.5).toFixed(1)} ms | p95 ${percentile(0.95).toFixed(1)} ms | mean ${mean.toFixed(1)} ms | max ${sorted.at(-1).toFixed(1)} ms`);
}

async function benchmark(label, generate, prepare) {
  let preparationMs = null;
  if (prepare) {
    const started = performance.now();
    await prepare();
    preparationMs = performance.now() - started;
  }

  const firstStarted = performance.now();
  const first = await generate();
  const firstMs = performance.now() - firstStarted;
  if (typeof first !== "string" || first.trim().length === 0) {
    throw new Error(`${label} returned an empty or non-string scramble`);
  }

  for (let index = 0; index < warmupCount; index += 1) await generate();

  const samples = [];
  for (let index = 0; index < sampleCount; index += 1) {
    const started = performance.now();
    const scramble = await generate();
    samples.push(performance.now() - started);
    if (typeof scramble !== "string" || scramble.trim().length === 0) {
      throw new Error(`${label} returned an empty or non-string scramble`);
    }
  }

  console.log(`\n${label}`);
  if (preparationMs !== null) console.log(`  preparation: ${preparationMs.toFixed(1)} ms (separate from generation)`);
  console.log(`  first generation: ${firstMs.toFixed(1)} ms (includes lazy startup not handled by prepare)`);
  summarize(`warm ${sampleCount} samples`, samples);
}

console.log("Comparing warm 4×4 scramble generation. Use the same machine and Node version.");
console.log("The cubing.js backend is optional; install it with npm install --no-save cubing.");

await benchmark(
  "@cubesmith/scrambler",
  async () => (await generateCubesmithScramble("444")).moves,
  () => prepareEvent("444"),
);

let cubingScramble;
try {
  ({ randomScrambleForEvent: cubingScramble } = await import("cubing/scramble"));
} catch (error) {
  console.error("\nCould not load cubing/scramble. Run npm install --no-save cubing and retry.");
  throw error;
}

// cubing.js emits per-scramble timing messages via console.log. Suppress those
// during measurements so terminal I/O does not inflate the measured latency.
async function generateCubingScramble() {
  const originalLog = console.log;
  console.log = () => {};
  try {
    return (await cubingScramble("444")).toString();
  } finally {
    console.log = originalLog;
  }
}

await benchmark("cubing.js", generateCubingScramble);
