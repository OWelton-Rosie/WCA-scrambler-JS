import { randomInt } from "../../core/random.js";

const ROWS = 7;
const PAIRS_PER_ROW = 5;
const RANDOM_TURNS = ROWS * PAIRS_PER_ROW * 2;
const U_TURNS = ROWS - 1;

/**
 * Generate a conventional 70-turn Megaminx random-move scramble.
 *
 * Each row contains five R/D move pairs. The first six rows end in a
 * randomly selected U turn, producing 70 R/D turns and six U turns.
 *
 * This is a random-move generator, not a uniform random-state sampler.
 *
 * @param {{ randomWord?: () => number }} [options]
 * @returns {{ event: "minx", notation: string, moves: string[], method: "random-moves", state: null }}
 */
export function generateMinx(options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("options must be an object");
  }

  const { randomWord } = options;
  const moves = [];

  for (let row = 0; row < ROWS; row++) {
    for (let pair = 0; pair < PAIRS_PER_ROW; pair++) {
      moves.push(randomInt(2, randomWord) === 0 ? "R++" : "R--");
      moves.push(randomInt(2, randomWord) === 0 ? "D++" : "D--");
    }

    if (row < U_TURNS) {
      moves.push(randomInt(2, randomWord) === 0 ? "U" : "U'");
    }
  }

  return {
    event: "minx",
    notation: moves.join(" "),
    moves,
    method: "random-moves",
    state: null
  };
}
