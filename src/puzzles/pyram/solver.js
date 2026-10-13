
import {
  assertLegalState,
  identityState,
  applyMove
} from "./state.js";

const MOVES = [
  "U", "U'",
  "L", "L'",
  "R", "R'",
  "B", "B'"
];

const EDGE_STATE_COUNT = 11520;

let distances;

function stateKey(state) {
  return `${state.ep.join(",")}|${state.eo.join(",")}`;
}

function edgeOnlyState(state) {
  return {
    ep: [...state.ep],
    eo: [...state.eo],
    tips: [0, 0, 0, 0]
  };
}

function initialiseTables() {
  if (distances) {
    return;
  }

  const solved = identityState();
  const distanceMap = new Map();
  const queue = [edgeOnlyState(solved)];

  distanceMap.set(stateKey(solved), 0);

  let head = 0;

  while (head < queue.length) {
    const current = queue[head++];
    const currentKey = stateKey(current);
    const nextDistance = distanceMap.get(currentKey) + 1;

    for (const move of MOVES) {
      const next = edgeOnlyState(applyMove(current, move));
      const nextKey = stateKey(next);

      if (distanceMap.has(nextKey)) {
        continue;
      }

      distanceMap.set(nextKey, nextDistance);
      queue.push(next);
    }
  }

  if (distanceMap.size !== EDGE_STATE_COUNT) {
    throw new Error(
      `Incomplete Pyraminx distance table: reached ${distanceMap.size} of ${EDGE_STATE_COUNT} edge states`
    );
  }

  distances = distanceMap;
}

export async function initialiseSolver() {
  initialiseTables();
}

export function distanceToSolved(state) {
  assertLegalState(state);
  initialiseTables();

  const distance = distances.get(stateKey(state));

  if (distance === undefined) {
    throw new Error("Pyraminx state is not reachable by face turns");
  }

  return distance;
}

/**
 * Return a shortest solution for the edge state.
 * Lowercase tip moves are handled separately by scramble.js.
 */
export function solveState(state) {
  assertLegalState(state);
  initialiseTables();

  let current = edgeOnlyState(state);
  let distance = distanceToSolved(state);

  const solution = [];

  while (distance > 0) {
    let foundMove = false;

    for (const move of MOVES) {
      const next = edgeOnlyState(applyMove(current, move));
      const nextDistance = distances.get(stateKey(next));

      if (nextDistance !== distance - 1) {
        continue;
      }

      solution.push(move);
      current = next;
      distance = nextDistance;
      foundMove = true;
      break;
    }

    if (!foundMove) {
      throw new Error("Pyraminx solver could not find a shorter state");
    }
  }

  return solution.join(" ");
}

export function invertSolution(solution) {
  if (typeof solution !== "string") {
    throw new TypeError("Solution must be a string");
  }

  if (solution.trim() === "") {
    return "";
  }

  return solution.trim().split(/\s+/).reverse().map(move => {
    if (move.endsWith("'")) {
      return move.slice(0, -1);
    }

    return `${move}'`;
  }).join(" ");
}
