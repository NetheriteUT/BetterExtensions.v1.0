chrome.webNavigation.onCompleted.addListener(({ url }) => {
  if (url.includes("google.com/search") && url.includes("dog+food")) {
    chrome.storage.local.set({ lastFed: Date.now() });
  }
});
