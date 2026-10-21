# 4×4 performance experiments

These scripts are experiments, not production solver changes.

## Compare backends

Install the alternative backend without adding it to the project's declared dependencies:

```bash
npm install --no-save cubing
node scripts/benchmark-444-backends.js 50
```

The benchmark reports preparation separately when an explicit preparation API exists, first-generation latency, and warm-generation min/median/p95/mean/max. It checks that each backend returns non-empty notation, but does not prove WCA conformance or scramble-state uniformity. The cubing.js documentation currently notes that scramble filtering is not implemented, so performance alone is not enough to justify replacing a backend.

Run both backends on the same machine, Node version, and power conditions. Repeat the command several times; compare medians and tail latency, not a single sample.

## Test a centre-subset ranking optimization

```bash
node scripts/benchmark-444-rank.js
```

This compares the existing set-bit loop with a byte-lookup candidate. It exhaustively checks every 8-of-24 and 12-of-24 subset before reporting a microbenchmark. A microbenchmark speedup is only a reason to try the change in the complete solver; it is not evidence that end-to-end scramble generation improves.
