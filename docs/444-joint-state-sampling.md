# Native 4×4 joint-state sampling: coordinate construction prototype

## Purpose

This work makes the native state representation explicit and testable before claiming legal reachability or uniform random-state generation.

## Coordinates implemented so far

- **Corners:** a permutation of eight corner identities and seven independent twist values; the final twist makes the twist sum zero modulo three.
- **Centres:** a uniformly shuffled multiset containing four each of U, R, F, D, L and B.
- **Wings:** a permutation of 24 labelled wing identities. The identity-to-slot sticker mapping is derived by propagating solved wing identities through this repository's geometric facelet move permutations. No independent wing-orientation bits are sampled.
- **Centre-axis abstraction:** for each opposite-colour pair (UD, FB, LR), an 8-of-24 mask records which centre slots contain either colour in that pair. Its coordinate space has C(24,8) = 735,471 values; outer/wide move transitions are derived from the facelet move permutations.
- **Exact centre-axis distance table:** a breadth-first search over the abstract move graph builds distances from the solved mask. The implementation uses compact 6-bit lookup tables for mask transitions and checks that the BFS reaches the full coordinate space.

The wing mapping fails loudly if two legal move paths place the same labelled wing in the same slot with different sticker assignments. Centre-axis tests verify that the abstract transitions agree exactly with the facelet model for each supported outer/wide move and long move sequences.

## What the tests establish

The tests check sticker counts, corner and centre round trips, valid wing-pair counts, preservation of unrelated facelets, exact projection of centre-axis moves, and full coverage of the UD centre-axis coordinate by BFS.

These validate the representation and one pruning coordinate. They do not prove full reachability of arbitrary combined states or establish a complete solver.

## What remains unproven

This is **not** a production random-state sampler or solver. We have not yet proved that every independently sampled combined state is reachable, nor that every reachable physical state has equal probability. The centre-axis table is a lower-bound component for a centre-reduction search; the remaining centre, wing-pairing, parity and 3×3 hand-off phases still need a complete implementation and verification.

The production generator and dependencies remain unchanged until the full reduction pipeline, end-to-end replay and sampling distribution are verified.
