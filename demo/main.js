import { generate, events } from "../dist/wca-scramble.es.js";
import "./style.css";

const eventSelect = document.querySelector("#event-select");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
const clearHistoryButton = document.querySelector("#clear-history-button");

const scramblePlaceholder = document.querySelector("#scramble-placeholder");
const scrambleNotation = document.querySelector("#scramble-notation");
const moveCount = document.querySelector("#move-count");
const generationTime = document.querySelector("#generation-time");
const statusMessage = document.querySelector("#status-message");

const historyList = document.querySelector("#history-list");
const historyEmpty = document.querySelector("#history-empty");
const stateOutput = document.querySelector("#state-output");
const debugDescription = document.querySelector("#debug-description");

const MAX_HISTORY = 100;

const EVENT_NAMES = {
  "333": "3×3×3",
  "222": "2×2×2",
  "444": "4×4×4",
  pyram: "Pyraminx",
  minx: "Megaminx",
  skewb: "Skewb",
  clock: "Clock",
  "555": "5×5×5",
  "666": "6×6×6",
  "777": "7×7×7",
  sq1: "Square-1",
  "333oh": "3×3×3 One-Handed",
  "333ft": "3×3×3 Fewest Moves",
  "333bf": "3×3×3 Blindfolded",
  "444bf": "4×4×4 Blindfolded",
  "555bf": "5×5×5 Blindfolded",
  "333mbf": "3×3×3 Multi-Blind"
};

const STATE_DESCRIPTIONS = {
  "333": "Raw 3×3 state: corner, edge and centre permutation/orientation data.",
  "222": "Raw 2×2 state: corner permutation (cp) and corner orientation (co).",
  "444": "Raw 4×4 state returned by the library.",
  pyram: "Raw Pyraminx state returned by the library.",
  minx: "Raw Megaminx state returned by the library."
};

let currentScramble = null;
let history = [];
let generating = false;

function eventName(event) {
  return EVENT_NAMES[event] ?? event;
}

function populateEvents() {
  const supportedEvents = [...events];
  const previousSelection = eventSelect.value;

  eventSelect.replaceChildren();

  for (const event of supportedEvents) {
    const option = document.createElement("option");
    option.value = event;
    option.textContent = eventName(event);
    eventSelect.append(option);
  }

  if (supportedEvents.includes(previousSelection)) {
    eventSelect.value = previousSelection;
  } else if (supportedEvents.includes("333")) {
    eventSelect.value = "333";
  }

  const hasEvents = supportedEvents.length > 0;

  eventSelect.disabled = !hasEvents;
  generateButton.disabled = !hasEvents;

  if (!hasEvents) {
    setStatus("No puzzle generators are registered in the library.", "error");
  }
}

function setStatus(message, type = "normal") {
  statusMessage.textContent = message;
  statusMessage.dataset.type = type;
}

function setGenerating(value) {
  generating = value;
  generateButton.disabled = value || events.length === 0;
  eventSelect.disabled = value || events.length === 0;

  generateButton.innerHTML = value
    ? '<span class="spinner" aria-hidden="true"></span> Generating…'
    : '<span aria-hidden="true">↻</span> Generate scramble';
}

function renderScramble(result, elapsedMs) {
  currentScramble = result;

  // Keep the selected event in sync when restoring history.
  eventSelect.value = result.event;

  scramblePlaceholder.hidden = true;
  scrambleNotation.textContent = result.notation;
  scrambleNotation.hidden = false;

  const count = result.moves.length;

  moveCount.textContent =
    `${count} ${count === 1 ? "move" : "moves"}`;

  generationTime.textContent =
    `${elapsedMs.toFixed(0)} ms generation time`;

  copyButton.disabled = false;
  stateOutput.textContent = JSON.stringify(result.state, null, 2);

  debugDescription.textContent =
    STATE_DESCRIPTIONS[result.event] ??
    "Raw puzzle state returned by the library.";
}

function renderHistory() {
  historyList.replaceChildren();
  historyEmpty.hidden = history.length > 0;
  clearHistoryButton.disabled = history.length === 0;

  for (const entry of history) {
    const item = document.createElement("li");
    item.className = "history-item";

    const details = document.createElement("div");
    details.className = "history-item-details";

    const label = document.createElement("span");
    label.className = "history-item-label";
    label.textContent =
      `${eventName(entry.event)} · ${entry.moves.length} moves`;

    const notation = document.createElement("span");
    notation.className = "history-item-notation";
    notation.textContent = entry.notation;

    details.append(label, notation);

    const restoreButton = document.createElement("button");
    restoreButton.className = "history-restore";
    restoreButton.type = "button";
    restoreButton.textContent = "View";
    restoreButton.setAttribute(
      "aria-label",
      `View ${eventName(entry.event)} scramble: ${entry.notation}`
    );

    restoreButton.addEventListener("click", () => {
      renderScramble(entry, entry.elapsedMs);

      setStatus(
        `Loaded a previous ${eventName(entry.event)} scramble from this session.`
      );

      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    item.append(details, restoreButton);
    historyList.append(item);
  }
}

async function generateScramble() {
  if (generating) return;

  if (!events.includes(eventSelect.value)) {
    setStatus("Select a supported puzzle event first.", "error");
    return;
  }

  setGenerating(true);
  setStatus("Generating scramble…");

  const startedAt = performance.now();

  try {
    const event = eventSelect.value;
    const result = await generate(event);
    const elapsedMs = performance.now() - startedAt;

    const entry = {
      ...result,
      elapsedMs,
      generatedAt: new Date().toISOString()
    };

    renderScramble(entry, elapsedMs);

    history = [
      entry,
      ...history.filter(
        previous =>
          previous.notation !== entry.notation ||
          previous.event !== entry.event
      )
    ].slice(0, MAX_HISTORY);

    renderHistory();

    setStatus(
      `${eventName(event)} scramble generated successfully.`,
      "success"
    );
  } catch (error) {
    console.error("Scramble generation failed:", error);

    setStatus(
      error instanceof Error
        ? `Generation failed: ${error.message}`
        : "Generation failed for an unknown reason.",
      "error"
    );
  } finally {
    setGenerating(false);
  }
}

async function copyScramble() {
  if (!currentScramble) return;

  try {
    await navigator.clipboard.writeText(currentScramble.notation);
    setStatus("Scramble copied to clipboard.", "success");
  } catch (error) {
    console.error("Clipboard access failed:", error);

    setStatus(
      "Clipboard access failed. Select the scramble text and copy it manually.",
      "error"
    );
  }
}

function clearHistory() {
  history = [];
  renderHistory();
  setStatus("Session history cleared.");
}

generateButton.addEventListener("click", generateScramble);
copyButton.addEventListener("click", copyScramble);
clearHistoryButton.addEventListener("click", clearHistory);

eventSelect.addEventListener("change", () => {
  setStatus(`Selected event: ${eventName(eventSelect.value)}.`);
});

document.addEventListener("keydown", event => {
  const target = event.target;

  if (
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement ||
    target?.isContentEditable
  ) {
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    generateScramble();
  } else if (event.key.toLowerCase() === "c" && currentScramble) {
    copyScramble();
  }
});

populateEvents();

// Start with a real scramble so the interface is immediately useful.
if (events.length > 0) {
  generateScramble();
} else {
  setStatus("No puzzle generators are registered in the library.", "error");
}