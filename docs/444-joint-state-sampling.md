# Native 4×4 joint-state sampling: coordinate construction prototype

## Purpose

This work makes the native state representation explicit and testable before claiming legal reachability or uniform random-state generation.

## Coordinates and reduction research implemented so far

- **Corners:** a permutation of eight corner identities and seven independent twist values; the final twist makes the twist sum zero modulo three.
- **Centres:** a uniformly shuffled multiset containing four each of U, R, F, D, L and B.
- **Wings:** a permutation of 24 labelled wing identities. The identity-to-slot sticker mapping is derived by propagating solved wing identities through this repository's geometric facelet move permutations. No independent wing-orientation bits are sampled.
- **Centre-axis abstraction:** for each opposite-colour pair (UD, FB, LR), an 8-of-24 mask records which centre slots contain either colour in that pair. Its coordinate space has C(24,8) = 735,471 values.
- **Centre-colour abstraction:** for each colour, a 4-of-24 mask records the four centre positions carrying that colour. There are C(24,4) = 10,626 masks, ranked compactly by a colex combinatorial number system.
- **Exact centre pattern databases:** BFS builds exact single-coordinate distances using both outer and wide turns derived from the repository's facelet permutations. The tests verify full coverage of all 10,626 masks for each colour.
- **Bounded full-centre search:** IDA* combines the six exact single-colour distances with a maximum heuristic and searches outer/wide turns. It verifies its returned sequence against the full 96-facelet state. Depth/node limits are explicit, so search exhaustion is not described as proof of unsolvability.
- **Wing-pairing diagnostics:** a helper counts geometric edge slots whose two wings share a colour-pair signature. This is a diagnostic only; it does not prove that every wing sticker is aligned to the correct face.
- **Centre-neutral commutator discovery:** the move model searches four- and six-move commutators, first checking centre permutations and then replaying candidates. It retains only macros that preserve solved centre colours while changing wing stickers, deduplicates equivalent 24-wing permutations, and records their paired-edge count.
- **Single-pair pattern databases:** each of the 12 edge-colour pairs has a two-wing-position coordinate with 276 possible unordered slot pairs. BFS computes exact distances over the discovered centre-neutral macro permutations; unreachable pair coordinates remain marked as unvisited.
- **Bounded pairing search:** one-step improvement and a beam-search prototype try macros and their inverses. The beam search ranks candidates using the maximum single-pair distance when the state lies in the discovered macro orbit, and otherwise falls back to paired-edge count. It reports depth in macros separately from primitive move count and returns an explicit unsolved result when its budget is exhausted.

The wing mapping fails loudly if two legal move paths place the same labelled wing in the same slot with different sticker assignments. Coordinate tests compare abstract transitions with the facelet move model and verify reachable-state coverage.

## What the tests establish

The tests check sticker counts, corner and centre round trips, valid wing-pair counts, preservation of unrelated facelets, centre-axis projection, combinatorial ranking, full coverage of each single-colour coordinate, a short end-to-end centre reduction, wing-pair pattern distances, and centre-neutral macro invariants.

These validate the representation and pruning coordinates. They do not prove full reachability of arbitrary combined states or establish a complete 4×4 solver.

## What remains unproven

This is **not** a production random-state sampler or solver. We have not yet proved that every independently sampled combined state is reachable, nor that every reachable physical state has equal probability. Full centre solving is still a bounded search prototype; arbitrary-state search performance and completeness need further work. The discovered centre-neutral commutators and pair pattern databases have not been shown to connect every required multi-pair state. The pairing search is bounded and incomplete. Parity handling, the 3×3 hand-off, end-to-end replay and sampling uniformity remain open.

The production generator and dependencies remain unchanged until the full reduction pipeline, end-to-end replay and sampling distribution are verified.
