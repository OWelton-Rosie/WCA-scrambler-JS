# WCA-scrambler-JS

An independent JavaScript library for generating puzzle scrambles, with the long-term goal of supporting every World Cube Association (WCA) event.

**Status:** Early development. Implemented events: 2×2×2 (`222`), 3×3×3 (`333`), Pyraminx (`pyram`), 4×4×4 (`444`) and Megaminx (`minx`).

## Overview

The library uses event-specific generation methods behind a shared asynchronous `generate(event, options)` API:

- **2×2×2 and 3×3×3:** random-state generation and event-specific solving.
- **4×4×4:** random-state generation through the MIT-licensed [`@cubesmith/scrambler`](https://github.com/cubesmithjs/cubesmith-scrambler) backend, followed by replay through this project's independent facelet model.
- **Pyraminx:** event-specific scramble generation.
- **Megaminx:** random-move generation using conventional `R++`, `R--`, `D++`, `D--`, `U` and `U'` notation.

The implementation is modular, with shared randomness and event registration utilities alongside puzzle-specific code. The methods and verification available differ by event; passing automated tests is not a formal proof of uniformity or regulatory compliance.

## WCA regulation status

### Regulation 4b3: random-state requirements

The 2×2×2, 3×3×3 and 4×4×4 implementations use random-state approaches, with different event-specific algorithms and dependencies. The Megaminx generator instead uses the random-move approach described in Regulation 4b3e.

The 3×3×3 implementation rejects the solved state and the 18 states obtainable by a single face turn. See [the 3×3×3 uniformity audit](docs/uniformity-audit.md) for the assumptions and mathematical argument relating to that sampler. That audit does not cover the other events.

### 4×4×4 backend and performance

The public `generate("444")` API uses `@cubesmith/scrambler`. The backend samples a legal state, applies a centres → wing-pairing → parity → 3×3 reduction pipeline, and verifies the solve. This project then replays the returned notation through its own 4×4 facelet model.

The backend prepares and caches solver tables. Use the exported `prepare444Scrambler()` function to prepare those tables before measuring generation time or before a user requests their first scramble. The first preparation may take several seconds; later scramble generation is much faster. See [4×4 performance notes](docs/444-performance.md) for the benchmark command and current optimization strategy.

This is a pragmatic backend integration, not a claim that this repository independently implements or formally proves the 4×4 sampler. The backend's own documentation and design record should be reviewed before relying on its guarantees.

For reproducible tests, `generate("444", { seed: "your-seed" })` accepts a seed. The 4×4 backend does not support the local `randomWord` injection: reducing that source to a 32-bit seed would not preserve the backend's random-state distribution.

### Official competition use

**This project is not an official WCA scrambling program and is not approved for generating scrambles for official WCA competitions.**

Generating random states in accordance with Regulation 4b3 does not, by itself, satisfy Regulation 4b. Official competition scrambles must be generated using a current official WCA scrambling program. This project is intended for development, experimentation, learning and non-official use.

## Features

- Event-specific scramble generation for `222`, `333`, `pyram`, `444` and `minx`.
- Cryptographically backed random-number generation using Web Crypto by default for local generators.
- Unbiased bounded integer sampling using rejection sampling.
- Fisher–Yates permutation shuffling.
- Event-specific state constraints and solver verification where implemented.
- 4×4 random-state generation through a reduction-based JavaScript backend.
- Conventional Megaminx random-move notation arranged in seven rows.
- Deterministic testing options: injected random-word sources for supported local generators and a `seed` for 4×4.
- Automated tests using Node.js's built-in test runner.
- Production builds using Vite.
- Browser-based demo for generating, viewing and copying scrambles.

## Installation

The project is under active development and is not published as a stable npm package.

```bash
git clone https://github.com/OWelton-Rosie/WCA-scrambler-JS.git
cd WCA-scrambler-JS
npm install
```

## Usage

Generate a 3×3×3 scramble:

```javascript
import { generate } from "./src/index.js";

const scramble = await generate("333");
console.log(scramble.notation);
```

Generate a 2×2×2 scramble and inspect the result:

```javascript
import { generate } from "./src/index.js";

const scramble = await generate("222");
console.log(scramble.notation);
console.log(scramble.moves);
console.log(scramble.state);
```

Generate a 4×4×4 scramble with a reproducible seed:

```javascript
import { generate, prepare444Scrambler } from "./src/index.js";

// Optional: prepare solver tables before the first scramble.
await prepare444Scrambler();

const scramble = await generate("444", {
  seed: "repeatable-test-seed"
});

console.log(scramble.notation);
```

Generate a Megaminx scramble:

```javascript
import { generate } from "./src/index.js";

const scramble = await generate("minx");
console.log(scramble.notation);
```

The Megaminx generator returns 76 move tokens: 70 alternating `R`/`D` turns and six `U` turns, formatted as seven lines. It samples move sequences, not uniformly distributed puzzle states. This implementation does not claim formal compliance with Regulation 4b3e.

### Return value

`generate()` returns a promise resolving to an event-specific object. Common fields include:

| Property | Description |
|---|---|
| `event` | Event identifier: `"222"`, `"333"`, `"pyram"`, `"444"` or `"minx"`. |
| `notation` | Scramble notation. Megaminx notation contains line breaks between rows; other events generally use space-separated moves. |
| `moves` | The moves as an array. |
| `state` | The event's returned state representation where available. Megaminx currently returns `null`. |
| `method` | Event-specific generation method label. |
| `backend` | Backend identifier for 4×4 generation. |

The exact fields and state representation depend on the event. Unsupported event identifiers throw a `RangeError`.

## Browser demo

Start the browser demo from the project root:

```bash
npm run demo
```

Open the local URL printed by Vite. The demo supports scramble generation, copying notation and viewing recent results for the current session. It prepares the 4×4 backend before timing a 4×4 scramble, so the first-time table-building cost is not included in the displayed generation time.

The demo is a development tool, not an official WCA scrambling application.

## Reproducible testing

The local generators that support `randomWord` accept a function returning unsigned 32-bit integers. This is useful for deterministic tests and debugging. For example:

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

This seeded source is for testing, not security-sensitive or production randomness. The 4×4 backend instead accepts a `seed` option.

## Development

Run tests, build the package or start the demo:

```bash
npm test
npm run build
npm run demo
```

Run the warmed-up 4×4 generation benchmark:

```bash
npm run benchmark:444
```

The tests are organized by puzzle under `src/test/222/`, `src/test/333/`, `src/test/pyram/`, `src/test/444/` and `src/test/minx/`. Shared core tests live in `src/test/core/`; public API checks across events live in `src/test/integration/`.

## Roadmap

- [x] Cryptographically backed random-number generation.
- [x] Random-state generation for 2×2×2 and 3×3×3.
- [x] 4×4×4 random-state backend integration.
- [x] Pyraminx and Megaminx generators.
- [x] Automated tests and browser demo.
- [ ] Improve and document 4×4 generation performance.
- [ ] Strengthen edge-case and invalid-input testing.
- [ ] Document and rigorously verify sampling properties for each event.
- [ ] Review compliance with current WCA Regulations.
- [ ] Expand support to other WCA events.
- [ ] Review dependencies, licensing and release packaging.
- [ ] Prepare for a versioned npm release.

## Disclaimer

This is an independent development project. It is not affiliated with, endorsed by or approved by the World Cube Association.

**Do not use this library to generate scrambles for official WCA competitions.** Consult the current WCA Regulations and use an official scrambling program for competition purposes.
