# 4×4 performance experiments

These scripts are experiments, not production solver changes.

## Compare backends

Install the alternative backend without adding it to the project's declared dependencies:

```bash
npm install --no-save cubing
node scripts/benchmark-444-backends.js 100 3
```

The arguments are samples per backend per round and the number of rounds. The script prepares CubeSmith once, reports first-generation latency separately, warms both backends, then alternates which backend runs first in each round. It reports per-round and aggregate min/median/p95/mean/max.

Every generated scramble is replayed through this repository's independent 4×4 move/state model. The check rejects empty output, unsupported move notation, invalid sticker counts, and solved results. Validation is outside the timed interval. This is a useful correctness smoke test, **not** a proof of random-state uniformity or solver totality.

### Compliance caveat

The current `cubing.js` scramble documentation says its generators produce random states where required, including 4×4, but also explicitly says scramble filtering is not implemented yet. The current WCA Regulation 4b3 requires equal-probability states that need at least two moves to solve. Until that filtering requirement is implemented and verified, `cubing.js` is a performance comparison candidate, not a formally compliant replacement. Neither this project nor this benchmark is an official WCA scramble program; competition scrambles must come from a current official WCA scramble program.

CubeSmith's 4×4 design document describes uniform random-state sampling and rejection of solved/one-move states, with an empirical solver-totality checkpoint still listed as open. That is a stronger documented conformance argument, but the open solver-totality evidence remains a limitation worth tracking.

Run the benchmark several times on the same machine, Node version, and power conditions. Compare aggregate medians and tail latency, not a single sample. `cubing.js` may emit per-scramble timing messages from its worker; those messages are produced outside the main thread, so replacing the main thread's `console.log` does not suppress them.

## Test a centre-subset ranking optimization

```bash
node scripts/benchmark-444-rank.js
```

This compares the existing set-bit loop with a byte-lookup candidate. It exhaustively checks every 8-of-24 and 12-of-24 subset before reporting a microbenchmark. A microbenchmark speedup is only a reason to try the change in the complete solver; it is not evidence that end-to-end scramble generation improves.

The byte-lookup approach has not been integrated into the production backend. The implementation lives in the external CubeSmith package, so a production optimization needs to be tested in that solver (ideally upstream) and benchmarked end to end before adoption.
