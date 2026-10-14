
import { FACELETS, assertValidState } from "./state.js";
import { PIECE_LOCATIONS } from "./pieces.js";

export const CENTRE_SLOTS = Object.freeze(
  PIECE_LOCATIONS
    .filter((location) => location.type === "centre")
    .map((location, index) =>
      Object.freeze({
        index,
        position: Object.freeze([...location.position]),
        faceletIndex: location.faceletIndices[0]
      })
    )
);

function readCentre(state, slot) {
  const facelet = FACELETS[slot.faceletIndex];

  return {
    position: [...slot.position],
    face: facelet.face,
    colour: state[slot.faceletIndex],
    faceletIndex: slot.faceletIndex
  };
}

/**
 * Extract the colour currently occupying each of the 24 centre positions.
 *
 * Centres of the same colour are indistinguishable here. `position` identifies
 * the location, not a uniquely labelled physical centre cubie.
 */
export function extractCentreState(state) {
  assertValidState(state);

  return CENTRE_SLOTS.map((slot) => readCentre(state, slot));
}

export function centreColourCounts(state) {
  const centres = extractCentreState(state);
  const counts = Object.fromEntries(
    ["U", "R", "F", "D", "L", "B"].map((face) => [face, 0])
  );

  for (const centre of centres) {
    counts[centre.colour]++;
  }

  return counts;
}

/**
 * Check that the centre stickers have the expected colour counts.
 *
 * This is a necessary representation check, not a complete reachability test.
 */
export function hasValidCentreColourCounts(state) {
  const counts = centreColourCounts(state);

  return Object.values(counts).every((count) => count === 4);
}
