import test from "node:test";
import assert from "node:assert/strict";

import { sample444CentreColours } from "../../puzzles/444/centre-sampler.js";

test("samples exactly four centres of each colour", () => {
  for (let i = 0; i < 1000; i++) {
    const colours = sample444CentreColours();
    assert.equal(colours.length, 24);

    for (const colour of ["U", "R", "F", "D", "L", "B"]) {
      assert.equal(colours.filter((value) => value === colour).length, 4);
    }
  }
});

test("centre sampler is reproducible with a deterministic random source", () => {
  const makeSource = () => {
    let word = 0;
    return () => word++ >>> 0;
  };

  assert.deepEqual(
    sample444CentreColours({ randomWord: makeSource() }),
    sample444CentreColours({ randomWord: makeSource() })
  );
});

test("rejects a malformed random word", () => {
  assert.throws(
    () => sample444CentreColours({ randomWord: () => -1 }),
    RangeError
  );
});
