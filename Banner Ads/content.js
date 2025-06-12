const banners = [
  "https://i.ibb.co/pjrYPz2r/1.png",
  "https://i.ibb.co/5X5dNzkT/2.png",
  "https://i.ibb.co/zY2wPmn/3.png",
  "https://i.ibb.co/HDhhNhKs/4.png",
  "https://i.ibb.co/0RVJvcP/5.png"
];

const randomBanner = () => banners[Math.floor(Math.random() * banners.length)];

const topAdStyle = `
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999999;
  background: white;
  text-align: center;
  padding: 4px 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const vignetteContainerStyle = `
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999999;
  text-align: center;
`;

const vignetteStyle = `
  max-height: 60px;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  background: white;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.2);
`;

const vignetteExpandedStyle = `
  max-height: 300px;
`;

const topAd = document.createElement("div");
topAd.style = topAdStyle;
topAd.innerHTML = `<img src="${randomBanner()}" style="max-height: 60px;">`;
document.body.appendChild(topAd);

const vignetteContainer = document.createElement("div");
vignetteContainer.style = vignetteContainerStyle;

const vignette = document.createElement("div");
vignette.id = "vignetteAd";
vignette.style = vignetteStyle;
vignette.innerHTML = `<img src="${randomBanner()}" style="max-height: 300px;"><br><button id="expandBtn" style="margin: 5px;">Expand</button><button id="closeBtn">Close</button>`;

vignetteContainer.appendChild(vignette);
document.body.appendChild(vignetteContainer);

document.addEventListener("click", (e) => {
  if (e.target.id === "expandBtn") {
    vignette.style.maxHeight = "300px";
  } else if (e.target.id === "closeBtn") {
    vignetteContainer.remove();
  }
});
