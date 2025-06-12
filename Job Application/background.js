chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('jumpscareAlarm', { periodInMinutes: 3 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'jumpscareAlarm') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: showJobApplication
        });
      }
    });
  }
});

function showJobApplication() {
  if (document.getElementById('jumpscare-img')) return;

  const overlay = document.createElement('div');
  overlay.id = 'jumpscare-img';
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: white;
    z-index: 2147483647;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const img = document.createElement('img');
  img.src = 'https://eforms.com/images/2018/03/Employment-Job-Application-791x1024.png';
  img.style.cssText = `
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  `;

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
  }, 5000);
}
