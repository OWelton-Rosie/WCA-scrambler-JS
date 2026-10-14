
const COORDINATES = [-3, -1, 1, 3];

export const FACES = ["U", "R", "F", "D", "L", "B"];

export const FACE_COLOURS = Object.freeze({
  U: "U",
  R: "R",
  F: "F",
  D: "D",
  L: "L",
  B: "B"
});

const FACE_NORMALS = Object.freeze({
  U: [0, 1, 0],
  R: [1, 0, 0],
  F: [0, 0, 1],
  D: [0, -1, 0],
  L: [-1, 0, 0],
  B: [0, 0, -1]
});

function faceletKey(position, normal) {
  return `${position.join(",")}|${normal.join(",")}`;
}

function createFacelets() {
  const facelets = [];

  for (const face of FACES) {
    const normal = FACE_NORMALS[face];

    for (const a of COORDINATES) {
      for (const b of COORDINATES) {
        let position;

        switch (face) {
          case "U":
            position = [a, 3, b];
            break;
          case "R":
            position = [3, b, a];
            break;
          case "F":
            position = [a, b, 3];
            break;
          case "D":
            position = [a, -3, -b];
            break;
          case "L":
            position = [-3, b, -a];
            break;
          case "B":
            position = [-a, b, -3];
            break;
        }

        facelets.push(
          Object.freeze({
            position: Object.freeze(position),
            normal: Object.freeze([...normal]),
            face,
            key: faceletKey(position, normal)
          })
        );
      }
    }
  }

  return Object.freeze(facelets);
}

export const FACELETS = createFacelets();

export const FACELET_INDEX = new Map(
  FACELETS.map((facelet, index) => [facelet.key, index])
);

export const FACELET_COUNT = FACELETS.length;

export function solvedState() {
  return FACELETS.map((facelet) => facelet.face);
}

export function cloneState(state) {
  assertValidState(state);
  return [...state];
}

/**
 * Validate the representation of a 4x4 facelet state.
 *
 * This checks sticker count, colour names and colour counts.
 * It does not prove that the state is reachable by legal moves.
 */
export function isValidState(state) {
  if (!Array.isArray(state) || state.length !== FACELET_COUNT) {
    return false;
  }

  const counts = Object.fromEntries(
    FACES.map((face) => [face, 0])
  );

  for (const colour of state) {
    if (!Object.hasOwn(counts, colour)) {
      return false;
    }

    counts[colour]++;
  }

  return FACES.every((face) => counts[face] === 16);
}

export function assertValidState(state) {
  if (!isValidState(state)) {
    throw new TypeError(
      "Invalid 4x4 facelet state: expected 96 stickers " +
      "with exactly 16 stickers of each face colour"
    );
  }

  return state;
}

export function isSolved(state) {
  if (!isValidState(state)) {
    return false;
  }

  return state.every(
    (colour, index) => colour === FACELETS[index].face
  );
}
