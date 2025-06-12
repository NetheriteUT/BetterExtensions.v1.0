const banners = [
  "https://confusinggame.vercel.app/1.png",
  "https://confusinggame.vercel.app/2.png",
  "https://confusinggame.vercel.app/3.png",
  "https://confusinggame.vercel.app/4.png",
  "https://confusinggame.vercel.app/5.png"
];

const RICKROLL_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const DISPLAY_INTERVAL_MS = 60 * 1000; 

function createAdElement(position) {
  const wrapper = document.createElement("div");
  const id = `ad_${position}`;
  wrapper.id = id;
  wrapper.style = `
    position: fixed;
    ${position}: 0;
    left: 0;
    width: 100%;
    z-index: 999999;
    background: white;
    box-shadow: 0 ${position === "top" ? "2px" : "-2px"} 6px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 4px 0;
  `;

  const img = document.createElement("img");
  img.src = banners[Math.floor(Math.random() * banners.length)];
  img.style = "max-height: 60px; cursor: pointer;";
  img.addEventListener("click", () => {
    window.open(RICKROLL_URL, "_blank");
  });

  const closeBtn = document.createElement("div");
  closeBtn.textContent = "✕";
  closeBtn.style = `
    position: absolute;
    top: 4px;
    right: 8px;
    cursor: pointer;
    font-size: 16px;
    background: rgba(0,0,0,0.1);
    padding: 2px 6px;
    border-radius: 4px;
  `;
  closeBtn.onclick = () => {
    wrapper.remove();
    localStorage.setItem(`${id}_hideUntil`, Date.now() + DISPLAY_INTERVAL_MS);
    setTimeout(() => injectAd(position), DISPLAY_INTERVAL_MS);
  };

  wrapper.appendChild(img);
  wrapper.appendChild(closeBtn);
  return wrapper;
}

function injectAd(position) {
  const id = `ad_${position}`;
  const hideUntil = localStorage.getItem(`${id}_hideUntil`);
  if (hideUntil && parseInt(hideUntil) > Date.now()) return;
  const ad = createAdElement(position);
  document.body.appendChild(ad);
}

injectAd("top");

function injectBottomExpandable() {
  const id = "ad_bottom_expandable";
  const hideUntil = localStorage.getItem(`${id}_hideUntil`);
  if (hideUntil && parseInt(hideUntil) > Date.now()) return;

  const container = document.createElement("div");
  container.id = id;
  container.style = `
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999999;
    background: white;
    box-shadow: 0 -2px 6px rgba(0,0,0,0.2);
    text-align: center;
    overflow: hidden;
    max-height: 60px;
    transition: max-height 0.3s ease-in-out;
  `;

  const img = document.createElement("img");
  img.src = banners[Math.floor(Math.random() * banners.length)];
  img.style = "max-height: 300px; cursor: pointer;";
  img.addEventListener("click", () => {
    window.open(RICKROLL_URL, "_blank");
  });

  const controls = document.createElement("div");
  controls.style = "margin: 4px;";
  controls.innerHTML = `
    <button id="expandBtn" style="margin-right: 5px;">Expand</button>
    <button id="closeExpandableBtn">✕</button>
  `;

  controls.querySelector("#expandBtn").onclick = () => {
    container.style.maxHeight = "300px";
  };

  controls.querySelector("#closeExpandableBtn").onclick = () => {
    container.remove();
    localStorage.setItem(`${id}_hideUntil`, Date.now() + DISPLAY_INTERVAL_MS);
    setTimeout(injectBottomExpandable, DISPLAY_INTERVAL_MS);
  };

  container.appendChild(img);
  container.appendChild(controls);
  document.body.appendChild(container);
}

injectBottomExpandable();
