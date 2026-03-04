const DEFAULT_PREFIX = "https://archive.is/";
const STORAGE_KEY = "prefixUrl";
const NEW_TAB_KEY = "openInNewTab";

const prefixInput = document.getElementById("prefix");
const newTabCheckbox = document.getElementById("newTab");
const saveButton = document.getElementById("save");
const statusLabel = document.getElementById("status");
const shortcutsLink = document.getElementById("shortcuts-link");

function loadOptions() {
  chrome.storage.sync.get(
    { [STORAGE_KEY]: DEFAULT_PREFIX, [NEW_TAB_KEY]: false },
    (result) => {
      prefixInput.value = result[STORAGE_KEY];
      newTabCheckbox.checked = result[NEW_TAB_KEY];
    },
  );
}

function saveOptions() {
  const prefix = prefixInput.value.trim() || DEFAULT_PREFIX;
  const openInNewTab = newTabCheckbox.checked;
  chrome.storage.sync.set({ [STORAGE_KEY]: prefix, [NEW_TAB_KEY]: openInNewTab }, () => {
    statusLabel.classList.add("visible");
    setTimeout(() => statusLabel.classList.remove("visible"), 1500);
  });
}

shortcutsLink.addEventListener("click", (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});

document.addEventListener("DOMContentLoaded", loadOptions);
saveButton.addEventListener("click", saveOptions);
