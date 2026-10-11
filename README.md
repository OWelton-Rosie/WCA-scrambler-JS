# WCA-scrambler-JS

A JavaScript library for generating Rubik's Cube scrambles, with the long-term goal of supporting every World Cube Association (WCA) puzzle event.

**Status:** Early development. Currently supports 3×3×3 (`333`).

## Overview

This project generates scrambles by sampling legal puzzle states and using a solver to calculate a sequence of moves that reaches each sampled state.

The project is being developed with the WCA Regulations in mind, particularly Regulation 4b3, which specifies random-state requirements for scrambles.

The long-term goal is to provide a modular, reusable library with a shared core for randomness and event registration, alongside individual implementations for each supported puzzle.

## WCA regulation status

### Regulation 4b3: Random-state requirements

The 3×3×3 implementation is designed around the random-state approach described in Regulation 4b3. It samples legal cube states and rejects the solved state and the 18 states obtainable by a single face turn.

The implementation has automated tests for state legality, permutation parity, orientation constraints, excluded states, scramble replay, and solver verification. However, these tests do not constitute a formal proof of uniformity or establish full compliance with the WCA's requirements.

### Regulation 4b: Official competition use

**This project is not an official WCA scrambling program and is not approved for generating scrambles for official WCA competitions.**

Generating random states in accordance with Regulation 4b3 does not, by itself, satisfy Regulation 4b. Competition scrambles must be generated using a current official version of an official WCA scrambling program.

This project is intended for development, experimentation, learning, and non-official use.

## Features

- Random legal 3×3×3 state sampling.
- Cryptographically backed random-number generation using Web Crypto.
- Unbiased bounded integer sampling using rejection sampling.
- Fisher–Yates permutation shuffling.
- Cube-state legality checks, including orientation and permutation-parity constraints.
- Solver-backed scramble generation using `cubejs`.
- Verification that generated scrambles reproduce their sampled target states.
- Verification that solver solutions return sampled states to solved.
- Exclusion of the solved state and all 18 single-face-turn states.
- Injectable random sources for reproducible testing.
- Automated tests using Node.js's built-in test runner.
- Production builds using Vite.
- A browser-based demo for generating, viewing, and copying scrambles.

## Installation

The project is under active development and is not yet published as a stable npm package.

To clone the repository and install its dependencies:

```bash
git clone https://github.com/OWelton-Rosie/WCA-scrambler-JS.git
cd WCA-scrambler-JS
npm install
```

## Usage

Generate a 3×3×3 scramble from the source code:

```javascript
import { generate } from "./src/index.js";

const scramble = await generate();

console.log(scramble.notation);
```

You can also specify the event explicitly:

```javascript
const scramble = await generate("333");

console.log(scramble.notation);
console.log(scramble.moves);
console.log(scramble.state);
```

The `generate()` function returns a promise that resolves to an object containing:

| Property | Description |
|---|---|
| `event` | Event identifier, currently `"333"` |
| `notation` | Scramble as a space-separated move sequence |
| `moves` | Scramble represented as an array of moves |
| `state` | Sampled cube state represented by cubie permutations and orientations |

Only the `333` event is currently supported. Unsupported event identifiers throw a `RangeError`.

The generator accepts an optional random-word source for testing. See [Reproducible testing](#reproducible-testing).

## Browser demo

The repository includes a browser-based demo, separate from the library source.

Start the development server from the project root:

```bash
npm run demo
```

Open the local URL printed by Vite in your browser. 

The demo provides an interface for generating and viewing scrambles, copying notation, and reviewing recent results within the current session.

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

const scramble = await generate("333", {
  randomWord: seededRandomWord(12345)
});

console.log(scramble.notation);
```

**This seeded source is intended for testing and reproducibility, not security or production randomness.** The default generator uses Web Crypto.

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

The tests cover random-number generation, permutation sampling, cube-state legality, excluded states, scramble replay, solver verification, and deterministic generation.

## Roadmap

- [x] Cryptographically backed random-number generation.
- [x] Unbiased bounded integer sampling.
- [x] Random legal 3×3×3 state sampling.
- [x] Solver-backed scramble generation.
- [x] State and scramble verification.
- [x] Deterministic random-source injection.
- [x] Initial automated test suite.
- [x] Browser-based development demo.
- [ ] Strengthen edge-case and invalid-input testing.
- [ ] Document and rigorously verify the sampling uniformity argument.
- [ ] Review compliance with the current WCA Regulations.
- [ ] Improve the shared event registry and move utilities.
- [ ] Expand support to other WCA events.
- [ ] Review dependencies, licensing, and release packaging.
- [ ] Prepare for a versioned npm release.

## Disclaimer

This is an independent development project. It is not affiliated with, endorsed by, or approved by the World Cube Association.

**Do not use this library to generate scrambles for official WCA competitions.** Consult the current WCA Regulations and use an official scrambling program for competition purposes.