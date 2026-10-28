# Native 4×4 joint-state sampling: coordinate construction prototype

## Purpose

This work makes the native state representation explicit and testable before claiming legal reachability or uniform random-state generation.

## Coordinates implemented so far

- **Corners:** a permutation of eight corner identities and seven independent twist values; the final twist makes the twist sum zero modulo three.
- **Centres:** a uniformly shuffled multiset containing four each of U, R, F, D, L and B.
- **Wings:** a permutation of 24 labelled wing identities. The identity-to-slot sticker mapping is derived by propagating solved wing identities through this repository's geometric facelet move permutations. No independent wing-orientation bits are sampled.
- **Centre-axis abstraction:** for each opposite-colour pair (UD, FB, LR), an 8-of-24 mask records which centre slots contain either colour in that pair. Its coordinate space has C(24,8) = 735,471 values, and the outer/wide move transitions are derived from the facelet move permutations.

The wing mapping fails loudly if two legal move paths place the same labelled wing in the same slot with different sticker assignments. Centre-axis tests verify that the abstract transitions agree exactly with the facelet model for each supported outer/wide move and long move sequences.

## What the tests establish

The tests check sticker counts, corner and centre round trips, valid wing-pair counts, preservation of unrelated facelets, and exact projection of centre-axis moves. They validate the representation and transitions, not full reachability of arbitrary combined states.

## What remains unproven

This is **not** a production random-state sampler or solver. We have not yet proved that every independently sampled combined state is reachable, nor that every reachable physical state has equal probability. The centre-axis abstraction is the first building block for an exact distance table and a centre-reduction search; it is not itself a solver.

The next milestone is to build and verify the exact centre-axis pruning tables, then use them in a bounded/iterative-deepening search. Only after the full reduction pipeline and solver verification work should the production generator change or either dependency be removed.
