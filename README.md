# Send to Archive — Chrome Extension

Prepend a configurable URL prefix to the current page and navigate to it.  
Default prefix: `https://archive.is/`

## Installation

1. Open **chrome://extensions/** in Google Chrome.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select this folder (`archive_chrome_ext`).

## Usage

| Trigger | How |
|---|---|
| **Keyboard shortcut** | Press **Ctrl+Shift+A** (or **Cmd+Shift+A** on macOS) |
| **Context menu** | Right-click on any page and select **Send to https://archive.is/** |
| **Toolbar icon** | Click the extension icon in the Chrome toolbar |

All three methods prepend the configured prefix to the current tab's URL and navigate to the result.

## Configuration

1. Right-click the extension icon and choose **Options**, or go to **chrome://extensions/** and click **Details > Extension options**.
2. Enter the desired URL prefix (e.g. `https://web.archive.org/web/`).
3. Click **Save**. The context menu label updates automatically.

## Customising the shortcut

Navigate to **chrome://extensions/shortcuts** to change the keyboard shortcut.
