importScripts("shared.js");

const MENU_ID = "send-to-archive";

function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      { [STORAGE_KEY]: DEFAULT_PREFIX, [NEW_TAB_KEY]: false },
      (result) => resolve(result),
    );
  });
}

function normalizePrefix(prefix) {
  return (prefix || "").trim().replace(/\/+$/, "") + "/";
}

async function navigateToArchive(tab) {
  if (!tab?.url) return;
  const url = tab.url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return;
  }
  const settings = await getSettings();
  const base = normalizePrefix(settings[STORAGE_KEY]);
  const archiveUrl = base + url;
  if (settings[NEW_TAB_KEY]) {
    chrome.tabs.create({ url: archiveUrl, index: tab.index + 1 });
  } else {
    chrome.tabs.update(tab.id, { url: archiveUrl });
  }
}

async function createContextMenu() {
  const settings = await getSettings();
  const prefix = normalizePrefix(settings[STORAGE_KEY]);
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: `Send to ${prefix}`,
      contexts: ["page"],
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MENU_ID) {
    navigateToArchive(tab);
  }
});

chrome.action.onClicked.addListener((tab) => {
  navigateToArchive(tab);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes[STORAGE_KEY]) {
    const newPrefix = normalizePrefix(changes[STORAGE_KEY].newValue || DEFAULT_PREFIX);
    chrome.contextMenus.update(MENU_ID, {
      title: `Send to ${newPrefix}`,
    });
  }
});
