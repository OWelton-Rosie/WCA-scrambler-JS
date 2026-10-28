import { FACELETS, solvedState } from "./state.js";
import { getMovePermutation, MOVE_NAMES } from "./moves.js";
import { WING_SLOTS } from "./wings.js";

const FACELET_TO_SLOT = new Map();
for (const slot of WING_SLOTS) {
  slot.faceletIndices.forEach((faceletIndex, localIndex) => {
    FACELET_TO_SLOT.set(faceletIndex, { slotIndex: slot.index, localIndex });
  });
}

function buildWingTransitions() {
  return MOVE_NAMES.map((move) => {
    const permutation = getMovePermutation(move);
    return WING_SLOTS.map((sourceSlot) => {
      const destinations = sourceSlot.faceletIndices.map((index) => permutation[index]);
      const locations = destinations.map((index) => FACELET_TO_SLOT.get(index));

      if (!locations[0] || !locations[1] || locations[0].slotIndex !== locations[1].slotIndex) {
        throw new Error(`Move ${move} did not preserve wing piece geometry`);
      }

      return Object.freeze({
        destinationSlot: locations[0].slotIndex,
        destinationLocalBySourceLocal: Object.freeze(locations.map((location) => location.localIndex))
      });
    });
  });
}

const WING_TRANSITIONS = Object.freeze(buildWingTransitions().map((moves) => Object.freeze(moves)));

function equalColours(a, b) {
  return a.length === b.length && a.every((colour, index) => colour === b[index]);
}

/**
 * Derive the facelet colours of every labelled wing at every slot by
 * propagating the solved piece identities through the independent move model.
 *
 * If the same identity can reach the same slot with different sticker
 * assignments, the assumed permutation-only coordinate is insufficient and
 * module initialisation fails rather than silently inventing an orientation.
 */
function deriveIdentityColourMap() {
  const solved = solvedState();
  const result = [];

  for (const identitySlot of WING_SLOTS) {
    const initialColours = identitySlot.faceletIndices.map((index) => solved[index]);
    const coloursBySlot = Array(WING_SLOTS.length).fill(null);
    coloursBySlot[identitySlot.index] = initialColours;
    const queue = [identitySlot.index];

    for (let head = 0; head < queue.length; head++) {
      const sourceSlot = queue[head];
      const sourceColours = coloursBySlot[sourceSlot];

      for (const moveTransitions of WING_TRANSITIONS) {
        const transition = moveTransitions[sourceSlot];
        const nextColours = Array(2);

        for (let sourceLocal = 0; sourceLocal < 2; sourceLocal++) {
          nextColours[transition.destinationLocalBySourceLocal[sourceLocal]] = sourceColours[sourceLocal];
        }

        const destinationSlot = transition.destinationSlot;
        const previous = coloursBySlot[destinationSlot];

        if (previous === null) {
          coloursBySlot[destinationSlot] = nextColours;
          queue.push(destinationSlot);
        } else if (!equalColours(previous, nextColours)) {
          throw new Error(
            `Wing identity ${identitySlot.index} has path-dependent sticker orientation at slot ${destinationSlot}; permutation-only coordinate is invalid`
          );
        }
      }
    }

    if (coloursBySlot.some((colours) => colours === null)) {
      throw new Error(`Wing identity ${identitySlot.index} cannot reach every wing slot`);
    }

    result.push(Object.freeze(
      coloursBySlot.map((colours) => Object.freeze([...colours]))
    ));
  }

  return Object.freeze(result);
}

export const WING_IDENTITY_COLOURS_BY_SLOT = deriveIdentityColourMap();
