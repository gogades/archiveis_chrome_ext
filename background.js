const DEFAULT_PREFIX = "https://archive.is/";
const STORAGE_KEY = "prefixUrl";
const MENU_ID = "send-to-archive";

function getPrefix() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_PREFIX }, (result) => {
      resolve(result[STORAGE_KEY]);
    });
  });
}

async function navigateToArchive(tab) {
  if (!tab?.url) return;
  const prefix = await getPrefix();
  chrome.tabs.update(tab.id, { url: prefix + tab.url });
}

async function createContextMenu() {
  const prefix = await getPrefix();
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
