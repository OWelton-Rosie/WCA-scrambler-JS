import {
  CENTRE_COLOUR_COORDINATE_SIZE,
  CENTRE_COLOUR_MOVES,
  applyCentreColourMaskMoveIndex,
  isCentreColourMask,
  rankCentreColourMask,
  solvedCentreColourMask
} from "./centre-colour-coordinate.js";

const UNVISITED = 0xff;
const TABLES = new Map();

/**
 * Build an exact BFS pattern database for the four centres of one colour.
 * The combinatorial coordinate has C(24,4) masks, but only the solved-goal
 * orbit is reachable using wide turns. Unvisited ranks remain explicitly
 * marked so impossible masks are never assigned a fabricated distance.
 */
export function buildCentreColourPruningTable(colour) {
  const cached = TABLES.get(colour);
  if (cached) {
    return {
      colour,
      coordinateCount: cached.visited,
      maxDistance: cached.maxDistance,
      cached: true
    };
  }

  const start = solvedCentreColourMask(colour);
  const distances = new Uint8Array(CENTRE_COLOUR_COORDINATE_SIZE);
  distances.fill(UNVISITED);
  const queue = new Uint32Array(CENTRE_COLOUR_COORDINATE_SIZE);

  distances[rankCentreColourMask(start)] = 0;
  queue[0] = start;
  let head = 0;
  let tail = 1;
  let maxDistance = 0;

  while (head < tail) {
    const mask = queue[head++];
    const nextDistance = distances[rankCentreColourMask(mask)] + 1;

    for (let moveIndex = 0; moveIndex < CENTRE_COLOUR_MOVES.length; moveIndex++) {
      const next = applyCentreColourMaskMoveIndex(mask, moveIndex);
      const rank = rankCentreColourMask(next);
      if (distances[rank] !== UNVISITED) continue;

      if (tail >= queue.length) {
        throw new Error("Centre-colour BFS exceeded its coordinate-space size");
      }

      distances[rank] = nextDistance;
      queue[tail++] = next;
      if (nextDistance > maxDistance) maxDistance = nextDistance;
    }
  }

  const table = { distances, visited: tail, maxDistance };
  TABLES.set(colour, table);
  return {
    colour,
    coordinateCount: tail,
    maxDistance,
    cached: false
  };
}

export function getCentreColourDistance(mask, colour) {
  if (!isCentreColourMask(mask)) {
    throw new RangeError("Expected a 4-of-24 centre-colour mask");
  }

  buildCentreColourPruningTable(colour);
  const distance = TABLES.get(colour).distances[rankCentreColourMask(mask)];
  if (distance === UNVISITED) {
    throw new RangeError(`Centre-colour mask is outside the ${colour} goal orbit`);
  }
  return distance;
}
