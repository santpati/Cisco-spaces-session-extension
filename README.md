# Cisco Spaces Session Extension

A browser extension to seamlessly extract and share your active Cisco Spaces session token (`sys-token`) with authorized adoption tools and dashboards.

<div align="center">
  <img src="icons/icon128.jpg" alt="Cisco Spaces Helper" width="128" onerror="this.src='https://via.placeholder.com/128?text=Icon'"/>
</div>

## Features
- **Auto-Detection**: Instantly detects if you are logged into `dnaspaces.io` (active tab or background tab).
- **One-Click Copy**: Copy your `sys-token` to the clipboard with a single click.
- **Secure**: Runs entirely in your browser. No data is sent to external servers.

## Installation

### Google Chrome / Microsoft Edge
1.  Download or clone this repository to your local machine.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** (toggle in the top right).
4.  Click **Load unpacked**.
5.  Select the `Cisco-spaces-session-extension` folder.
6.  The extension icon should appear in your toolbar.

### Mozilla Firefox
1.  Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2.  Click **Load Temporary Add-on...**.
3.  Select the `manifest.json` file from the `Cisco-spaces-session-extension` folder.

## Usage
1.  Log in to [Cisco Spaces](https://dnaspaces.io).
2.  Click the extension icon in your browser toolbar.
3.  If an active session is found, your token will be displayed.
4.  Click **Copy Token** to use it in other tools.

## Development
- **Manifest V3**: Built using the latest WebExtension standards.
- **Permissions**:
    - `activeTab`: To read the current page URL.
    - `storage`: (Optional) For saving preferences.
    - `scripting`: To safely inject scripts to read `localStorage`.

## License
MIT License
