// This content script runs on dnaspaces.io pages.
// It can be used to listen for messages from the background script or popup
// if direct injection (executeScript) is not sufficient or if we want to
// proactively notify the extension of token changes.

console.log("Cisco Spaces Helper: Content Script Active");

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "get_token") {
        const token = localStorage.getItem('sys_token');
        sendResponse({ token: token });
    }
    return true;
});
