
export function identityState() {
  return {
    center: Array.from({ length: 6 }, (_, i) => i),
    cp: Array.from({ length: 8 }, (_, i) => i),
    co: Array(8).fill(0),
    ep: Array.from({ length: 12 }, (_, i) => i),
    eo: Array(12).fill(0)
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
      (value) =>
        Number.isInteger(value) &&
        value >= 0 &&
        value < size
    )
  );
}

function validOrientations(values, size, modulus) {
  if (
    !Array.isArray(values) ||
    values.length !== size ||
    !values.every(
      (value) =>
        Number.isInteger(value) &&
        value >= 0 &&
        value < modulus
    )
  ) {
    return false;
  }

  return values.reduce((sum, value) => sum + value, 0) % modulus === 0;
}

export function isLegalState(state) {
  if (!state || typeof state !== "object") {
    return false;
  }

  const { cp, co, ep, eo } = state;

  if (
    !isPermutation(cp, 8) ||
    !isPermutation(ep, 12) ||
    !validOrientations(co, 8, 3) ||
    !validOrientations(eo, 12, 2)
  ) {
    return false;
  }

  return permutationParity(cp) === permutationParity(ep);
}

export function assertLegalState(state) {
  if (!isLegalState(state)) {
    throw new Error("Invalid 3x3 cube state");
  }

  return state;
}
