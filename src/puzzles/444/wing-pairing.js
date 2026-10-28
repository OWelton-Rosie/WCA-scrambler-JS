import { assertValidState } from "./state.js";
import { EDGE_SLOTS, extractWingState } from "./wings.js";

/**
 * Count geometric edges whose two wing pieces carry the same colour pair.
 *
 * This is a pairing diagnostic, not a full reduced-state legality check:
 * matching colour signatures do not by themselves prove that every sticker is
 * aligned to the correct face.
 */
export function countPairedEdges(state) {
  assertValidState(state);
  const wings = extractWingState(state);

  return EDGE_SLOTS.reduce((count, edge) => {
    const [first, second] = edge.wingSlotIndices;
    return count + (wings[first].signature === wings[second].signature ? 1 : 0);
  }, 0);
}

export function areWingsPaired(state) {
  return countPairedEdges(state) === EDGE_SLOTS.length;
}
