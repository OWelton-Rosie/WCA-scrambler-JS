
function identityPermutation(size) {
  return Array.from({ length: size }, (_, i) => i);
}

const FACE_INDEX = {
  U: 0,
  L: 1,
  R: 2,
  B: 3
};

// Each face turn cycles the three edges incident to that vertex.
const EDGE_CYCLES = {
  U: [0, 1, 2],
  L: [0, 4, 3],
  R: [1, 3, 5],
  B: [2, 4, 5]
};

function createClockwiseTransform(face) {
  const src = identityPermutation(6);
  const flip = Array(6).fill(0);
  const [a, b, c] = EDGE_CYCLES[face];

  // New position a receives c, b receives a, and c receives b.
  src[a] = c;
  src[b] = a;
  src[c] = b;

  // Two edge-orientation changes preserve the orientation parity.
  flip[a] = 1;
  flip[b] = 1;

  return { src, flip };
}

function invertTransform(transform) {
  const src = Array(6).fill(0);

  for (let position = 0; position < 6; position++) {
    src[transform.src[position]] = position;
  }

  const flip = src.map(
    sourcePosition => transform.flip[sourcePosition]
  );

  return { src, flip };
}

const MOVES = {};

for (const face of Object.keys(EDGE_CYCLES)) {
  MOVES[face] = createClockwiseTransform(face);
  MOVES[`${face}'`] = invertTransform(MOVES[face]);
}

export function identityState() {
  return {
    ep: identityPermutation(6),
    eo: Array(6).fill(0),
    tips: Array(4).fill(0)
  };
}

export function permutationParity(permutation) {
  let parity = 0;

  for (let i = 0; i < permutation.length; i++) {
    for (let j = i + 1; j < permutation.length; j++) {
      if (permutation[i] > permutation[j]) {
        parity ^= 1;
      }
    }
  }

  return parity;
}

function isPermutation(values, size) {
  if (!Array.isArray(values) || values.length !== size) {
    return false;
  }

  if (!values.every(
    value =>
      Number.isInteger(value) &&
      value >= 0 &&
      value < size
  )) {
    return false;
  }

  return new Set(values).size === size;
}

function validOrientations(values) {
  return (
    Array.isArray(values) &&
    values.length === 6 &&
    values.every(value => value === 0 || value === 1) &&
    values.reduce((sum, value) => sum + value, 0) % 2 === 0
  );
}

function validTips(tips) {
  return (
    Array.isArray(tips) &&
    tips.length === 4 &&
    tips.every(
      value =>
        Number.isInteger(value) &&
        value >= 0 &&
        value < 3
    )
  );
}

export function isLegalState(state) {
  if (!state || typeof state !== "object") {
    return false;
  }

  return (
    isPermutation(state.ep, 6) &&
    permutationParity(state.ep) === 0 &&
    validOrientations(state.eo) &&
    validTips(state.tips)
  );
}

export function assertLegalState(state) {
  if (!isLegalState(state)) {
    throw new Error("Invalid Pyraminx state");
  }

  return state;
}

/**
 * Apply one Pyraminx move.
 *
 * Uppercase turns affect the three edges and their associated tip.
 * Lowercase turns affect only the corresponding tip.
 */
export function applyMove(state, notation) {
  const match = /^([ULRBulrb])('?)$/.exec(notation);

  if (!match) {
    throw new RangeError(`Unsupported Pyraminx move: "${notation}"`);
  }

  const [, symbol, prime] = match;
  const face = symbol.toUpperCase();
  const tipIndex = FACE_INDEX[face];
  const delta = prime ? 2 : 1;

  const next = {
    ep: [...state.ep],
    eo: [...state.eo],
    tips: [...state.tips]
  };

  if (symbol === symbol.toLowerCase()) {
    next.tips[tipIndex] =
      (next.tips[tipIndex] + delta) % 3;

    return next;
  }

  const transform = MOVES[notation];

  next.ep = transform.src.map(position => state.ep[position]);

  next.eo = transform.src.map(
    (position, index) =>
      state.eo[position] ^ transform.flip[index]
  );

  next.tips[tipIndex] =
    (next.tips[tipIndex] + delta) % 3;

  return next;
}

export function applyAlgorithm(state, notation) {
  const moves = notation.trim() === ""
    ? []
    : notation.trim().split(/\s+/);

  return moves.reduce(
    (current, move) => applyMove(current, move),
    {
      ep: [...state.ep],
      eo: [...state.eo],
      tips: [...state.tips]
    }
  );
}
