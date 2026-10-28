import { FACELETS, solvedState } from "./state.js";
import { applyMoves, getMovePermutation, invertMoves, MOVE_NAMES } from "./moves.js";
import { CENTRE_SLOTS } from "./centres.js";
import { WING_SLOTS } from "./wings.js";
import { countPairedEdges } from "./wing-pairing.js";

const CENTRE_FACELET_INDICES = CENTRE_SLOTS.map(({ faceletIndex }) => faceletIndex);
const WING_FACELET_INDICES = WING_SLOTS.flatMap(({ faceletIndices }) => faceletIndices);
const NON_OUTER_MOVES = new Set(
  MOVE_NAMES.filter((move) => move.startsWith("2") || /^[URFDLB]w(?:2|')?$/.test(move))
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

const WING_DESTINATIONS = new Map(
  MOVE_NAMES.map((move) => {
    const permutation = getMovePermutation(move);
    const destination = WING_SLOTS.map((sourceSlot) => {
      const destinations = sourceSlot.faceletIndices.map((index) => permutation[index]);
      const slotIndices = destinations.map((faceletIndex) =>
        WING_SLOTS.findIndex((slot) => slot.faceletIndices.includes(faceletIndex))
      );
      if (slotIndices[0] < 0 || slotIndices[0] !== slotIndices[1]) {
        throw new Error(`Move ${move} did not preserve wing piece geometry`);
      }
      return slotIndices[0];
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

function wingPermutationForMoves(moves) {
  let destinationBySource = WING_SLOTS.map((_, index) => index);

  for (const move of moves) {
    const destination = WING_DESTINATIONS.get(move);
    destinationBySource = destinationBySource.map(
      (currentDestination) => destination[currentDestination]
    );
  }

  return destinationBySource;
}

function changedWingStickerCount(state, solved) {
  let changed = 0;
  for (const index of WING_FACELET_INDICES) {
    if (state[index] !== solved[index]) changed++;
  }
  return changed;
}

function addMacro(moves, solved, macrosByWingPermutation, seenSequences) {
  const sequenceKey = moves.join(" ");
  if (seenSequences.has(sequenceKey) || !preservesCentreColours(moves)) return;

  const wingDestinationBySource = wingPermutationForMoves(moves);
  const wingPermutationKey = wingDestinationBySource.join(",");
  // The same wing-slot permutation has the same pairing effect. Keep the
  // first (shortest) representative; four-move candidates are enumerated first.
  if (macrosByWingPermutation.has(wingPermutationKey)) {
    seenSequences.add(sequenceKey);
    return;
  }
  seenSequences.add(sequenceKey);

  const result = applyMoves(solved, moves);
  if (!areCentresSolved(result)) {
    throw new Error(`Centre permutation check disagreed with facelet replay: ${sequenceKey}`);
  }

  const changedWingStickers = changedWingStickerCount(result, solved);
  if (changedWingStickers === 0) return;

  macrosByWingPermutation.set(wingPermutationKey, Object.freeze({
    moves: Object.freeze(moves),
    notation: sequenceKey,
    changedWingStickers,
    pairedEdges: countPairedEdges(result),
    wingPermutationKey,
    wingDestinationBySource: Object.freeze(wingDestinationBySource)
  }));
}

let cachedMacros;

/**
 * Derive short centre-preserving commutators from the local move model.
 *
 * Searches commutators of one-move and two-move sequences with a single move.
 * Candidate centre permutations are checked first, then promising candidates
 * are replayed through the complete facelet model and retained only when they
 * preserve centre colours and change wing stickers. Equivalent wing-slot
 * permutations are deduplicated so later pairing searches can use a smaller
 * set of distinct actions.
 *
 * This is a macro-discovery primitive for wing-pairing research, not a complete
 * wing-pairing algorithm. It does not claim that the macros connect every
 * required wing-pairing state.
 */
export function deriveCentreNeutralCommutators() {
  if (cachedMacros) return cachedMacros;

  const solved = solvedState();
  const macrosByWingPermutation = new Map();
  const seenSequences = new Set();

  // Four-move commutators [A, B], where A and B are individual moves.
  for (let i = 0; i < MOVE_NAMES.length; i++) {
    const a = MOVE_NAMES[i];
    for (let j = i + 1; j < MOVE_NAMES.length; j++) {
      const b = MOVE_NAMES[j];
      if (!NON_OUTER_MOVES.has(a) && !NON_OUTER_MOVES.has(b)) continue;
      addMacro(
        [a, b, ...invertMoves([a]), ...invertMoves([b])],
        solved,
        macrosByWingPermutation,
        seenSequences
      );
    }
  }

  // Six-move commutators [A B, C].
  for (const a of MOVE_NAMES) {
    for (const b of MOVE_NAMES) {
      for (const c of MOVE_NAMES) {
        if (!NON_OUTER_MOVES.has(a) && !NON_OUTER_MOVES.has(b) && !NON_OUTER_MOVES.has(c)) {
          continue;
        }
        const moves = [a, b, c, ...invertMoves([a, b]), ...invertMoves([c])];
        addMacro(moves, solved, macrosByWingPermutation, seenSequences);
      }
    }
  }

  cachedMacros = Object.freeze([...macrosByWingPermutation.values()]);
  return cachedMacros;
}
