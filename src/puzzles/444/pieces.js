
import {
  FACES,
  FACELETS,
  assertValidState
} from "./state.js";

const FACE_ORDER = new Map(
  FACES.map((face, index) => [face, index])
);

function comparePositions(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }

  return 0;
}

function classifyPosition(position) {
  const outerAxes = position.filter(
    (coordinate) => Math.abs(coordinate) === 3
  ).length;

  switch (outerAxes) {
    case 3:
      return "corner";
    case 2:
      return "wing";
    case 1:
      return "centre";
    default:
      throw new Error(
        `Invalid surface cubie position: ${position.join(",")}`
      );
  }
}

function groupFacelets() {
  const groups = new Map();

  for (let index = 0; index < FACELETS.length; index++) {
    const facelet = FACELETS[index];
    const key = facelet.position.join(",");

    if (!groups.has(key)) {
      groups.set(key, {
        position: [...facelet.position],
        faceletIndices: []
      });
    }

    groups.get(key).faceletIndices.push(index);
  }

  return [...groups.values()]
    .sort((a, b) => comparePositions(a.position, b.position))
    .map((group) => ({
      ...group,
      type: classifyPosition(group.position),
      faceletIndices: group.faceletIndices.sort(
        (a, b) => FACE_ORDER.get(FACELETS[a].face) -
                  FACE_ORDER.get(FACELETS[b].face)
      )
    }));
}

/**
 * Geometric locations on a 4x4 cube.
 *
 * These describe locations, not uniquely labelled physical cubies.
 */
export const PIECE_LOCATIONS = Object.freeze(
  groupFacelets().map((group) =>
    Object.freeze({
      position: Object.freeze([...group.position]),
      type: group.type,
      faceletIndices: Object.freeze([...group.faceletIndices])
    })
  )
);

const EXPECTED_COUNTS = Object.freeze({
  corner: 8,
  centre: 24,
  wing: 24
});

function pieceSignature(type, stickers) {
  if (type === "corner" || type === "wing") {
    return stickers.map((sticker) => sticker.colour).sort().join("");
  }

  return stickers[0].colour;
}

/**
 * Extract observable corner, centre and wing data from a facelet state.
 *
 * Corner and wing signatures are based on sticker colours. Identical
 * signatures do not imply that two physical pieces can be distinguished.
 *
 * This function validates sticker counts, but does not establish full
 * reachability or assign cubie orientation coordinates.
 */
export function extractPieces(state) {
  assertValidState(state);

  const result = {
    corners: [],
    centres: [],
    wings: []
  };

  for (const location of PIECE_LOCATIONS) {
    const stickers = location.faceletIndices.map((index) => ({
      index,
      face: FACELETS[index].face,
      normal: [...FACELETS[index].normal],
      colour: state[index]
    }));

    const piece = {
      position: [...location.position],
      stickers,
      signature: pieceSignature(location.type, stickers)
    };

    if (location.type === "corner") {
      result.corners.push(piece);
    } else if (location.type === "centre") {
      result.centres.push(piece);
    } else {
      result.wings.push(piece);
    }
  }

  return result;
}

export function extractCorners(state) {
  return extractPieces(state).corners;
}

export function extractCentres(state) {
  return extractPieces(state).centres;
}

export function extractWings(state) {
  return extractPieces(state).wings;
}

export function pieceCounts(state) {
  const pieces = extractPieces(state);

  return {
    corners: pieces.corners.length,
    centres: pieces.centres.length,
    wings: pieces.wings.length
  };
}

export function hasExpectedPieceCounts(state) {
  const counts = pieceCounts(state);

  return (
    counts.corners === EXPECTED_COUNTS.corner &&
    counts.centres === EXPECTED_COUNTS.centre &&
    counts.wings === EXPECTED_COUNTS.wing
  );
}
