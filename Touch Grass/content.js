let charCount = 0;
let active = false;

document.addEventListener("keydown", (e) => {
  if (active) return;
  if (e.key.length === 1) charCount++;

  if (charCount >= 100) {
    active = true;
    charCount = 0;
    showTouchGrass();
  }
});

function showTouchGrass() {
  if (document.getElementById("touch-grass-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "touch-grass-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.8);
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: white;
    text-align: center;
    padding: 20px;
  `;

  const message = document.createElement("div");
  message.innerText = "GO TOUCH GRASS";

  const img = document.createElement("img");
  img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogO3p9--J91KmBy1Xolni0id7EyKVNbir1Q&s";
  img.style.cssText = `
    width: 200px;
    height: 200px;
    margin-top: 20px;
    animation: spinIn 2s ease-in-out forwards;
  `;

  overlay.appendChild(message);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spinIn {
      0% { transform: scale(0) rotate(0deg); opacity: 0; }
      100% { transform: scale(1) rotate(720deg); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  const listener = (e) => {
    if (e.target?.value?.toLowerCase().includes("touching grass")) {
      overlay.remove();
      active = false;
      document.removeEventListener("input", listener, true);
    }
  };

  document.addEventListener("input", listener, true);
}
