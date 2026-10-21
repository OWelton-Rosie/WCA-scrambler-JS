import { performance } from "node:perf_hooks";
import { generate } from "../src/index.js";
import { prepare444Scrambler } from "../src/puzzles/444/scramble.js";

const requestedSamples = Number(process.argv[2] ?? 20);

if (!Number.isSafeInteger(requestedSamples) || requestedSamples < 1) {
  console.error("Usage: npm run benchmark:444 -- [positive-sample-count]");
  process.exitCode = 1;
} else {
  console.log("Preparing 4×4 solver tables (excluded from timings)...");
  const preparationStart = performance.now();
  await prepare444Scrambler();
  const preparationMs = performance.now() - preparationStart;

  const timings = [];

  for (let index = 0; index < requestedSamples; index++) {
    const startedAt = performance.now();
    await generate("444", { seed: `benchmark-${index}` });
    timings.push(performance.now() - startedAt);
  }

  timings.sort((a, b) => a - b);

  const percentile = (fraction) =>
    timings[Math.min(timings.length - 1, Math.ceil(fraction * timings.length) - 1)];

  const total = timings.reduce((sum, value) => sum + value, 0);
  const format = (value) => `${value.toFixed(1)} ms`;

  console.log(`Samples: ${timings.length}`);
  console.log(`Preparation (reported separately): ${format(preparationMs)}`);
  console.log(`Minimum: ${format(timings[0])}`);
  console.log(`Median: ${format(percentile(0.5))}`);
  console.log(`P95: ${format(percentile(0.95))}`);
  console.log(`Maximum: ${format(timings[timings.length - 1])}`);
  console.log(`Mean: ${format(total / timings.length)}`);
}
