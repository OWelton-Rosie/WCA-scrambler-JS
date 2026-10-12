# 3×3 Scramble Uniformity Audit

**Status:** Implementation reviewed; mathematical assumptions documented. Not a formal certification of WCA compliance.

## Scope

This audit covers the random-state sampler used by the 3×3×3 (`333`) generator.

It considers bounded random-number generation, permutation sampling, piece orientations, permutation parity and the exclusion of specified states.

The 2×2×2 (`222`) implementation is outside the scope of this audit. Its state sampling and dedicated solver require a separate event-specific analysis before any equivalent uniformity claim can be made.

## 1. Bounded random integers

`src/core/random.js` uses rejection sampling in `randomInt()`.

For a requested range of size \(m\), it accepts only 32-bit unsigned words below

\[
L=\left\lfloor\frac{2^{32}}{m}\right\rfloor m.
\]

The accepted range contains exactly \(L\) values, which is divisible by \(m\). Consequently, every output from \(0\) to \(m-1\) has the same number of accepted inputs.

**Assumption:** The underlying random-word source produces independent, uniformly distributed 32-bit unsigned integers. The default source uses Web Crypto; an injected source is the caller's responsibility.

## 2. Permutations

`randomPermutation()` uses the Fisher–Yates shuffle. If each bounded integer choice is uniform, every permutation is equally likely.

For a permutation of \(n\) items, the algorithm makes choices from ranges \(n,n-1,\ldots,2\). Each possible sequence of choices corresponds to exactly one permutation.

## 3. Piece orientations

The sampler independently chooses seven corner orientations from \(\{0,1,2\}\), then calculates the eighth so the orientation sum is divisible by three.

It independently chooses eleven edge orientations from \(\{0,1\}\), then calculates the twelfth so the orientation sum is even.

Every valid corner-orientation assignment corresponds to exactly one sequence of the first seven choices. The same applies to the first eleven edge choices. Therefore, all assignments satisfying the respective orientation constraints have equal probability.

## 4. Permutation parity

A legal 3×3 state requires matching corner and edge permutation parity.

The sampler independently generates both permutations and rejects the pair when their parities differ. For uniform independent permutations, conditioning on matching parity gives equal probability to every permitted pair.

The rejection step can reduce efficiency, but does not introduce bias among accepted pairs.

## 5. Excluded states

The generator rejects 19 states: the solved state and the 18 states obtainable by a single face turn, including quarter turns, half turns and inverse quarter turns for each of the six faces.

The rejection step preserves equal probability among all legal states that remain eligible, assuming the input sampler is uniform.

Tests verify that these 19 states are distinct and rejected. They also check that a sample requiring at least two face turns is eligible.

## 6. State-space size

The number of legal 3×3 states under the usual fixed-centre model is

\[
\frac{8!\times 3^7\times 12!\times 2^{11}}{2}
=43,252,003,274,489,856,000.
\]

Excluding the 19 states above leaves

\[
43,252,003,274,489,855,981
\]

eligible states.

## 7. Verification and limitations

The automated tests check state legality, permutation and orientation constraints, parity, the excluded-state set, deterministic random sources, scramble replay and solver correctness. A small exhaustive test also verifies the six outcomes of a three-item Fisher–Yates shuffle.

These tests do not enumerate the full 3×3 state space or prove the behaviour of every possible random-word source. The uniformity conclusion is conditional on the mathematical argument and the implementation satisfying the stated assumptions.

This audit does not establish uniformity for the 2×2×2 implementation. That event requires its own analysis of the state representation, sampling procedure, supported move set and solver behaviour.

This project is not an official WCA scrambling program, and this audit does not certify compliance with WCA regulations.