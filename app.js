const STORAGE_KEY = "simple-pwa-template:name";
const DEFAULT_NAME = "World";

const elements = {
  form: document.querySelector("#greeting-form"),
  input: document.querySelector("#name-input"),
  output: document.querySelector("#greeting-output"),
  resetButton: document.querySelector("#reset-button"),
  status: document.querySelector("#app-status"),
};

const state = {
  name: readStoredName(),
};

function readStoredName() {
  const storedName = window.localStorage.getItem(STORAGE_KEY);
  return normalizeName(storedName);
}

function normalizeName(value) {
  const name = String(value ?? "").trim();
  return name.length > 0 ? name : DEFAULT_NAME;
}

function getGreeting(name) {
  return `Hello, ${name}!`;
}

function saveName(name) {
  if (name === DEFAULT_NAME) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, name);
}

function setStatus(message) {
  elements.status.textContent = message;
}

function render() {
  elements.input.value = state.name === DEFAULT_NAME ? "" : state.name;
  elements.output.textContent = getGreeting(state.name);
}

function updateName(value) {
  state.name = normalizeName(value);
  saveName(state.name);
  render();
}

function handleSubmit(event) {
  event.preventDefault();
  updateName(elements.input.value);
}

function handleReset() {
  updateName(DEFAULT_NAME);
  elements.input.focus();
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    setStatus("Offline cache is not available in this browser.");
    return;
  }

  try {
    await navigator.serviceWorker.register("./sw.js");
    setStatus("Ready for offline use after the first successful load.");
  } catch (error) {
    console.warn("Service worker registration failed.", error);
    setStatus("App is running without offline cache.");
  }
}

function bindEvents() {
  elements.form.addEventListener("submit", handleSubmit);
  elements.resetButton.addEventListener("click", handleReset);
}

function startApp() {
  bindEvents();
  render();
  registerServiceWorker();
}

startApp();
