import { FACELETS, assertValidState, solvedState } from "./state.js";
import { CENTRE_SLOTS } from "./centres.js";
import { CENTRE_AXIS_MOVES } from "./centre-axis-coordinate.js";

export const CENTRE_COLOUR_NAMES = Object.freeze(["U", "R", "F", "D", "L", "B"]);
export const CENTRE_COLOUR_COORDINATE_SIZE = 10626; // binomial(24, 4)

const FULL_MASK = (1 << CENTRE_SLOTS.length) - 1;
const WIDE_MOVES = Object.freeze(
  CENTRE_AXIS_MOVES.filter(({ move }) => move.includes("w"))
);

function popcount(value) {
  let count = 0;
  while (value) {
    value &= value - 1;
    count++;
  }
  return count;
}

export function isCentreColourMask(mask) {
  return Number.isInteger(mask) && mask >= 0 && mask <= FULL_MASK &&
    popcount(mask) === 4;
}

/** Encode the four centre positions occupied by one colour. */
export function encodeCentreColourMask(state, colour) {
  assertValidState(state);
  if (!CENTRE_COLOUR_NAMES.includes(colour)) {
    throw new RangeError(`Unknown centre colour ${colour}`);
  }

  let mask = 0;
  for (const slot of CENTRE_SLOTS) {
    if (state[slot.faceletIndex] === colour) mask |= (1 << slot.index);
  }
  if (popcount(mask) !== 4) {
    throw new RangeError(`Expected exactly four ${colour} centres`);
  }
  return mask;
}

/** Rank a 4-of-24 bit mask in [0, C(24,4)) using its colexicographic rank. */
export function rankCentreColourMask(mask) {
  if (!isCentreColourMask(mask)) {
    throw new RangeError("Expected a 4-of-24 centre-colour mask");
  }

  let rank = 0;
  let ordinal = 1;
  for (let bit = 0; bit < CENTRE_SLOTS.length; bit++) {
    if (mask & (1 << bit)) {
      rank += binomial(bit, ordinal);
      ordinal++;
    }
  }
  return rank;
}

function binomial(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = (result * (n - i + 1)) / i;
  }
  return Math.round(result);
}

export const CENTRE_COLOUR_MOVES = Object.freeze(
  WIDE_MOVES.map(({ move, destination }) => Object.freeze({
    move,
    destination
  }))
);

export function applyCentreColourMaskMove(mask, move) {
  if (!isCentreColourMask(mask)) {
    throw new RangeError("Expected a 4-of-24 centre-colour mask");
  }
  const transition = CENTRE_COLOUR_MOVES.find((entry) => entry.move === move);
  if (!transition) throw new RangeError(`Unsupported centre-colour move: ${move}`);

  let result = 0;
  for (let source = 0; source < CENTRE_SLOTS.length; source++) {
    if (mask & (1 << source)) result |= (1 << transition.destination[source]);
  }
  return result;
}

export function applyCentreColourMaskMoveIndex(mask, moveIndex) {
  if (!isCentreColourMask(mask)) {
    throw new RangeError("Expected a 4-of-24 centre-colour mask");
  }
  if (!Number.isInteger(moveIndex) || moveIndex < 0 || moveIndex >= CENTRE_COLOUR_MOVES.length) {
    throw new RangeError("Invalid centre-colour move index");
  }

  const destination = CENTRE_COLOUR_MOVES[moveIndex].destination;
  let result = 0;
  for (let source = 0; source < CENTRE_SLOTS.length; source++) {
    if (mask & (1 << source)) result |= (1 << destination[source]);
  }
  return result;
}

export function solvedCentreColourMask(colour) {
  return encodeCentreColourMask(solvedState(), colour);
}
