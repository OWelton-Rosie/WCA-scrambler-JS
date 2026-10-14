
import {
  FACELETS,
  FACELET_INDEX,
  assertValidState
} from "./state.js";

const FACE_MOVES = Object.freeze({
  R: { axis: 0, layers: [3], direction: -1 },
  L: { axis: 0, layers: [-3], direction: 1 },
  U: { axis: 1, layers: [3], direction: -1 },
  D: { axis: 1, layers: [-3], direction: 1 },
  F: { axis: 2, layers: [3], direction: -1 },
  B: { axis: 2, layers: [-3], direction: 1 }
});

const FACE_NAMES = Object.keys(FACE_MOVES);

function normaliseMoveName(move) {
  if (typeof move !== "string") {
    throw new TypeError("Move must be a string");
  }

  const match = move.match(
    /^(2[URFDLB]|[URFDLB]w|[urfdlb]|[URFDLB])([2']?)$/
  );

  if (!match) {
    throw new RangeError(`Invalid 4x4 move "${move}"`);
  }

  let [, notation, suffix] = match;

  // Lowercase wide-turn aliases: r -> Rw, u -> Uw, etc.
  if (/^[urfdlb]$/.test(notation)) {
    notation = `${notation.toUpperCase()}w`;
  }

  let face;
  let layerType;

  if (notation.startsWith("2")) {
    face = notation[1];
    layerType = "inner";
  } else if (notation.endsWith("w")) {
    face = notation[0];
    layerType = "wide";
  } else {
    face = notation;
    layerType = "outer";
  }

  const base = FACE_MOVES[face];

  let layers = base.layers;

  if (layerType === "inner") {
    layers = [base.direction === 1 ? -1 : 1];
  } else if (layerType === "wide") {
    layers = [
      base.layers[0],
      base.layers[0] - Math.sign(base.layers[0]) * 2
    ];
  }

  let turns = suffix === "2" ? 2 : 1;

  if (suffix === "'") {
    turns = -1;
  }

return {
  axis: base.axis,
  layers,
  quarterTurns: base.direction * turns,
  notation,
  suffix
};
}

function rotateVector(vector, axis, direction) {
  const [x, y, z] = vector;

  if (axis === 0) {
    return direction === 1
      ? [x, -z, y]
      : [x, z, -y];
  }

  if (axis === 1) {
    return direction === 1
      ? [z, y, -x]
      : [-z, y, x];
  }

  return direction === 1
    ? [-y, x, z]
    : [y, -x, z];
}

function rotateFacelet(facelet, axis, quarterTurns) {
  let position = [...facelet.position];
  let normal = [...facelet.normal];

  const direction = Math.sign(quarterTurns);
  const turns = Math.abs(quarterTurns) % 4;

  for (let i = 0; i < turns; i++) {
    position = rotateVector(position, axis, direction);
    normal = rotateVector(normal, axis, direction);
  }

  return { position, normal };
}

export function parseMove(move) {
  return normaliseMoveName(move);
}

/**
 * Apply one legal 4x4 layer turn to a facelet state.
 *
 * Returns a new array; the input state is not mutated.
 */
export function applyMove(state, move) {
  assertValidState(state);

  const { axis, layers, quarterTurns } = parseMove(move);
  const next = Array(state.length);

  for (let sourceIndex = 0; sourceIndex < FACELETS.length; sourceIndex++) {
    const facelet = FACELETS[sourceIndex];
    const coordinate = facelet.position[axis];

    let destinationKey = facelet.key;

    if (layers.includes(coordinate)) {
      const rotated = rotateFacelet(facelet, axis, quarterTurns);

      destinationKey =
        `${rotated.position.join(",")}|${rotated.normal.join(",")}`;
    }

    const destinationIndex = FACELET_INDEX.get(destinationKey);

    if (destinationIndex === undefined) {
      throw new Error(
        `Internal move error: no destination for facelet ${facelet.key}`
      );
    }

    next[destinationIndex] = state[sourceIndex];
  }

  return next;
}

/**
 * Apply a sequence of moves, either as an array or space-separated string.
 */
export function applyMoves(state, moves) {
  const sequence = typeof moves === "string"
    ? moves.trim().split(/\s+/).filter(Boolean)
    : moves;

  if (!Array.isArray(sequence)) {
    throw new TypeError("Moves must be an array or a space-separated string");
  }

  return sequence.reduce(
    (current, move) => applyMove(current, move),
    state
  );
}

export function invertMoves(moves) {
  const sequence = typeof moves === "string"
    ? moves.trim().split(/\s+/).filter(Boolean)
    : moves;

  if (!Array.isArray(sequence)) {
    throw new TypeError(
      "Moves must be an array or a space-separated string"
    );
  }

  return sequence
    .slice()
    .reverse()
    .map((move) => {
      const parsed = parseMove(move);

      if (parsed.suffix === "2") {
        return `${parsed.notation}2`;
      }

      return parsed.suffix === "'"
        ? parsed.notation
        : `${parsed.notation}'`;
    });
}

export const MOVE_NAMES = Object.freeze(
  FACE_NAMES.flatMap((face) => [
    face,
    `${face}'`,
    `${face}2`,
    `${face}w`,
    `${face}w'`,
    `${face}w2`,
    `2${face}`,
    `2${face}'`,
    `2${face}2`
  ])
);
