import { FACELETS, solvedState } from "./state.js";
import { applyMoves, invertMoves, MOVE_NAMES } from "./moves.js";
import { CENTRE_SLOTS } from "./centres.js";
import { WING_SLOTS } from "./wings.js";

const CENTRE_FACELET_INDICES = CENTRE_SLOTS.map(({ faceletIndex }) => faceletIndex);
const WING_FACELET_INDICES = WING_SLOTS.flatMap(({ faceletIndices }) => faceletIndices);
const NON_OUTER_MOVES = MOVE_NAMES.filter(
  (move) => move.startsWith("2") || move.endsWith("w")
);

function areCentresSolved(state) {
  return CENTRE_FACELET_INDICES.every(
    (index) => state[index] === FACELETS[index].face
  );
}

function changedWingStickerCount(state, solved) {
  let changed = 0;
  for (const index of WING_FACELET_INDICES) {
    if (state[index] !== solved[index]) changed++;
  }
  return changed;
}

let cachedMacros;

/**
 * Derive short centre-preserving commutators from the local move model.
 *
 * A returned macro is verified to preserve the solved centre-colour pattern
 * while changing at least one wing sticker. Since centre stickers of a solved
 * face are indistinguishable, the verified property also preserves centres
 * in any state whose centres are already colour-solved.
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

  for (let i = 0; i < MOVE_NAMES.length; i++) {
    const a = MOVE_NAMES[i];
    for (let j = i + 1; j < MOVE_NAMES.length; j++) {
      const b = MOVE_NAMES[j];
      if (!NON_OUTER_MOVES.includes(a) && !NON_OUTER_MOVES.includes(b)) {
        continue;
      }

      const moves = [a, b, ...invertMoves([a]), ...invertMoves([b])];
      const key = moves.join(" ");
      if (seen.has(key)) continue;
      seen.add(key);

      const result = applyMoves(solved, moves);
      if (!areCentresSolved(result)) continue;

      const changedWingStickers = changedWingStickerCount(result, solved);
      if (changedWingStickers === 0) continue;

      macros.push(Object.freeze({
        moves: Object.freeze(moves),
        notation: moves.join(" "),
        changedWingStickers
      }));
    }
  }

  cachedMacros = Object.freeze(macros);
  return cachedMacros;
}
