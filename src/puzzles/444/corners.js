
import { FACELETS, assertValidState } from "./state.js";

// Conventional corner ordering: URF, UFL, ULB, UBR,
// DFR, DLF, DBL, DRB.
const CORNER_SLOTS = [
  { position: [3, 3, 3], faces: ["U", "R", "F"] },
  { position: [-3, 3, 3], faces: ["U", "F", "L"] },
  { position: [-3, 3, -3], faces: ["U", "L", "B"] },
  { position: [3, 3, -3], faces: ["U", "B", "R"] },
  { position: [3, -3, 3], faces: ["D", "F", "R"] },
  { position: [-3, -3, 3], faces: ["D", "L", "F"] },
  { position: [-3, -3, -3], faces: ["D", "B", "L"] },
  { position: [3, -3, -3], faces: ["D", "R", "B"] }
];

function positionKey(position) {
  return position.join(",");
}

function makeFaceletLookup() {
  const lookup = new Map();

  for (let index = 0; index < FACELETS.length; index++) {
    const facelet = FACELETS[index];

    lookup.set(
      `${positionKey(facelet.position)}|${facelet.face}`,
      index
    );
  }

  return lookup;
}

const FACELET_LOOKUP = makeFaceletLookup();

function getCornerFaceletIndices(slot) {
  return slot.faces.map((face) => {
    const index = FACELET_LOOKUP.get(
      `${positionKey(slot.position)}|${face}`
    );

    if (index === undefined) {
      throw new Error(
        `Missing corner facelet at ${positionKey(slot.position)} on ${face}`
      );
    }

    return index;
  });
}

const CORNER_FACELET_INDICES = CORNER_SLOTS.map(
  getCornerFaceletIndices
);

function signature(colours) {
  return [...colours].sort().join("");
}

function getCornerColours(state, slotIndex) {
  return CORNER_FACELET_INDICES[slotIndex].map(
    (faceletIndex) => state[faceletIndex]
  );
}

function identitySignatures() {
  const solved = FACELETS.map((facelet) => facelet.face);

  return CORNER_SLOTS.map((_, index) =>
    signature(getCornerColours(solved, index))
  );
}

const CORNER_SIGNATURES = identitySignatures();
const CORNER_ID_BY_SIGNATURE = new Map(
  CORNER_SIGNATURES.map((value, index) => [value, index])
);

function isPermutation(values, size) {
  if (!Array.isArray(values) || values.length !== size) {
    return false;
  }

  const seen = new Set(values);

  return (
    seen.size === size &&
    values.every(
      (value) =>
        Number.isInteger(value) &&
        value >= 0 &&
        value < size
    )
  );
}

/**
 * Extract the corner permutation and orientation from a facelet state.
 *
 * cp[position] is the solved corner occupying that position.
 * co[position] is its twist, in the range 0..2.
 */
export function extractCornerState(state) {
  assertValidState(state);

  const cp = [];
  const co = [];

  for (let position = 0; position < CORNER_SLOTS.length; position++) {
    const colours = getCornerColours(state, position);
    const id = CORNER_ID_BY_SIGNATURE.get(signature(colours));

    if (id === undefined) {
      throw new Error(
        `Invalid corner at position ${position}: ${colours.join("")}`
      );
    }

    const udIndex = colours.findIndex(
      (colour) => colour === "U" || colour === "D"
    );

    if (udIndex === -1) {
      throw new Error(
        `Corner at position ${position} has no U/D sticker`
      );
    }

    cp.push(id);
    co.push(udIndex);
  }

  return { cp, co };
}

export function isLegalCornerState(cornerState) {
  if (!cornerState || typeof cornerState !== "object") {
    return false;
  }

  const { cp, co } = cornerState;

  if (
    !isPermutation(cp, 8) ||
    !Array.isArray(co) ||
    co.length !== 8 ||
    !co.every(
      (value) => Number.isInteger(value) && value >= 0 && value < 3
    )
  ) {
    return false;
  }

  return co.reduce((sum, value) => sum + value, 0) % 3 === 0;
}

export function assertLegalCornerState(cornerState) {
  if (!isLegalCornerState(cornerState)) {
    throw new Error("Invalid 4x4 corner state");
  }

  return cornerState;
}

export function identityCornerState() {
  return {
    cp: Array.from({ length: 8 }, (_, index) => index),
    co: Array(8).fill(0)
  };
}

export function cornerPermutationParity(cornerState) {
  assertLegalCornerState(cornerState);

  let parity = 0;

  for (let i = 0; i < cornerState.cp.length; i++) {
    for (let j = i + 1; j < cornerState.cp.length; j++) {
      if (cornerState.cp[i] > cornerState.cp[j]) {
        parity ^= 1;
      }
    }
  }

  return parity;
}
