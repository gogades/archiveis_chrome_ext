const DEFAULT_PREFIX = "https://archive.is/";
const STORAGE_KEY = "prefixUrl";

const prefixInput = document.getElementById("prefix");
const saveButton = document.getElementById("save");
const statusLabel = document.getElementById("status");

function loadOptions() {
  chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_PREFIX }, (result) => {
    prefixInput.value = result[STORAGE_KEY];
  });
}

function saveOptions() {
  const value = prefixInput.value.trim() || DEFAULT_PREFIX;
  chrome.storage.sync.set({ [STORAGE_KEY]: value }, () => {
    statusLabel.classList.add("visible");
    setTimeout(() => statusLabel.classList.remove("visible"), 1500);
  });
}

document.addEventListener("DOMContentLoaded", loadOptions);
saveButton.addEventListener("click", saveOptions);
