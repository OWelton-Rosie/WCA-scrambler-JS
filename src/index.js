
import { generate333 } from "./puzzles/333/scramble.js";

export const events = Object.freeze(["333"]);

/**
 * Generate a scramble for a supported event.
 *
 * @param {string} event
 * @param {{ randomWord?: () => number }} options
 */
export async function generate(event = "333", options = {}) {
  if (event !== "333") {
    throw new RangeError(
      `Unsupported event "${event}". Supported events: ${events.join(", ")}`
    );
  }

  if (
    options.randomWord !== undefined &&
    typeof options.randomWord !== "function"
  ) {
    throw new TypeError("options.randomWord must be a function");
  }

  return generate333(options.randomWord);
}
