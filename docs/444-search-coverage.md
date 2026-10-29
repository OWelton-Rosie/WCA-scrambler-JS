# 4×4 search coverage and reachability notes

## Reproducible end-to-end benchmark

Run:

```sh
npm run benchmark:444:pipeline -- [samples-per-family] [scramble-length]
```

Defaults are three samples in each of three move families, with eight moves per scramble. The benchmark uses fixed linear-congruential seeds and records the exact scramble, elapsed time, solve/failure outcome, failure stage, node counts, wing macro depth, parity steps, and solution length. Every successful result is independently replayed against the facelet move model.

The move families are:

- `outer`: outer face turns only.
- `outer+wide`: outer and wide turns.
- `all-layer`: outer, wide, and inner-layer turns.

This is a diagnostic benchmark, not a random-state sampler and not a statistical claim about all legal states. Increase sample count or scramble length only when there is enough time to tolerate bounded-search failures and expensive centre searches. Compare results only with the same seed policy, budgets, code revision, and runtime environment.

## What a failure means

The benchmark records the stage named by `solve444Bounded`:

- `centre`: centre IDA* did not find a solution within its depth/node budget.
- `wing-pairing`: beam search and IDA exhausted their bounded macro searches.
- `parity`: no applicable verified parity repair was found within the configured limit.
- `reduced 3x3`: reduced-state conversion or the final solver/replay failed.

A failure at one of these stages is evidence of a limitation in the current pipeline. It is **not** evidence that the input state is unreachable.

## Reachability evidence and limits

The legal-state corpus constructs states by applying supported legal moves to the solved state, then checks:

- exactly 16 stickers of each face colour;
- expected geometric counts of corners, centres, and wings;
- a legal corner permutation and corner-orientation sum;
- four centres of each colour;
- exactly two wings for each edge-colour signature;
- exact restoration after applying the inverse move sequence.

These are useful representation and coordinate invariants. They do **not**, individually or together, constitute a complete characterization of every reachable 4×4 facelet state. In particular, `isValidState` checks sticker counts only. Do not treat a state passing that check as proven reachable.

The solver currently has no complete arbitrary-state reachability classifier. A defensible completeness claim needs a proved joint coordinate model that accounts for indistinguishable centre and wing pieces, all move-induced parity relationships, and the exact facelet representation. Until that exists, classify states as:
- **constructed legal**: obtained by replaying a sequence of supported legal moves;
- **representation-valid**: sticker counts and colours pass `isValidState`;
- **search-solved**: the pipeline returned a solution that passes full facelet replay;
- **budget-exhausted / unsupported**: a stage failed to find a verified solution within its current search limits.

Do not relabel the last category as impossible or unsolvable.
