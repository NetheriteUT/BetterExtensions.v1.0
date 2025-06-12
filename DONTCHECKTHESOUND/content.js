document.title = "DONT CLICK THE SOUND";
const observer = new MutationObserver(() => {
  if (document.title !== "DONT CLICK THE SOUND") {
    document.title = "DONT CLICK THE SOUND";
  }
});

observer.observe(document.querySelector('title'), {
  childList: true
});
