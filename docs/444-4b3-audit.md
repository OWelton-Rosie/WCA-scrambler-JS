# 4×4×4 Regulation 4b3 conformance audit

**Status: NOT COMPLIANT — experimental implementation only.**

This document is an acceptance gate, not a claim of compliance. Regulation 4b3 requires a random state sampled with equal probability from eligible states requiring at least two moves to solve. The exception allowing sufficiently many random moves instead of a random state applies to 5×5×5 and larger cubes and Megaminx, not 4×4×4. See the [current WCA Regulations, Article 4b3](https://www.worldcubeassociation.org/regulations/).

## Current implementation: blockers

- `src/puzzles/444/random.js` generates a fixed-length random walk from solved. Its output distribution is a distribution over move sequences, not a uniform distribution over legal 4×4 states.
- `src/puzzles/444/scramble.js` exposes that walk as an explicitly interim, non-random-state generator.
- The centre search is bounded and does not solve arbitrary centre arrangements.
- There is no complete arbitrary-state wing-pairing/reduction procedure that resolves all 4×4 parity cases.
- A valid facelet colour count is not proof that a state is reachable.
- Existing replay tests show that moves reproduce a state; they do not establish uniform sampling.

**Therefore the 4×4 walk must not be registered as a 4×4 competition scramble generator, and the project must not claim 4×4 Regulation 4b3 compliance.** Keeping it out of the public event registry is intentional until the acceptance criteria below are met.

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
