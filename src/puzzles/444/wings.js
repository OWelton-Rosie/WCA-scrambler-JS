
import { FACELETS, FACES, assertValidState } from "./state.js";
import { PIECE_LOCATIONS } from "./pieces.js";

const FACE_ORDER = new Map(
  FACES.map((face, index) => [face, index])
);

function compareColours(a, b) {
  return FACE_ORDER.get(a) - FACE_ORDER.get(b);
}

export const WING_SLOTS = Object.freeze(
  PIECE_LOCATIONS
    .filter((location) => location.type === "wing")
    .map((location, index) =>
      Object.freeze({
        index,
        position: Object.freeze([...location.position]),
        faceletIndices: Object.freeze([...location.faceletIndices])
      })
    )
);

function edgeSlotKey(position) {
  return position
    .map((coordinate) => Math.abs(coordinate) === 1 ? 0 : coordinate)
    .join(",");
}

/**
 * Group the two wing positions belonging to each geometric edge.
 */
function createEdgeSlots() {
  const groups = new Map();

  for (const wing of WING_SLOTS) {
    const key = edgeSlotKey(wing.position);

    if (!groups.has(key)) {
      groups.set(key, {
        position: key.split(",").map(Number),
        wingSlotIndices: []
      });
    }

    groups.get(key).wingSlotIndices.push(wing.index);
  }

  return [...groups.values()]
    .sort((a, b) => {
      for (let i = 0; i < 3; i++) {
        if (a.position[i] !== b.position[i]) {
          return a.position[i] - b.position[i];
        }
      }

      return 0;
    })
    .map((edge, index) =>
      Object.freeze({
        index,
        position: Object.freeze([...edge.position]),
        wingSlotIndices: Object.freeze([...edge.wingSlotIndices])
      })
    );
}

export const EDGE_SLOTS = Object.freeze(createEdgeSlots());

/**
 * Determine wing orientation using the conventional edge-orientation rule:
 *
 * - If the piece has a U/D colour, orientation is 0 when that sticker is
 *   currently on a U/D face.
 * - Otherwise, orientation is 0 when its F/B colour is on an F/B face.
 *
 * Returns null for colour pairs that cannot represent a legal edge.
 *
 * This is an orientation convention for individual wings; its sum is not
 * claimed to be invariant under arbitrary 4x4 slice turns.
 */
function getWingOrientation(stickers) {
  const udSticker = stickers.find(
    (sticker) => sticker.colour === "U" || sticker.colour === "D"
  );

  if (udSticker) {
    return (
      udSticker.face === "U" || udSticker.face === "D"
    ) ? 0 : 1;
  }

  const fbSticker = stickers.find(
    (sticker) => sticker.colour === "F" || sticker.colour === "B"
  );

  if (!fbSticker) {
    return null;
  }

  return (
    fbSticker.face === "F" || fbSticker.face === "B"
  ) ? 0 : 1;
}

function readWing(state, slot) {
  const stickers = slot.faceletIndices.map((faceletIndex) => {
    const facelet = FACELETS[faceletIndex];

    return {
      face: facelet.face,
      colour: state[faceletIndex],
      normal: [...facelet.normal],
      faceletIndex
    };
  });

  const edgeColours = stickers
    .map((sticker) => sticker.colour)
    .sort(compareColours);

  return {
    position: [...slot.position],
    stickers,
    edgeColours,
    signature: edgeColours.join(""),
    orientation: getWingOrientation(stickers),
    faceletIndices: [...slot.faceletIndices]
  };
}

/**
 * Extract all 24 wings.
 *
 * The signature identifies a colour pair, not a uniquely labelled physical
 * wing: each edge-colour pair occurs twice on a solved 4x4.
 */
export function extractWingState(state) {
  assertValidState(state);

  return WING_SLOTS.map((slot) => readWing(state, slot));
}

export function wingPairCounts(state) {
  const counts = new Map();

  for (const wing of extractWingState(state)) {
    counts.set(
      wing.signature,
      (counts.get(wing.signature) ?? 0) + 1
    );
  }

  return counts;
}

/**
 * Check the structural distribution of edge-colour pairs.
 *
 * This is not a full reachability test.
 */
export function hasValidWingPairCounts(state) {
  const counts = wingPairCounts(state);

  return (
    counts.size === 12 &&
    [...counts.values()].every((count) => count === 2)
  );
}

/**
 * Return the two observed wings in each geometric edge slot.
 */
export function extractReducedEdges(state) {
  const wings = extractWingState(state);

  return EDGE_SLOTS.map((edge) => ({
    position: [...edge.position],
    wings: edge.wingSlotIndices.map((index) => wings[index])
  }));
}
