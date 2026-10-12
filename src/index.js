
import { generate333 } from "./puzzles/333/scramble.js";
import {
  events,
  getEventGenerator,
  registerEvent
} from "./core/registry.js";

// Register built-in events in one place.
registerEvent("333", ({ randomWord } = {}) => generate333(randomWord));

export { events, registerEvent };

/**
 * Generate a scramble for a registered event.
 *
 * @param {string} event
 * @param {object} options
 * @returns {Promise<object>}
 */
export async function generate(event = "333", options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
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
