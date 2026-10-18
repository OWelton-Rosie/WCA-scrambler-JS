import { randomInt } from "../../core/random.js";

const ROWS = 7;
const PAIRS_PER_ROW = 5;
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
  const rows = [];

  for (let row = 0; row < ROWS; row++) {
    const rowMoves = [];

    for (let pair = 0; pair < PAIRS_PER_ROW; pair++) {
      rowMoves.push(randomInt(2, randomWord) === 0 ? "R++" : "R--");
      rowMoves.push(randomInt(2, randomWord) === 0 ? "D++" : "D--");
    }

    if (row < U_TURNS) {
      rowMoves.push(randomInt(2, randomWord) === 0 ? "U" : "U'");
    }

    rows.push(rowMoves);
    moves.push(...rowMoves);
  }

  return {
    event: "minx",
    notation: rows.map(rowMoves => rowMoves.join(" ")).join("\n"),
    moves,
    method: "random-moves",
    state: null
  };
}
