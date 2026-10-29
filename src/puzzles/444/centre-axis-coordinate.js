import { FACELETS, assertValidState, solvedState } from "./state.js";
import { getMovePermutation, MOVE_NAMES } from "./moves.js";
import { CENTRE_SLOTS } from "./centres.js";

export const CENTRE_AXIS_COLOURS = Object.freeze({
  UD: Object.freeze(["U", "D"]),
  FB: Object.freeze(["F", "B"]),
  LR: Object.freeze(["L", "R"])
});

export const CENTRE_AXIS_COORDINATE_SIZE = 735471; // binomial(24, 8)

const CENTRE_SLOT_BY_FACELET = new Map(
  CENTRE_SLOTS.map((slot) => [slot.faceletIndex, slot.index])
);
const CENTRE_SLOT_COUNT = CENTRE_SLOTS.length;
const FULL_MASK = (1 << CENTRE_SLOT_COUNT) - 1;

function popcount(value) {
  let count = 0;
  while (value) {
    value &= value - 1;
    count++;
  }
  return count;
}

export function isCentreAxisMask(mask) {
  return Number.isInteger(mask) && mask >= 0 && mask <= FULL_MASK &&
    popcount(mask) === 8;
}

/** Encode which centre slots currently contain either colour of one axis pair. */
export function encodeCentreAxisMask(state, axis) {
  assertValidState(state);
  const colours = CENTRE_AXIS_COLOURS[axis];
  if (!colours) throw new RangeError(`Unknown centre axis ${axis}`);

  let mask = 0;
  for (const slot of CENTRE_SLOTS) {
    if (colours.includes(state[slot.faceletIndex])) mask |= (1 << slot.index);
  }
  return mask;
}

function buildCentreSlotPermutations() {
  const moves = MOVE_NAMES.filter((move) => !move.startsWith("2"));
  return Object.freeze(moves.map((move) => {
    const faceletPermutation = getMovePermutation(move);
    const destination = CENTRE_SLOTS.map((slot) => {
      const destinationFacelet = faceletPermutation[slot.faceletIndex];
      const destinationSlot = CENTRE_SLOT_BY_FACELET.get(destinationFacelet);
      if (destinationSlot === undefined) {
        throw new Error(`Move ${move} sent a centre sticker outside centre slots`);
      }
      return destinationSlot;
    });

    if (new Set(destination).size !== CENTRE_SLOT_COUNT) {
      throw new Error(`Move ${move} produced a non-bijective centre permutation`);
    }

    return Object.freeze({ move, destination: Object.freeze(destination) });
  }));
}

export const CENTRE_AXIS_MOVES = buildCentreSlotPermutations();

export function applyCentreAxisMaskMove(mask, move) {
  if (!isCentreAxisMask(mask)) {
    throw new RangeError("Expected an 8-of-24 centre-axis mask");
  }
  const transition = CENTRE_AXIS_MOVES.find((entry) => entry.move === move);
  if (!transition) throw new RangeError(`Unsupported centre-axis move: ${move}`);

  let result = 0;
  for (let source = 0; source < CENTRE_SLOT_COUNT; source++) {
    if (mask & (1 << source)) result |= (1 << transition.destination[source]);
  }
  return result;
}

export function solvedCentreAxisMask(axis) {
  return encodeCentreAxisMask(solvedState(), axis);
}

/** Apply a move sequence to the abstract centre-axis coordinate. */
export function applyCentreAxisMoves(mask, moves) {
  return moves.reduce((current, move) => applyCentreAxisMaskMove(current, move), mask);
}

/** Number of set slots, exported for diagnostics and tests. */
export function centreAxisMaskPopulation(mask) {
  if (!Number.isInteger(mask) || mask < 0 || mask > FULL_MASK) {
    throw new RangeError("Invalid 24-bit centre mask");
  }
  return popcount(mask);
}
