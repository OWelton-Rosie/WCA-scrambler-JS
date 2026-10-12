
import Cube from "cubejs";

import {
  assertLegalState,
  permutationParity
} from "./state.js";

const MOVE_NAMES = [
  "U", "U2", "U'",
  "R", "R2", "R'",
  "F", "F2", "F'"
];

const INVERSE_MOVES = [2, 1, 0, 5, 4, 3, 8, 7, 6];
const MOVE_FACES = [0, 0, 0, 1, 1, 1, 2, 2, 2];

const MOVABLE_CORNERS = [0, 1, 2, 3, 4, 5, 7];
const MOVABLE_POSITIONS = [0, 1, 2, 3, 4, 5, 7];

const PERMUTATION_COUNT = 5040;
const ORIENTATION_COUNT = 729;
const MOVE_COUNT = MOVE_NAMES.length;
const FACTORIALS = [1, 1, 2, 6, 24, 120, 720, 5040];

let tables = null;

function assertFRUState(state) {
  assertLegalState(state);

  if (state.cp[6] !== 6 || state.co[6] !== 0) {
    throw new Error(
      "2×2 state is not reachable using only U, R and F turns"
    );
  }

  return state;
}

function rankPermutation(cp) {
  const permutation = MOVABLE_POSITIONS.map(position => {
    const corner = MOVABLE_CORNERS.indexOf(cp[position]);

    if (corner === -1) {
      throw new Error("Invalid movable-corner permutation");
    }

    return corner;
  });

  let rank = 0;

  for (let i = 0; i < 7; i++) {
    let smaller = 0;

    for (let j = i + 1; j < 7; j++) {
      if (permutation[j] < permutation[i]) {
        smaller++;
      }
    }

    rank += smaller * FACTORIALS[6 - i];
  }

  return rank;
}

function unrankPermutation(rank) {
  const available = Array.from({ length: 7 }, (_, i) => i);
  const abstractPermutation = [];

  for (let i = 0; i < 7; i++) {
    const factorial = FACTORIALS[6 - i];
    const index = Math.floor(rank / factorial);

    rank %= factorial;

    abstractPermutation.push(available.splice(index, 1)[0]);
  }

  const cp = Array(8).fill(0);

  cp[6] = 6;

  for (let i = 0; i < 7; i++) {
    cp[MOVABLE_POSITIONS[i]] =
      MOVABLE_CORNERS[abstractPermutation[i]];
  }

  return cp;
}

function rankOrientation(co) {
  let rank = 0;

  for (let i = 0; i < 6; i++) {
    rank = rank * 3 + co[i];
  }

  return rank;
}

function unrankOrientation(rank) {
  const co = Array(8).fill(0);
  let sum = 0;

  for (let i = 5; i >= 0; i--) {
    co[i] = rank % 3;
    sum += co[i];
    rank = Math.floor(rank / 3);
  }

  co[6] = 0;
  co[7] = (3 - (sum % 3)) % 3;

  return co;
}

function applyPermutationMove(cp, move) {
  return move.cp.map(position => cp[position]);
}

function applyOrientationMove(co, move) {
  return move.cp.map(
    (position, i) => (co[position] + move.co[i]) % 3
  );
}

function buildPruningTable(size, moveTable, name) {
  const distances = new Int8Array(size);
  distances.fill(-1);
  distances[0] = 0;

  const queue = new Int32Array(size);
  let head = 0;
  let tail = 1;

  queue[0] = 0;

  while (head < tail) {
    const coordinate = queue[head++];
    const nextDistance = distances[coordinate] + 1;

    for (let move = 0; move < MOVE_COUNT; move++) {
      const next =
        moveTable[coordinate * MOVE_COUNT + move];

      if (distances[next] !== -1) {
        continue;
      }

      distances[next] = nextDistance;
      queue[tail++] = next;
    }
  }

  if (tail !== size) {
    throw new Error(
      `Incomplete ${name} pruning table: reached ${tail} of ${size} coordinates`
    );
  }

  return distances;
}

function initialiseTables() {
  if (tables) {
    return;
  }

  const moves = MOVE_NAMES.map(notation => {
    const cube = new Cube();
    cube.move(notation);

    return {
      cp: Array.from(cube.cp),
      co: Array.from(cube.co)
    };
  });

  const permutationMoves = new Uint16Array(
    PERMUTATION_COUNT * MOVE_COUNT
  );

  for (
    let coordinate = 0;
    coordinate < PERMUTATION_COUNT;
    coordinate++
  ) {
    const cp = unrankPermutation(coordinate);

    for (let move = 0; move < MOVE_COUNT; move++) {
      const next = applyPermutationMove(cp, moves[move]);

      permutationMoves[
        coordinate * MOVE_COUNT + move
      ] = rankPermutation(next);
    }
  }

  const orientationMoves = new Uint16Array(
    ORIENTATION_COUNT * MOVE_COUNT
  );

  for (
    let coordinate = 0;
    coordinate < ORIENTATION_COUNT;
    coordinate++
  ) {
    const co = unrankOrientation(coordinate);

    for (let move = 0; move < MOVE_COUNT; move++) {
      const next = applyOrientationMove(co, moves[move]);

      orientationMoves[
        coordinate * MOVE_COUNT + move
      ] = rankOrientation(next);
    }
  }

  tables = {
    permutationMoves,
    orientationMoves,

    permutationDistances: buildPruningTable(
      PERMUTATION_COUNT,
      permutationMoves,
      "permutation"
    ),

    orientationDistances: buildPruningTable(
      ORIENTATION_COUNT,
      orientationMoves,
      "orientation"
    )
  };
}

export function initialiseSolver() {
  initialiseTables();
}

export function to333State(state) {
  assertLegalState(state);

  const ep = Array.from({ length: 12 }, (_, i) => i);

  // A 3×3 cube requires matching corner and edge permutation parity.
  if (permutationParity(state.cp) !== 0) {
    [ep[0], ep[1]] = [ep[1], ep[0]];
  }

  return {
    center: [0, 1, 2, 3, 4, 5],
    cp: [...state.cp],
    co: [...state.co],
    ep,
    eo: Array(12).fill(0)
  };
}

export function cubeFromState(state) {
  return new Cube(to333State(state));
}

export function invertSolution(solution) {
  if (typeof solution !== "string") {
    throw new TypeError("Solution must be a string");
  }

  const moves = solution.trim() === ""
    ? []
    : solution.trim().split(/\s+/);

  return moves.reverse().map(move => {
    const index = MOVE_NAMES.indexOf(move);

    if (index === -1) {
      throw new RangeError(`Unsupported 2×2 move: "${move}"`);
    }

    return MOVE_NAMES[INVERSE_MOVES[index]];
  }).join(" ");
}

export function solveState(state) {
  assertFRUState(state);
  initialiseTables();

  const permutation = rankPermutation(state.cp);
  const orientation = rankOrientation(state.co);

  if (permutation === 0 && orientation === 0) {
    return "";
  }

  const {
    permutationMoves,
    orientationMoves,
    permutationDistances,
    orientationDistances
  } = tables;

  const path = [];
  const maxDepth = 20;

  function search(perm, orient, remaining, lastFace) {
    if (perm === 0 && orient === 0) {
      return true;
    }

    const heuristic = Math.max(
      permutationDistances[perm],
      orientationDistances[orient]
    );

    if (heuristic > remaining || remaining === 0) {
      return false;
    }

    for (let move = 0; move < MOVE_COUNT; move++) {
      const face = MOVE_FACES[move];

      // Consecutive turns of the same face can be combined.
      if (face === lastFace) {
        continue;
      }

      const nextPerm =
        permutationMoves[perm * MOVE_COUNT + move];

      const nextOrient =
        orientationMoves[orient * MOVE_COUNT + move];

      path.push(move);

      if (search(nextPerm, nextOrient, remaining - 1, face)) {
        return true;
      }

      path.pop();
    }

    return false;
  }

  const initialDepth = Math.max(
    permutationDistances[permutation],
    orientationDistances[orientation]
  );

  for (let depth = initialDepth; depth <= maxDepth; depth++) {
    path.length = 0;

    if (search(permutation, orientation, depth, -1)) {
      return path.map(move => MOVE_NAMES[move]).join(" ");
    }
  }

  throw new Error(
    "Could not find a 2×2 solution within the search limit."
  );
}
