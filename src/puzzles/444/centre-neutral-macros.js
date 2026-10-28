import { FACELETS, solvedState } from "./state.js";
import { applyMoves, getMovePermutation, invertMoves, MOVE_NAMES } from "./moves.js";
import { CENTRE_SLOTS } from "./centres.js";
import { WING_SLOTS } from "./wings.js";

const CENTRE_FACELET_INDICES = CENTRE_SLOTS.map(({ faceletIndex }) => faceletIndex);
const WING_FACELET_INDICES = WING_SLOTS.flatMap(({ faceletIndices }) => faceletIndices);
const NON_OUTER_MOVES = new Set(
  MOVE_NAMES.filter((move) => move.startsWith("2") || move.endsWith("w"))
);

const CENTRE_DESTINATIONS = new Map(
  MOVE_NAMES.map((move) => {
    const permutation = getMovePermutation(move);
    const destination = CENTRE_SLOTS.map(({ faceletIndex }) => {
      const destinationFacelet = permutation[faceletIndex];
      const slotIndex = CENTRE_SLOTS.findIndex(
        (slot) => slot.faceletIndex === destinationFacelet
      );
      if (slotIndex < 0) {
        throw new Error(`Move ${move} sent a centre sticker outside centre slots`);
      }
      return slotIndex;
    });
    return [move, destination];
  })
);

function areCentresSolved(state) {
  return CENTRE_FACELET_INDICES.every(
    (index) => state[index] === FACELETS[index].face
  );
}

function preservesCentreColours(moves) {
  let destinationBySource = CENTRE_SLOTS.map((_, index) => index);

  for (const move of moves) {
    const destination = CENTRE_DESTINATIONS.get(move);
    destinationBySource = destinationBySource.map(
      (currentDestination) => destination[currentDestination]
    );
  }

  return destinationBySource.every((destination, source) => {
    const sourceFace = FACELETS[CENTRE_SLOTS[source].faceletIndex].face;
    const destinationFace = FACELETS[CENTRE_SLOTS[destination].faceletIndex].face;
    return sourceFace === destinationFace;
  });
}

function changedWingStickerCount(state, solved) {
  let changed = 0;
  for (const index of WING_FACELET_INDICES) {
    if (state[index] !== solved[index]) changed++;
  }
  return changed;
}

function addMacro(moves, solved, macros, seen) {
  const key = moves.join(" ");
  if (seen.has(key) || !preservesCentreColours(moves)) return;
  seen.add(key);

  const result = applyMoves(solved, moves);
  if (!areCentresSolved(result)) {
    throw new Error(`Centre permutation check disagreed with facelet replay: ${key}`);
  }

  const changedWingStickers = changedWingStickerCount(result, solved);
  if (changedWingStickers === 0) return;

  macros.push(Object.freeze({
    moves: Object.freeze(moves),
    notation: key,
    changedWingStickers
  }));
}

let cachedMacros;

/**
 * Derive short centre-preserving commutators from the local move model.
 *
 * Searches commutators of one-move and two-move sequences with a single move.
 * Candidate centre permutations are checked first, then promising candidates
 * are replayed through the complete facelet model and retained only when they
 * preserve centre colours and change wing stickers.
 *
 * This is a macro-discovery primitive for wing-pairing research, not a complete
 * wing-pairing algorithm. It does not claim that the macros connect every
 * required wing-pairing state.
 */
export function deriveCentreNeutralCommutators() {
  if (cachedMacros) return cachedMacros;

  const solved = solvedState();
  const macros = [];
  const seen = new Set();

  // Four-move commutators [A, B], where A and B are individual moves.
  for (let i = 0; i < MOVE_NAMES.length; i++) {
    const a = MOVE_NAMES[i];
    for (let j = i + 1; j < MOVE_NAMES.length; j++) {
      const b = MOVE_NAMES[j];
      if (!NON_OUTER_MOVES.has(a) && !NON_OUTER_MOVES.has(b)) continue;
      addMacro([a, b, ...invertMoves([a]), ...invertMoves([b])], solved, macros, seen);
    }
  }

  // Six-move commutators [A B, C]. These can preserve centres even when
  // no commutator of two individual moves produces a useful wing effect.
  for (const a of MOVE_NAMES) {
    for (const b of MOVE_NAMES) {
      for (const c of MOVE_NAMES) {
        if (!NON_OUTER_MOVES.has(a) && !NON_OUTER_MOVES.has(b) && !NON_OUTER_MOVES.has(c)) {
          continue;
        }
        const prefix = [a, b, c];
        const moves = [...prefix, ...invertMoves([a, b]), ...invertMoves([c])];
        addMacro(moves, solved, macros, seen);
      }
    }
  }

  cachedMacros = Object.freeze(macros);
  return cachedMacros;
}
