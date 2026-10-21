# 4×4 Generation Performance

## What the timings mean

The 4×4 generator delegates random-state sampling and solving to `@cubesmith/scrambler`. That backend is the main generation cost. This project also replays the returned moves through its own 96-facelet state model as an independent consistency check; that replay has previously been measured as negligible compared with the backend.

There are two distinct costs:

1. **Preparation / cold start:** the backend builds and caches pruning or solver tables. This may take several seconds and should be measured separately.
2. **Warm generation:** sampling and solving one state after preparation. This is the useful metric when comparing optimizations to per-scramble latency.

The browser demo calls `prepare444Scrambler()` before timing the first 4×4 scramble. Library consumers who care about first-use responsiveness can do the same during an idle/loading phase. Preparation is optional; `generate("444")` remains callable directly.

## Benchmark

Run the warm-generation benchmark from the repository root:

```bash
npm run benchmark:444
```

It prepares the backend before taking measurements, generates a sequence of scrambles with distinct seeds, and reports median, 95th percentile, minimum and maximum generation times. An optional positive integer argument controls the number of samples:

```bash
npm run benchmark:444 -- 30
```

For meaningful comparisons, use the same machine, Node.js version, sample count and power conditions. Run the benchmark more than once and compare medians rather than a single result. The benchmark intentionally excludes preparation time and does not alter the generator's output.

## Optimization priorities

1. **Measure before changing algorithms.** Keep warm backend latency separate from preparation and local replay.
2. **Avoid repeated preparation.** The backend caches prepared data; the demo shares a preparation promise so concurrent requests do not trigger duplicate work.
3. **Preserve state-quality guarantees.** Do not replace the random-state backend with a random walk merely to improve speed; that would change the generation method and its guarantees.
4. **Investigate backend internals before duplicating them.** Table generation, memory use and solver phases are likely to dominate. Any backend replacement or cache change needs correctness tests, reproducibility checks and licensing review.
5. **Keep diagnostic output opt-in.** The library should not write timing data to the console for every generated scramble; benchmark scripts can report measurements without adding production noise.

This document describes engineering priorities, not a claim of formal WCA compliance or a benchmark guarantee across machines.
