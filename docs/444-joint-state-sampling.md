# Native 4×4 joint-state sampling: coordinate construction prototype

## Purpose

This work makes the native state representation explicit and testable before claiming legal reachability or uniform random-state generation.

## Coordinates implemented so far

- **Corners:** a permutation of eight corner identities and seven independent twist values; the final twist makes the twist sum zero modulo three.
- **Centres:** a uniformly shuffled multiset containing four each of U, R, F, D, L and B.
- **Wings:** a permutation of 24 labelled wing identities. The identity-to-slot sticker mapping is derived by propagating solved wing identities through this repository's geometric facelet move permutations. No independent wing-orientation bits are sampled.
- **Centre-axis abstraction:** for each opposite-colour pair (UD, FB, LR), an 8-of-24 mask records which centre slots contain either colour in that pair. Its coordinate space has C(24,8) = 735,471 values.
- **Centre-colour abstraction:** for each of the six colours, a 4-of-24 mask records the four centre positions carrying that colour. Its coordinate space has C(24,4) = 10,626 values. A combinatorial colex rank maps each mask to a compact table index.
- **Exact pattern databases:** BFS builds exact single-coordinate distances using the repository's own wide-turn permutations. The centre-colour tables verify coverage of all 10,626 masks for each colour and use a compact byte per ranked coordinate.
- **Bounded full-centre search:** IDA* combines the six exact single-colour distances with a maximum heuristic and searches wide turns. It verifies its returned sequence against the full 96-facelet state. Depth/node limits are explicit, so search exhaustion is not described as proof of unsolvability.

The wing mapping fails loudly if two legal move paths place the same labelled wing in the same slot with different sticker assignments. Centre-axis and centre-colour tests compare abstract transitions with the facelet move model and verify full coordinate coverage.

## What the tests establish

The tests check sticker counts, corner and centre round trips, valid wing-pair counts, preservation of unrelated facelets, centre-axis projection, combinatorial ranking, full coverage of the single-colour coordinate spaces, and a short end-to-end centre reduction.

These validate the representation and pruning coordinates. They do not prove full reachability of arbitrary combined states or establish a complete 4×4 solver.

## What remains unproven

This is **not** a production random-state sampler or solver. We have not yet proved that every independently sampled combined state is reachable, nor that every reachable physical state has equal probability. Full centre solving is still a bounded search prototype; arbitrary-state search performance and completeness need further work. Wing pairing, parity handling, the 3×3 hand-off, end-to-end replay and sampling uniformity remain open.

The production generator and dependencies remain unchanged until the full reduction pipeline, end-to-end replay and sampling distribution are verified.
