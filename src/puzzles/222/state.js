
const CORNER_COUNT = 8;
const FIXED_CORNER = 6;

function identityPermutation(size) {
  return Array.from({ length: size }, (_, i) => i);
}

export function identityState() {
  return {
    cp: identityPermutation(CORNER_COUNT),
    co: Array(CORNER_COUNT).fill(0)
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

  const seen = new Set(values);

  return (
    seen.size === size &&
    values.every(
      value =>
        Number.isInteger(value) &&
        value >= 0 &&
        value < size
    )
  );
}

function validCornerOrientations(co) {
  if (
    !Array.isArray(co) ||
    co.length !== CORNER_COUNT ||
    !co.every(
      value =>
        Number.isInteger(value) &&
        value >= 0 &&
        value < 3
    )
  ) {
    return false;
  }

  return (
    co[FIXED_CORNER] === 0 &&
    co.reduce((sum, value) => sum + value, 0) % 3 === 0
  );
}

export function isLegalState(state) {
  if (
    !state ||
    typeof state !== "object" ||
    !isPermutation(state.cp, CORNER_COUNT) ||
    !validCornerOrientations(state.co)
  ) {
    return false;
  }

  // FRU moves preserve this corner in the cubejs ordering.
  return state.cp[FIXED_CORNER] === FIXED_CORNER;
}

export function assertLegalState(state) {
  if (!isLegalState(state)) {
    throw new Error("Invalid 2x2 cube state");
  }

  return state;
}
