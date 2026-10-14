# WCA-scrambler-JS

A JavaScript library for generating Rubik's Cube scrambles, with the long-term goal of supporting every World Cube Association (WCA) puzzle event.

**Status:** Early development. Currently supports 2×2×2 (`222`), 3×3×3 (`333`), Pyraminx (`pyram`) and 4×4×4 (`444`).

## Overview

This project generates scrambles by sampling eligible legal puzzle states and calculating move sequences that reach those states.

The implementation uses event-specific state representations and solving algorithms, with shared utilities for randomness and event registration. The 2×2×2 implementation uses a dedicated solver operating on corner permutations and orientations, while the 3×3×3 implementation uses `cubejs`.

The project is being developed with the WCA Regulations in mind, particularly Regulation 4b3, which specifies random-state requirements for scrambles.

The long-term goal is to provide a modular, reusable library with a shared core for randomness and event registration alongside individual implementations for each supported puzzle.

## WCA regulation status

### Regulation 4b3: Random-state requirements

The generators use random-state approaches designed to sample eligible puzzle states.

The 3×3×3 implementation samples legal states and rejects the solved state and the 18 states obtainable by a single face turn.

The 2×2×2 implementation samples corner permutations and orientations subject to its state constraints and uses a dedicated solver to generate scrambles in the supported move set.

Automated tests cover state legality, relevant permutation and orientation constraints, excluded states, scramble replay, solver verification and random-number generation. The exact checks vary by event.

### 4×4×4 status: enabled through a JavaScript backend

The public `generate("444")` API now uses the MIT-licensed [`@cubesmith/scrambler`](https://github.com/cubesmithjs/cubesmith-scrambler) package's random-state 4×4 implementation. It samples a legal state, uses a centres → wing-pairing → parity → 3×3 reduction pipeline, and verifies the solve before returning the scramble. We replay the returned notation through this project's independent 4×4 facelet move model and return that resulting state.

The original local random-walk and bounded centre-search code remains experimental and is **not** the public generator. This is a pragmatic working backend, not a claim that this repository has independently implemented or formally proved the 4×4 sampler. The backend's own design record documents its state-count derivation, solver approach and remaining empirical coverage work; review that record before relying on it.

For reproducible tests, `generate("444", { seed: "your-seed" })` accepts a seed. The custom `randomWord` injection used by the smaller local generators is intentionally not supported for 4×4: collapsing it to a 32-bit seed would not preserve the random-state distribution.

These tests do not constitute a formal proof of uniformity for every event or establish full compliance with the WCA's requirements. See [`docs/uniformity-audit.md`](docs/uniformity-audit.md) for the mathematical audit of the 3×3×3 sampler.

### Regulation 4b: Official competition use

**This project is not an official WCA scrambling program and is not approved for generating scrambles for official WCA competitions.**

Generating random states in accordance with Regulation 4b3 does not, by itself, satisfy Regulation 4b. Competition scrambles must be generated using a current official version of an official WCA scrambling program.

This project is intended for development, experimentation, learning and non-official use.

## Features

- Random-state scramble generation for 2×2×2 and 3×3×3, plus 4×4×4 through `@cubesmith/scrambler`.
- Cryptographically backed random-number generation using Web Crypto by default.
- Unbiased bounded integer sampling using rejection sampling.
- Fisher–Yates permutation shuffling.
- Puzzle-state legality checks and event-specific state constraints.
- Dedicated 2×2×2 solving implementation using corner permutation and orientation coordinates.
- Solver-backed 3×3×3 scramble generation using `cubejs`.
- 4×4×4 random-state generation using a reduction-based JavaScript backend, with replay through the local facelet model.
- Verification that generated scrambles reproduce their target states.
- Verification of solver solutions and sampled-state constraints.
- Exclusion of the solved state and all 18 single-face-turn states for 3×3×3.
- Injectable random sources for reproducible testing.
- Automated tests using Node.js's built-in test runner.
- Production builds using Vite.
- A browser-based demo for generating, viewing and copying scrambles.

## Installation

The project is under active development and is not yet published as a stable npm package.

Clone the repository and install its dependencies:

```bash
git clone https://github.com/OWelton-Rosie/WCA-scrambler-JS.git
cd WCA-scrambler-JS
npm install
```

## Usage

Generate a 3×3×3 scramble from the source code:

```javascript
import { generate } from "./src/index.js";

const scramble = await generate("333");

console.log(scramble.notation);
```

Generate a 2×2×2 scramble:

```javascript
import { generate } from "./src/index.js";

const scramble = await generate("222");

console.log(scramble.notation);
console.log(scramble.moves);
console.log(scramble.state);
```

Generate a 4×4×4 scramble through the JavaScript random-state backend:```javascriptimport { generate } from "./src/index.js";const scramble = await generate("444", { seed: "repeatable-test-seed" });console.log(scramble.notation);```The `generate()` function returns a promise that resolves to an object containing:

| Property | Description |
|---|---|
| `event` | Event identifier: `"222"`, `"333"`, `"pyram"` or `"444"` |
| `notation` | Scramble as a space-separated move sequence |
| `moves` | Scramble represented as an array of moves |
| `state` | Target puzzle state, represented using the state structure for the selected event |

The supported move notation is event-specific. The 2×2×2 generator uses the `U`, `R` and `F` face moves, including quarter turns, half turns and inverse quarter turns.

Only `222`, `333`, `pyram` and `444` are currently supported. Unsupported event identifiers throw a `RangeError`. The 4×4 backend accepts a `seed` option for reproducible tests; it does not accept the local `randomWord` injection.

The generator accepts an optional random-word source for testing. See [Reproducible testing](#reproducible-testing).

## Browser demo

The repository includes a browser-based demo, separate from the library source.

Start the development server from the project root:

```bash
npm run demo
```

Open the local URL printed by Vite in your browser.

The demo provides an interface for generating and viewing scrambles, copying notation and reviewing recent results within the current session.

The demo is a development tool, not an official WCA scrambling application.

## Reproducible testing

The generator accepts an optional `randomWord` function that returns unsigned 32-bit integers. This allows deterministic tests and reproducible debugging.

For example:

```javascript
import { generate } from "./src/index.js";

function seededRandomWord(seed) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6D2B79F5) >>> 0;

    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return (value ^ (value >>> 14)) >>> 0;
  };
}

const scramble = await generate("222", {
  randomWord: seededRandomWord(12345)
});

console.log(scramble.notation);
```

**This seeded source is intended for testing and reproducibility, not security or production randomness.** The default local generators use Web Crypto. The 4×4 backend uses its own seeded interface when `seed` is provided.

## Development

Run the automated test suite:

```bash
npm test
```

Build the production bundles:

```bash
npm run build
```

Run the browser demo:

```bash
npm run demo
```

The tests cover random-number generation, permutation sampling, event-specific state constraints, excluded states, scramble replay, solver verification and deterministic generation.

The tests are organized by puzzle under `src/test/222/`, `src/test/333/`, `src/test/pyram/` and `src/test/444/`. Shared core tests live in `src/test/core/`, and public-API cross-event checks live in `src/test/integration/`.The 2×2×2 tests also exercise the dedicated solver and its supported move set. The 3×3×3 tests cover corner and edge legality, orientation constraints, permutation parity and the excluded-state set. The 4×4 tests cover facelet geometry, move application, piece extraction, parity and reduction helpers, as well as seeded backend generation and scramble replay.

## Roadmap

- [x] Cryptographically backed random-number generation.
- [x] Unbiased bounded integer sampling.
- [x] Random legal 3×3×3 state sampling.
- [x] Solver-backed 3×3×3 scramble generation.
- [x] Dedicated 2×2×2 state sampling and solver.
- [x] State and scramble verification.
- [x] Deterministic random-source injection.
- [x] Initial automated test suite.
- [x] Browser-based development demo.
- [ ] Strengthen edge-case and invalid-input testing.
- [ ] Document and rigorously verify the sampling uniformity argument for each event.
- [ ] Review compliance with the current WCA Regulations.
- [ ] Improve the shared event registry and move utilities.
- [ ] Expand support to other WCA events.
- [ ] Review dependencies, licensing and release packaging.
- [ ] Prepare for a versioned npm release.

## Disclaimer

This is an independent development project. It is not affiliated with, endorsed by or approved by the World Cube Association.

**Do not use this library to generate scrambles for official WCA competitions.** Consult the current WCA Regulations and use an official scrambling program for competition purposes.