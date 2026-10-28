# Native 4x4 random-state implementation plan

## Objective

Replace the runtime `@cubesmith/scrambler` dependency with a locally maintained 4x4 random-state generator and solver. Do not introduce `cubing.js` as a dependency or fallback. Preserve the current public API and the independent 96-facelet move model.

This is an engineering plan, not a compliance claim. Until the implementation and its evidence pass the gates below, the existing backend remains the production path.

## Non-negotiable requirements

- Generate a uniformly random legal 4x4 state, not a random walk or a random-looking move sequence.
- Produce a move sequence that reaches that exact state.
- Handle centres, all 24 wings, corners, and reduction parity.
- Enforce the Regulation 4b3 minimum-distance requirement (at least two moves from solved, with no 4x4 exception).
- Use cryptographically secure random draws by default and unbiased bounded-integer sampling.
- Verify every generated sequence by replaying it through the independent facelet model.
- Keep deterministic seeds/test hooks separate from the default random source.
- Do not claim formal WCA approval; algorithmic conformance and authorisation as an official competition program are different questions.

## Intended architecture

### 1. Independent state model

Keep `src/puzzles/444/state.js` and `moves.js` as the independent facelet oracle. Add a piece-coordinate model for:

- corner permutation and orientation;
- 24 distinguishable wing pieces;
- 24 centre stickers with four indistinguishable centres per colour.

The piece model must round-trip to the facelet model. Move tables should be generated once and cached, not rebuilt during every search node.

### 2. Uniform sampler

Sample each independent coordinate with an unbiased permutation/orientation sampler, applying the proven 4x4 reachability constraints and accounting for whole-cube orientation. Do not use a random walk as the production sampler.

Before integrating the solver, validate the sampler separately:
- exhaustive checks for small coordinate spaces;
- invariant and round-trip tests against the facelet oracle;
- independent calculations of coordinate cardinalities;
- seeded reproducibility tests;
- statistical smoke tests (useful for detecting bugs, not a proof of uniformity).

Any assumed state-space factorisation or parity rule must be demonstrated by derivation or independent enumeration, not merely copied into a comment.

### 3. Reduction solver

Implement a local reduction pipeline with explicit stages and verified boundaries:

1. solve centres;
2. pair wings without disturbing solved centres (or use generators that restore them);
3. reduce the state to a valid 3x3;
4. solve the reduced 3x3;
5. repair 4x4 parity using derived, tested move sequences;
6. concatenate and simplify the solution, then invert it to obtain scramble notation.

The existing bounded centre search is a prototype only; it must not be treated as a complete solver. Every stage must either return a verified result or fail explicitly. No silent fallback to random moves is permitted.

### 4. Performance

Use the existing benchmark harness to measure:
- cold initialisation separately from warm generation;
- median, p95, mean and maximum generation latency;
- time per solver stage and nodes expanded;
- memory used by coordinate/pruning tables.

Prioritise compact coordinates, precomputed move tables, admissible pruning bounds, symmetry reduction, and typed arrays where benchmarks show a benefit. Keep optimisation changes behind correctness tests and compare against a fixed corpus of seeded states.

## Acceptance gates

The dependency may be removed only when all gates pass:

1. **Correct state model:** piece/facelet round-trips and legal-state invariants pass.
2. **Sampler:** distribution follows from a documented proof; statistical tests are supplemental.
3. **Solver completeness:** no arbitrary search-depth/node cutoff can turn a legal sampled state into an unsupported failure. If an operational guard exists, it must be explicit and not be described as completeness.
4. **Replay:** every scramble reproduces the sampled target exactly in the independent facelet model.
5. **4b3 floor:** solved and every one-move state are excluded by a correct state-distance criterion, not by notation heuristics.
6. **Stress tests:** large seeded runs include adversarial parity and coordinate cases, with zero incorrect outputs.
7. **Performance:** benchmark against the current baseline on the same machine/runtime; publish both cold-start and warm results.
8. **Dependency audit:** no runtime, dev, optional, benchmark, or lockfile reference to `@cubesmith/scrambler` or `cubing`; CI fails if forbidden imports/dependencies return.
9. **Documentation:** clearly distinguish algorithmic evidence from official WCA-program status.

## Migration policy

Keep the existing generator behind the current API until the native implementation passes the gates. Do not switch to the current random-walk prototype merely to make the dependency tree look clean. When the native backend is ready, change the API implementation, tests, benchmarks, lockfile, and docs together in a reviewable migration.

## Current starting point

The repository already has a 96-facelet state model, cached move permutations, a random-walk prototype, and a bounded centre-search prototype. The production 4x4 path still delegates to `@cubesmith/scrambler`; the local prototypes are not substitutes for a uniform sampler plus a complete solver.
