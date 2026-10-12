
function validateEventId(event) {
  if (typeof event !== "string" || !/^[a-z0-9]+$/.test(event)) {
    throw new TypeError(
      "Event ID must be a non-empty lowercase alphanumeric string"
    );
  }
}

function validateGenerator(generator) {
  if (typeof generator !== "function") {
    throw new TypeError("Event generator must be a function");
  }
}

/**
 * Create an independent event registry.
 *
 * Each generator receives an options object and may return its result
 * synchronously or asynchronously.
 */
export function createEventRegistry() {
  const generators = new Map();

  return Object.freeze({
    register(event, generator) {
      validateEventId(event);
      validateGenerator(generator);

      if (generators.has(event)) {
        throw new RangeError(`Event "${event}" is already registered`);
      }

      generators.set(event, generator);
    },

    get(event) {
      return generators.get(event);
    },

    list() {
      return Object.freeze([...generators.keys()]);
    }
  });
}

const registry = createEventRegistry();

/**
 * Register a generator in the package's shared event registry.
 */
export let events = Object.freeze([]);

export function registerEvent(event, generator) {
  registry.register(event, generator);
  events = registry.list();
}

/**
 * Return the generator for an event, or undefined if it is unsupported.
 */
export function getEventGenerator(event) {
  return registry.get(event);
}
