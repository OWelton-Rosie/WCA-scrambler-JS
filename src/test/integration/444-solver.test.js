import assert from "node:assert/strict";
import test from "node:test";

import {
  solve444Bounded,
  solved444State,
  isSolved444State
} from "../../index.js";
import { applyMoves } from "../../puzzles/444/moves.js";

test("public API exposes the experimental bounded 4x4 solver with replay-verified output", async () => {
  const input = applyMoves(solved444State(), ["R", "U", "Rw", "F2"]);
  const result = await solve444Bounded(input, {
    centreMaxDepth: 8,
    centreMaxNodes: 250_000,
    wingMaxMacroDepth: 4,
    wingMaxNodes: 25_000,
    wingBeamWidth: 300,
    wingFallbackMaxMacroDepth: 5,
    wingFallbackMaxNodes: 100_000
  });

  assert.equal(result.solved, true);
  assert.ok(isSolved444State(result.state));
  assert.deepEqual(applyMoves(input, result.moves), solved444State());
  assert.deepEqual(applyMoves(solved444State(), ["R", "U", "Rw", "F2", ...result.moves]), solved444State());
});

test("public bounded solver rejects invalid facelet representations", async () => {
  await assert.rejects(
    solve444Bounded(["not", "a", "96-sticker-state"]),
    {
      name: "TypeError",
      message: /Invalid 4x4 facelet state/
    }
  );
});
