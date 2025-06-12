chrome.tabs.onCreated.addListener(async () => {
    const tabs = await chrome.tabs.query({});
    if (tabs.length >= 10) {
        const targetTab = tabs[tabs.length - 1];
        chrome.scripting.executeScript({
            target: { tabId: targetTab.id },
            files: ["popup.js"]
        });

        chrome.scripting.insertCSS({
            target: { tabId: targetTab.id },
            files: ["popup.css"]
        });

        chrome.scripting.executeScript({
            target: { tabId: targetTab.id },
            func: () => {
                const iframe = document.createElement("iframe");
                iframe.src = chrome.runtime.getURL("popup.html");
                iframe.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 300px;
                    height: 100px;
                    border: none;
                    z-index: 999999;
                    box-shadow: 0 0 10px rgba(0,0,0,0.5);
                    border-radius: 10px;
                `;
                document.body.appendChild(iframe);
            }
        });

        setTimeout(async () => {
            const allTabs = await chrome.tabs.query({});
            const currentTab = await chrome.tabs.query({ active: true, currentWindow: true });
            const currentTabId = currentTab[0].id;
            for (let tab of allTabs) {
                if (tab.id !== currentTabId) {
                    chrome.tabs.remove(tab.id);
                }
            }
        }, 5000);
    }
});
