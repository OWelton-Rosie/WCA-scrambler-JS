import { generate333 } from "./puzzles/333/scramble.js";
import { generate222 } from "./puzzles/222/scramble.js";
import { generatePyram } from "./puzzles/pyram/scramble.js";

import {
  solvedState as solved444State,
  isValidState as isValid444State,
  isSolved as isSolved444State
} from "./puzzles/444/state.js";

import {
  toReduced3x3Facelets,
  solvedReduced3x3Facelets
} from "./puzzles/444/reduced.js";

import {
  events,
  getEventGenerator,
  registerEvent
} from "./core/registry.js";

registerEvent("333", ({ randomWord } = {}) =>
  generate333(randomWord)
);

registerEvent("222", ({ randomWord } = {}) =>
  generate222(randomWord)
);

registerEvent("pyram", ({ randomWord } = {}) =>
  generatePyram(randomWord)
);

export { events, registerEvent };

export {
  solved444State,
  isValid444State,
  isSolved444State,
  toReduced3x3Facelets,
  solvedReduced3x3Facelets
};

export async function generate(event = "333", options = {}) {
  if (
    !options ||
    typeof options !== "object" ||
    Array.isArray(options)
  ) {
    throw new TypeError("options must be an object");
  }

  if (
    options.randomWord !== undefined &&
    typeof options.randomWord !== "function"
  ) {
    throw new TypeError("options.randomWord must be a function");
  }

  const generator = getEventGenerator(event);

  if (!generator) {
    throw new RangeError(
      `Unsupported event "${event}". Supported events: ${events.join(", ")}`
    );
  }

  return await generator(options);
}