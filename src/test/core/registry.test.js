
import test from "node:test";
import assert from "node:assert/strict";

import { createEventRegistry } from "../../core/registry.js";

test("starts with no registered events", () => {
  const registry = createEventRegistry();

  assert.deepEqual(registry.list(), []);
});

test("registers and retrieves an event generator", async () => {
  const registry = createEventRegistry();
  const generator = async (options) => ({
    event: "test",
    seed: options.seed
  });

  registry.register("test", generator);

  assert.equal(registry.get("test"), generator);
  assert.deepEqual(registry.list(), ["test"]);
  assert.deepEqual(await registry.get("test")({ seed: 42 }), {
    event: "test",
    seed: 42
  });
});

test("allows multiple distinct event registrations", () => {
  const registry = createEventRegistry();

  registry.register("333", () => "three");
  registry.register("222", () => "two");

  assert.deepEqual(registry.list(), ["333", "222"]);
});

test("rejects duplicate event IDs", () => {
  const registry = createEventRegistry();

  registry.register("333", () => "first");

  assert.throws(
    () => registry.register("333", () => "second"),
    {
      name: "RangeError",
      message: 'Event "333" is already registered'
    }
  );

  // A failed duplicate registration must not replace the original.
  assert.equal(registry.get("333")(), "first");
});

test("rejects malformed event IDs", () => {
  const registry = createEventRegistry();

  for (const event of ["", "333 OH", "333-oh", "333OH", " 333", null, 333]) {
    assert.throws(
      () => registry.register(event, () => null),
      { name: "TypeError" }
    );
  }
});

test("rejects non-function generators", () => {
  const registry = createEventRegistry();

  for (const generator of [undefined, null, {}, "generator", 42]) {
    assert.throws(
      () => registry.register("333", generator),
      {
        name: "TypeError",
        message: "Event generator must be a function"
      }
    );
  }
});

test("returns a frozen event-list snapshot", () => {
  const registry = createEventRegistry();

  registry.register("333", () => null);
  const snapshot = registry.list();

  assert.equal(Object.isFrozen(snapshot), true);
  assert.throws(() => snapshot.push("222"), TypeError);

  registry.register("222", () => null);

  // Earlier snapshots stay unchanged; new snapshots show new events.
  assert.deepEqual(snapshot, ["333"]);
  assert.deepEqual(registry.list(), ["333", "222"]);
});

test("independent registries do not share registrations", () => {
  const first = createEventRegistry();
  const second = createEventRegistry();

  first.register("333", () => null);

  assert.deepEqual(first.list(), ["333"]);
  assert.deepEqual(second.list(), []);
});
