import { FACELETS, solvedState } from "./state.js";
import { applyMoves, getMovePermutation, invertMoves, MOVE_NAMES } from "./moves.js";
import { CENTRE_SLOTS } from "./centres.js";
import { WING_SLOTS } from "./wings.js";
import { countPairedEdges } from "./wing-pairing.js";

const CENTRE_FACELET_INDICES = CENTRE_SLOTS.map(({ faceletIndex }) => faceletIndex);
const WING_FACELET_INDICES = WING_SLOTS.flatMap(({ faceletIndices }) => faceletIndices);
const WING_STICKER_INDEX = new Map(
  WING_FACELET_INDICES.map((faceletIndex, index) => [faceletIndex, index])
);
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

/**
 * Map every individual wing sticker position, not just the 24 wing slots.
 * Two algorithms can have the same slot permutation but flip stickers within
 * slots differently; those actions are not interchangeable in a facelet solver.
 */
function wingStickerPermutationForMoves(moves) {
  let destinationBySource = WING_FACELET_INDICES.map((_, index) => index);

  for (const move of moves) {
    const faceletPermutation = getMovePermutation(move);
    const moveDestination = WING_FACELET_INDICES.map((faceletIndex) => {
      const destinationFacelet = faceletPermutation[faceletIndex];
      const destinationWingIndex = WING_STICKER_INDEX.get(destinationFacelet);
      if (destinationWingIndex === undefined) {
        throw new Error(`Move ${move} sent a wing sticker outside wing positions`);
      }
      return destinationWingIndex;
    });
    destinationBySource = destinationBySource.map(
      (currentDestination) => moveDestination[currentDestination]
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

function addMacro(moves, solved, macrosByWingAction, seenSequences) {
  const sequenceKey = moves.join(" ");
  if (seenSequences.has(sequenceKey) || !preservesCentreColours(moves)) return;

  const wingDestinationBySource = wingPermutationForMoves(moves);
  const wingPermutationKey = wingDestinationBySource.join(",");
  const wingStickerDestinationBySource = wingStickerPermutationForMoves(moves);
  const wingStickerPermutationKey = wingStickerDestinationBySource.join(",");
  // Slot-equivalent actions can still differ in sticker orientation. Only
  // deduplicate when the complete wing-sticker permutation is equivalent.
  if (macrosByWingAction.has(wingStickerPermutationKey)) {
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

  macrosByWingAction.set(wingStickerPermutationKey, Object.freeze({
    moves: Object.freeze(moves),
    notation: sequenceKey,
    changedWingStickers,
    pairedEdges: countPairedEdges(result),
    wingPermutationKey,
    wingDestinationBySource: Object.freeze(wingDestinationBySource),
    wingStickerPermutationKey,
    wingStickerDestinationBySource: Object.freeze(wingStickerDestinationBySource)
  }));
}

let cachedMacros;

/**
 * Derive short centre-preserving commutators from the local move model.
 *
 * Searches commutators of one-move and two-move sequences with a single move,
 * plus selected conjugates of useful six-move macros by outer turns.
 * Candidate centre permutations are checked first, then promising candidates
 * are replayed through the complete facelet model and retained only when they
 * preserve centre colours and change wing stickers. Actions are deduplicated
 * by their full 48-sticker wing permutation, not merely the 24-slot permutation.
 *
 * This is a macro-discovery primitive for wing-pairing research, not a complete
 * wing-pairing algorithm. It does not claim that the macros connect every
 * required wing-pairing state.
 */
export function deriveCentreNeutralCommutators() {
  if (cachedMacros) return cachedMacros;

  const solved = solvedState();
  const macrosByWingAction = new Map();
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
        macrosByWingAction,
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
        addMacro(moves, solved, macrosByWingAction, seenSequences);
      }
    }
  }

  // Conjugate a broader, deliberately ranked set of useful six-move macros.
  // Outer turns preserve centre colours, so conjugation preserves the
  // centre-neutral invariant while exposing additional wing permutations.
  const outerMoves = MOVE_NAMES.filter((move) => /^[URFDLB](?:2|')?$/.test(move));
  const seenSeedPermutations = new Set();
  const conjugationSeeds = [...macrosByWingAction.values()]
    .filter((macro) => macro.moves.length === 6 && macro.pairedEdges < 12)
    .sort((a, b) => a.pairedEdges - b.pairedEdges || a.notation.localeCompare(b.notation))
    .filter((macro) => {
      // Keep seed diversity by slot action: sticker-orientation variants of
      // one slot permutation should not consume the entire conjugation budget.
      if (seenSeedPermutations.has(macro.wingPermutationKey)) return false;
      seenSeedPermutations.add(macro.wingPermutationKey);
      return true;
    })
    .slice(0, 24);

  for (const macro of conjugationSeeds) {
    for (const outer of outerMoves) {
      const moves = [outer, ...macro.moves, ...invertMoves([outer])];
      addMacro(moves, solved, macrosByWingAction, seenSequences);
    }
  }

  cachedMacros = Object.freeze([...macrosByWingAction.values()]);
  return cachedMacros;
}
