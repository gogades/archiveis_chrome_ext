const DEFAULT_PREFIX = "https://archive.is/";
const STORAGE_KEY = "prefixUrl";
const NEW_TAB_KEY = "openInNewTab";
const MENU_ID = "send-to-archive";

function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      { [STORAGE_KEY]: DEFAULT_PREFIX, [NEW_TAB_KEY]: false },
      (result) => resolve(result),
    );
  });
}

async function navigateToArchive(tab) {
  if (!tab?.url) return;
  const settings = await getSettings();
  const url = settings[STORAGE_KEY] + tab.url;
  if (settings[NEW_TAB_KEY]) {
    chrome.tabs.create({ url, index: tab.index + 1 });
  } else {
    chrome.tabs.update(tab.id, { url });
  }
}

async function createContextMenu() {
  const settings = await getSettings();
  const prefix = settings[STORAGE_KEY];
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
    const newPrefix = changes[STORAGE_KEY].newValue || DEFAULT_PREFIX;
    chrome.contextMenus.update(MENU_ID, {
      title: `Send to ${newPrefix}`,
    });
  }
});
