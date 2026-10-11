
const UINT32_RANGE = 0x100000000;

function defaultRandomWord() {
  const crypto = globalThis.crypto;

  if (!crypto?.getRandomValues) {
    throw new Error(
      "Web Crypto is required. Use a secure browser context or a supported Node.js runtime."
    );
  }

  const word = new Uint32Array(1);
  crypto.getRandomValues(word);
  return word[0];
}

export function randomInt(maxExclusive, randomWord = defaultRandomWord) {
  if (
    !Number.isSafeInteger(maxExclusive) ||
    maxExclusive < 1 ||
    maxExclusive > UINT32_RANGE
  ) {
    throw new RangeError("Invalid random integer range");
  }

  const limit =
    Math.floor(UINT32_RANGE / maxExclusive) * maxExclusive;

  while (true) {
    const word = randomWord();

    if (
      !Number.isInteger(word) ||
      word < 0 ||
      word >= UINT32_RANGE
    ) {
      throw new RangeError("Random source must return a uint32");
    }

    if (word < limit) {
      return word % maxExclusive;
    }
  }
}

export function shuffle(values, randomWord = defaultRandomWord) {
  const result = [...values];

  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1, randomWord);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function randomPermutation(size, randomWord) {
  if (!Number.isSafeInteger(size) || size < 1) {
    throw new RangeError("Permutation size must be a positive integer");
  }

  return shuffle(
    Array.from({ length: size }, (_, i) => i),
    randomWord
  );
}
