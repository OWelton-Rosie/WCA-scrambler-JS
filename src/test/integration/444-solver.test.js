import assert from "node:assert/strict";
import test from "node:test";

import {
  solve444Bounded,
  solved444State,
  isSolved444State,
  apply444Moves
} from "../../index.js";

test("public API exposes the experimental bounded 4x4 solver with replay-verified output", async () => {
  const input = apply444Moves(solved444State(), ["R", "U", "F2"]);
  const result = await solve444Bounded(input);

  assert.equal(result.solved, true);
  assert.ok(isSolved444State(result.state));
  assert.deepEqual(apply444Moves(input, result.moves), solved444State());
  assert.deepEqual(apply444Moves(solved444State(), ["R", "U", "F2", ...result.moves]), solved444State());
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
