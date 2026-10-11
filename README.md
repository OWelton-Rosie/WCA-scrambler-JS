# WCA-scramble-JS
A JavaScript library for generating Rubik's Cube scrambles, with the long-term goal of supporting every World Cube Association (WCA) puzzle event.

**Status:** Early development. Currently supports 3×3×3 (333).

## Overview
This project generates scrambles by sampling legal puzzle states and using a solver to calculate a sequence of moves that reaches each sampled state.

The project is being developed with the WCA Regulations in mind, particularly Regulation 4b3, which specifies the random-state requirements for scrambles.

The long-term goal is to provide a modular, reusable library with a shared core for randomness and event registration, alongside individual implementations for each supported puzzle.

## WCA regulation status

**Regulation 4b3:** The 3×3×3 implementation is designed to satisfy the random-state requirement in Regulation 4b3. It samples legal cube states, rejects the solved state and states solvable in one face turn, and generates a scramble for the selected state. The implementation and its tests are still under development, and full compliance has not been formally established.

**Regulation 4b:** This project is **not an official WCA scrambling program** and is not approved for generating scrambles for official WCA competitions. Regulation 4b requires competition scrambles to be generated using a current official version of an official WCA scrambling program. Generating states in accordance with Regulation 4b3 does not, by itself, satisfy Regulation 4b.

This project is intended for development, experimentation, learning, and non-official use unless and until its status changes.

## Features
- Random legal (per 4b3) 3×3×3 state generation.
- Cryptographically backed random-number generation using Web Crypto.
- Unbiased bounded integer sampling using rejection sampling.
- Uniform permutation sampling using the Fisher–Yates algorithm.
- Cube-state legality checks, including orientation and permutation-parity constraints.
- Solver-backed scramble generation.
- Verification that generated scrambles reproduce their target states.
- Exclusion of the solved state and all 18 single-face-turn states.
- Injectable random sources for reproducible testing.
- Automated tests and production builds.

## Installation
The project is currently under active development and is not yet published as a stable npm package.

To work with the source locally:

```bash
git clone 
cd WCA-scramble-JS
npm install
```


## Usage
Generate a 3×3×3 scramble:

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

The returned object contains:

| Property | Description |
|---|---|
| `event` | Event identifier (`"333"`) |
| `notation` | Scramble as a space-separated move sequence |
| `moves` | Scramble represented as an array of moves |
| `state` | Sampled cube state, represented by cubie permutations and orientations |

Only the 3×3×3 event is currently supported. Unsupported event identifiers throw a `RangeError`.

## Reproducible testing
The generator accepts an optional random-word source, allowing deterministic tests:

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

This seeded source is intended for testing and reproducibility, **not security or production randomness**. The default generator uses Web Crypto.

## Development
Run the automated test suite:

```bash
npm test
```

Build the production bundles:

```bash
npm run build
```

The tests cover random-number generation, permutation sampling, cube-state legality, excluded states, scramble replay, solution verification, and deterministic generation.

## Project structure

```text
src/
├── core/
│   ├── moves.js
│   ├── random.js
│   └── registry.js
├── puzzles/
│   └── 333/
│       ├── random.js
│       ├── scramble.js
│       ├── solver.js
│       └── state.js
├── test/
│   ├── random.test.js
│   ├── scramble.test.js
│   └── state.test.js
└── index.js
```

- `core/` contains shared utilities.
- `puzzles/333/` contains the 3×3×3 state generator, solver integration, and scramble generation.
- `test/` contains the automated tests.
- `index.js` exposes the public API.

Some modules are placeholders for future development.

## Roadmap
- [x] Cryptographically backed random-number generation.
- [x] Random legal 3×3×3 state sampling.
- [x] Solver-backed scramble generation.
- [x] State and scramble verification.
- [x] Deterministic random-source injection.
- [ ] Further validate sampling uniformity and WCA regulatory requirements.
- [ ] Improve the shared event registry and move utilities.
- [ ] Expand support to other WCA events.
- [ ] Review dependencies, licensing, and release packaging.

## Disclaimer
This is an independent development project. It is not affiliated with, endorsed by, or approved by the World Cube Association.

Do not use this library to generate scrambles for official WCA competitions. Consult the current WCA Regulations and use an official scrambling program for competition purposes.