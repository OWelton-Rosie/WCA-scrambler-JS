import { assertValidState, FACELETS, FACES, solvedState } from "./state.js";

const COORDINATES = [-1, 0, 1];

function faceletKey(position, normal) {
  return `${position.join(",")}|${normal.join(",")}`;
}

/**
 * Create facelets in standard 3x3 URFDLB order.
 *
 * Each face is listed row by row, using the conventional orientation
 * expected by cubejs when parsing a facelet string.
 */
function createReducedFacelets() {
  const facelets = [];

  for (const face of FACES) {
    const normal = FACELETS.find(
      (facelet) => facelet.face === face
    ).normal;

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const r = COORDINATES[row];
        const c = COORDINATES[column];
        let position;

        switch (face) {
          case "U":
            position = [c, 1, r];
            break;
          case "R":
            position = [1, -r, -c];
            break;
          case "F":
            position = [c, -r, 1];
            break;
          case "D":
            position = [c, -1, -r];
            break;
          case "L":
            position = [-1, -r, c];
            break;
          case "B":
            position = [-c, -r, -1];
            break;
        }

        facelets.push({
          face,
          position,
          normal,
          key: faceletKey(position, normal)
        });
      }
    }
  }

  return facelets;
}

const REDUCED_FACELETS = createReducedFacelets();

const REDUCED_FACELET_INDEX = new Map(
  REDUCED_FACELETS.map((facelet, index) => [facelet.key, index])
);

function reduceCoordinate(value) {
  if (value === -3) return -1;
  if (value === 3) return 1;
  return 0;
}

/**
 * Convert a fully reduced 4x4 facelet state into a 54-character
 * 3x3 facelet string in standard cubejs URFDLB order.
 *
 * Requires solved centres and correctly paired wings.
 */
export function toReduced3x3Facelets(state) {
  assertValidState(state);

  const groups = REDUCED_FACELETS.map(() => []);

  for (let i = 0; i < FACELETS.length; i++) {
    const facelet = FACELETS[i];

    const position = facelet.position.map(reduceCoordinate);
    const targetKey = faceletKey(position, facelet.normal);
    const targetIndex = REDUCED_FACELET_INDEX.get(targetKey);

    if (targetIndex === undefined) {
      throw new Error("Could not map a 4x4 sticker to the 3x3 layout");
    }

    groups[targetIndex].push(state[i]);
  }

  const result = [];

  for (let i = 0; i < REDUCED_FACELETS.length; i++) {
    const target = REDUCED_FACELETS[i];
    const stickers = groups[i];

    if (stickers.length === 0) {
      throw new Error(`Missing stickers for reduced ${target.face} facelet`);
    }

    const colour = stickers[0];

    if (!stickers.every((sticker) => sticker === colour)) {
      throw new Error(
        `4x4 is not reduced: stickers disagree at ` +
        `${target.face} facelet ${target.position.join(",")}`
      );
    }

    const isCentre = target.position.filter(
      (coordinate) => coordinate === 0
    ).length === 2;

    if (isCentre && colour !== target.face) {
      throw new Error(
        `4x4 centres are not solved: expected ${target.face}, got ${colour}`
      );
    }

    result.push(colour);
  }

  return result.join("");
}

/**
 * Return the reduced facelet string for a solved 4x4.
 */
export function solvedReduced3x3Facelets() {
  return toReduced3x3Facelets(solvedState());
}
