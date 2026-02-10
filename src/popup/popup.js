document.addEventListener('DOMContentLoaded', async () => {
    const statusText = document.getElementById('status-text');
    const statusDot = document.querySelector('.status-indicator .dot');

    const viewLoading = document.getElementById('loading');
    const viewNoToken = document.getElementById('no-token');
    const viewTokenFound = document.getElementById('token-found');

    const tokenDisplay = document.getElementById('token-display');
    const copyBtn = document.getElementById('copy-btn');
    const copySuccess = document.getElementById('copy-success');
    const openSpacesBtn = document.getElementById('open-spaces');

    // Helper to switch views
    function showView(view) {
        [viewLoading, viewNoToken, viewTokenFound].forEach(el => el.classList.add('hidden'));
        view.classList.remove('hidden');
    }

    // 1. Get the Active Tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 2. Check if we are on dnaspaces.io
    if (tab.url && (tab.url.includes('dnaspaces.io') || tab.url.includes('dnaspaces.cn') || tab.url.includes('dnaspaces.eu'))) {
        // We are on the site, try to inject script to read local storage & session storage
        try {
            const result = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    const keys = ['sys_token', 'sys-token', 'sysToken', 'token', 'access_token'];
                    // Check LocalStorage
                    for (const key of keys) {
                        if (localStorage.getItem(key)) return localStorage.getItem(key);
                    }
                    // Check SessionStorage
                    for (const key of keys) {
                        if (sessionStorage.getItem(key)) return sessionStorage.getItem(key);
                    }
                    return null;
                }
            });

            const scriptToken = result[0]?.result;
            if (scriptToken) {
                handleTokenFound(scriptToken);
                return;
            }

            // Fallback: Check Cookies
            const cookies = await chrome.cookies.getAll({ domain: new URL(tab.url).hostname });
            const tokenCookie = cookies.find(c =>
                ['sys_token', 'sys-token', 'sysToken', 'token'].some(k => c.name.includes(k))
            );

            if (tokenCookie) {
                handleTokenFound(tokenCookie.value);
            } else {
                handleNoToken();
            }
        } catch (e) {
            console.error("Token detection error:", e);
            handleNoToken();
        }
    } else {
        // We are NOT on the site. Search for a tab that IS.
        const tabs = await chrome.tabs.query({ url: "*://*.dnaspaces.io/*" });

        if (tabs.length > 0) {
            // Found an open tab, check it
            try {
                const result = await chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: () => {
                        return localStorage.getItem('sys_token') || localStorage.getItem('sys-token') || localStorage.getItem('token') || localStorage.getItem('sysToken');
                    }
                });

                const token = result[0]?.result;
                if (token) {
                    handleTokenFound(token);
                } else {
                    handleNoToken();
                }
            } catch (e) {
                handleNoToken();
            }
        } else {
            handleNoToken();
        }
    }

    function handleTokenFound(token) {
        statusText.textContent = "Active Session";
        statusDot.classList.add('active');
        tokenDisplay.textContent = token;
        showView(viewTokenFound);
    }

    function handleNoToken() {
        statusText.textContent = "No Session";
        statusDot.classList.add('inactive');
        showView(viewNoToken);
    }

    // Copy Action
    copyBtn.addEventListener('click', () => {
        const token = tokenDisplay.textContent;
        navigator.clipboard.writeText(token).then(() => {
            copySuccess.classList.remove('hidden');
            setTimeout(() => {
                copySuccess.classList.add('hidden');
            }, 2000);
        });
    });

    // Open Spaces Action
    openSpacesBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://dnaspaces.io' });
    });
});
