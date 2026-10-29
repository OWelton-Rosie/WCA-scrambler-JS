import {
  CENTRE_AXIS_COORDINATE_SIZE,
  CENTRE_AXIS_MOVES,
  isCentreAxisMask,
  solvedCentreAxisMask
} from "./centre-axis-coordinate.js";

const MASK_BITS = 24;
const MASK_SPACE_SIZE = 1 << MASK_BITS;
const CHUNK_BITS = 6;
const CHUNK_MASK = (1 << CHUNK_BITS) - 1;
const CHUNK_COUNT = MASK_BITS / CHUNK_BITS;
const UNVISITED = 0xff;
const TABLES = new Map();

function buildMoveLookups() {
  return CENTRE_AXIS_MOVES.map(({ destination }) =>
    Array.from({ length: CHUNK_COUNT }, (_, chunk) => {
      const lookup = new Uint32Array(1 << CHUNK_BITS);

      for (let value = 0; value < lookup.length; value++) {
        let mapped = 0;
        for (let bit = 0; bit < CHUNK_BITS; bit++) {
          if (!(value & (1 << bit))) continue;
          const source = chunk * CHUNK_BITS + bit;
          mapped |= (1 << destination[source]);
        }
        lookup[value] = mapped;
      }

      return lookup;
    })
  );
}

const MOVE_LOOKUPS = buildMoveLookups();

function applyLookup(mask, chunks) {
  let result = 0;
  for (let chunk = 0; chunk < CHUNK_COUNT; chunk++) {
    const value = (mask >>> (chunk * CHUNK_BITS)) & CHUNK_MASK;
    result |= chunks[chunk][value];
  }
  return result;
}

/** Apply one precomputed abstract move to a valid centre-axis mask. */
export function applyCentreAxisMaskMoveIndex(mask, moveIndex) {
  if (!Number.isInteger(mask) || mask < 0 || mask >= MASK_SPACE_SIZE) {
    throw new RangeError("Invalid 24-bit centre-axis mask");
  }
  if (!Number.isInteger(moveIndex) || moveIndex < 0 || moveIndex >= MOVE_LOOKUPS.length) {
    throw new RangeError("Invalid centre-axis move index");
  }
  return applyLookup(mask, MOVE_LOOKUPS[moveIndex]);
}

/**
 * Build an exact BFS distance table for one 8-of-24 centre-axis coordinate.
 * Distances are indexed by the raw 24-bit mask; 0xff denotes an unvisited
 * mask. The table is cached by axis and shared by later lookups.
 */
export function buildCentreAxisPruningTable(axis) {
  const cached = TABLES.get(axis);
  if (cached) {
    return {
      axis,
      coordinateCount: cached.visited,
      maxDistance: cached.maxDistance,
      cached: true
    };
  }

  const start = solvedCentreAxisMask(axis);
  const distances = new Uint8Array(MASK_SPACE_SIZE);
  distances.fill(UNVISITED);
  const queue = new Uint32Array(CENTRE_AXIS_COORDINATE_SIZE);

  distances[start] = 0;
  queue[0] = start;
  let head = 0;
  let tail = 1;
  let maxDistance = 0;

  while (head < tail) {
    const mask = queue[head++];
    const nextDistance = distances[mask] + 1;

    for (const chunks of MOVE_LOOKUPS) {
      const next = applyLookup(mask, chunks);
      if (distances[next] !== UNVISITED) continue;

      if (tail >= queue.length) {
        throw new Error("Centre-axis BFS exceeded the coordinate-space size");
      }

      distances[next] = nextDistance;
      queue[tail++] = next;
      if (nextDistance > maxDistance) maxDistance = nextDistance;
    }
  }

  if (tail !== CENTRE_AXIS_COORDINATE_SIZE) {
    throw new Error(
      `Centre-axis BFS reached ${tail} states; expected ${CENTRE_AXIS_COORDINATE_SIZE}`
    );
  }

  const table = { distances, visited: tail, maxDistance };
  TABLES.set(axis, table);

  return {
    axis,
    coordinateCount: tail,
    maxDistance,
    cached: false
  };
}

/** Return the exact distance for an 8-of-24 mask, building its table if needed. */
export function getCentreAxisDistance(mask, axis) {
  if (!isCentreAxisMask(mask)) {
    throw new RangeError("Expected an 8-of-24 centre-axis mask");
  }

  buildCentreAxisPruningTable(axis);
  const distance = TABLES.get(axis).distances[mask];

  if (distance === UNVISITED) {
    throw new RangeError("Centre-axis mask is outside the solved-state orbit");
  }

  return distance;
}
