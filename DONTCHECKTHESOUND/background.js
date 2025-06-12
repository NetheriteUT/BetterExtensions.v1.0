chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId },
      func: () => { document.title = "DONT CLICK THE SOUND"; }
    });
  }
});
