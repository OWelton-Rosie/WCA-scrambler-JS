import { performance } from "node:perf_hooks";

const SLOT_COUNT = 24;
const BINOMIAL = (() => {
  const table = [];
  for (let n = 0; n <= SLOT_COUNT; n += 1) {
    const row = new Array(SLOT_COUNT + 2).fill(0);
    row[0] = 1;
    for (let k = 1; k <= SLOT_COUNT + 1; k += 1) {
      row[k] = (table[n - 1]?.[k] ?? 0) + (table[n - 1]?.[k - 1] ?? 0);
    }
    table.push(row);
  }
  return table;
})();

function rankSubsetOriginal(mask, size) {
  let rank = 0;
  let index = 1;
  for (let bits = mask; bits !== 0; bits &= bits - 1) {
    const slot = 31 - Math.clz32(bits & -bits);
    rank += BINOMIAL[slot][index];
    index += 1;
  }
  if (index !== size + 1) throw new Error(`expected ${size} bits, got ${index - 1}`);
  return rank;
}

const POPCOUNT = new Uint8Array(256);
for (let byte = 1; byte < 256; byte += 1) {
  POPCOUNT[byte] = POPCOUNT[byte >> 1] + (byte & 1);
}

const RANK_LOOKUP = new Float64Array(3 * 25 * 256);
for (let chunk = 0; chunk < 3; chunk += 1) {
  for (let prefixCount = 0; prefixCount <= 24; prefixCount += 1) {
    for (let byte = 0; byte < 256; byte += 1) {
      let rank = 0;
      let ordinal = prefixCount;
      for (let bit = 0; bit < 8; bit += 1) {
        if ((byte & (1 << bit)) === 0) continue;
        ordinal += 1;
        rank += BINOMIAL[chunk * 8 + bit][ordinal];
      }
      RANK_LOOKUP[(chunk * 25 + prefixCount) * 256 + byte] = rank;
    }
  }
}

function rankSubsetLookup(mask, size) {
  const low = mask & 0xff;
  const middle = (mask >>> 8) & 0xff;
  const high = (mask >>> 16) & 0xff;
  const lowCount = POPCOUNT[low];
  const middleCount = POPCOUNT[middle];
  const highCount = POPCOUNT[high];
  const totalCount = lowCount + middleCount + highCount;
  if (totalCount !== size) throw new Error(`expected ${size} bits, got ${totalCount}`);

  return (
    RANK_LOOKUP[low] +
    RANK_LOOKUP[(25 + lowCount) * 256 + middle] +
    RANK_LOOKUP[(50 + lowCount + middleCount) * 256 + high]
  );
}

function* combinations(n, k, start = 0, mask = 0) {
  if (k === 0) {
    yield mask;
    return;
  }
  for (let slot = start; slot <= n - k; slot += 1) {
    yield* combinations(n, k - 1, slot + 1, mask | (1 << slot));
  }
}

for (const size of [8, 12]) {
  let count = 0;
  const started = performance.now();
  for (const mask of combinations(SLOT_COUNT, size)) {
    const original = rankSubsetOriginal(mask, size);
    const lookup = rankSubsetLookup(mask, size);
    if (original !== lookup) throw new Error(`rank mismatch for mask ${mask}: ${original} !== ${lookup}`);
    count += 1;
  }
  console.log(`Exactness: all ${count.toLocaleString()} size-${size} masks match (${(performance.now() - started).toFixed(0)} ms)`);
}

function randomMaskOfSize(size) {
  const slots = Array.from({ length: SLOT_COUNT }, (_, index) => index);
  for (let index = slots.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [slots[index], slots[other]] = [slots[other], slots[index]];
  }
  let mask = 0;
  for (let index = 0; index < size; index += 1) mask |= 1 << slots[index];
  return mask;
}

const masks = Array.from({ length: 200_000 }, () => randomMaskOfSize(8));
const repetitions = 10;

for (const [name, rank] of [["original", rankSubsetOriginal], ["byte lookup", rankSubsetLookup]]) {
  let checksum = 0;
  for (let pass = 0; pass < 3; pass += 1) {
    for (const mask of masks) checksum += rank(mask, 8);
  }
  const started = performance.now();
  for (let pass = 0; pass < repetitions; pass += 1) {
    for (const mask of masks) checksum += rank(mask, 8);
  }
  console.log(`${name}: ${(performance.now() - started).toFixed(1)} ms for ${(masks.length * repetitions).toLocaleString()} calls; checksum=${checksum}`);
}
