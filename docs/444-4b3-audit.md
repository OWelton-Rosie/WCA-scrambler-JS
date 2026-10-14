# 4×4×4 Regulation 4b3 conformance audit

**Status: public API enabled through an external JavaScript backend; independent compliance has not been established by this repository.**

Regulation 4b3 requires a random state sampled with equal probability from eligible states requiring at least two moves to solve. The random-moves exception does not include 4×4×4. See the [current WCA Regulations, Article 4b3](https://www.worldcubeassociation.org/regulations/).

## Current implementation

The public `generate("444")` path delegates random-state sampling and reduction solving to the pinned MIT-licensed [`@cubesmith/scrambler`](https://github.com/cubesmithjs/cubesmith-scrambler) package (version 0.14.1). Its pipeline handles centres, wing pairing, parity and a reduced 3×3 hand-off. It verifies its solution, and this repository replays the returned notation through its separate facelet move model.

The previous local prototype in `random.js` and `centre-solver.js` remains experimental. Its random walk is not a random-state sampler, and its bounded centre search is not a complete 4×4 solver. It is **not** used by the public `generate("444")` API.

This is a pragmatic working implementation, not an independent proof of the dependency's sampler or solver. The dependency's own design record documents its state-count derivation and reduction architecture; it also notes that broad empirical solver-totality testing remains open. The integration smoke test checks notation replay and the local facelet representation, but finite tests alone cannot prove uniformity.

**Do not use this project for official WCA competition scrambles.** Competition scrambles must be generated using a current official WCA scrambling program.

## Required architecture

A compliant implementation needs both halves of the pipeline:

1. **Uniform random-state sampler.** Sample from a mathematically defined representation of reachable 4×4 states, with every eligible state having equal probability. Account for corner permutation/orientation, the duplicated wing pieces and their orientation constraints, the four indistinguishable centres of each colour, and all cross-piece legality constraints. Random walks, long scrambles, or merely sampling each piece independently are not substitutes for this proof.
2. **State-to-scramble solver.** Produce a legal move sequence from solved to the sampled target (or solve the target and invert the solution). It must handle arbitrary sampled states, including centre arrangements, wing pairing, and both OLL- and PLL-type parity cases. Every output must be replayed through the move engine and compared with the exact sampled target.
3. **Eligibility rule.** Reject only states that fail the specified minimum-distance requirement, without introducing bias among the remaining states. For 4×4, the minimum is at least two moves to solve. The implementation must define which move metric is used and test the rule against the supported move set.
4. **Randomness.** Use unbiased bounded-integer sampling and a cryptographically backed default random source. Deterministic random sources are for tests only.

## Release acceptance checklist

- [ ] A written state-space derivation shows why the sampler is uniform over reachable 4×4 states.
- [ ] Piece-level sampling satisfies all 4×4 legality constraints, including parity relationships.
- [ ] The sampler's rejection/conditioning steps preserve uniformity.
- [ ] The solver handles arbitrary sampled states; no fixed-depth centre-search assumption.
- [ ] Every returned scramble replays from solved to the exact sampled target.
- [ ] Every sampled target passes a complete reachability validator, not just sticker counts.
- [ ] The solved state and every one-move state are excluded; the eligibility check does not bias the remaining state distribution.
- [ ] Tests cover deterministic random sources, malformed/unreachable states, centre and wing arrangements, both parity cases, solver failures, and replay verification.
- [ ] Benchmarks cover a large batch of generated targets and include solver timeouts/failures.
- [ ] The 4×4 generator is registered in the public API only after all preceding checks pass.
- [ ] Documentation describes what has been proven, what has only been tested, and what remains an assumption.

## Important distinction

Passing a finite test suite cannot by itself prove uniformity across the 4×4 state space. Compliance depends on the sampler's mathematical construction and its implementation matching that construction. This audit does not certify the project as an official WCA scrambling program; Regulation 4b separately requires official competition scrambles to come from a current official WCA scramble program.
