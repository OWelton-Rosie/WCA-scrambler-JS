import { generate, events } from "../src/index.js";
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

const MAX_HISTORY = 10;

let currentScramble = null;
let history = [];
let generating = false;

function setStatus(message, type = "normal") {
  statusMessage.textContent = message;
  statusMessage.dataset.type = type;
}

function setGenerating(value) {
  generating = value;
  generateButton.disabled = value;
  eventSelect.disabled = value;

  generateButton.innerHTML = value
    ? '<span class="spinner" aria-hidden="true"></span> Generating…'
    : '<span aria-hidden="true">↻</span> Generate scramble';
}

function renderScramble(result, elapsedMs) {
  currentScramble = result;

  scramblePlaceholder.hidden = true;
  scrambleNotation.textContent = result.notation;
  scrambleNotation.hidden = false;

  moveCount.textContent =
    `${result.moves.length} ${result.moves.length === 1 ? "move" : "moves"}`;

  generationTime.textContent =
    `${elapsedMs.toFixed(0)} ms generation time`;

  copyButton.disabled = false;
  stateOutput.textContent = JSON.stringify(result.state, null, 2);
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
    label.textContent = `${entry.event} · ${entry.moves.length} moves`;

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
      `View scramble ${entry.notation}`
    );

    restoreButton.addEventListener("click", () => {
      renderScramble(entry, entry.elapsedMs);
      setStatus("Loaded a previous scramble from this session.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    item.append(details, restoreButton);
    historyList.append(item);
  }
}

async function generateScramble() {
  if (generating) return;

  setGenerating(true);
  setStatus("Sampling a state and calculating the scramble…");

  const startedAt = performance.now();

  try {
    const event = eventSelect.value;

    if (!events.includes(event)) {
      throw new Error(`The "${event}" event is not implemented yet.`);
    }

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
        (previous) =>
          previous.notation !== entry.notation ||
          previous.event !== entry.event
      )
    ].slice(0, MAX_HISTORY);

    renderHistory();

    setStatus("Scramble generated and verified by the library.");
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
  setStatus(`Selected event: ${eventSelect.selectedOptions[0].textContent}`);
});

document.addEventListener("keydown", (event) => {
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

// Start with a real scramble so the interface is immediately useful.
generateScramble();
