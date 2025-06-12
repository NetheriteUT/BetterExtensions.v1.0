if (!document.getElementById("touch-grass-overlay")) {
  let clickCount = 0;
  let size = 200;

  const overlay = document.createElement("div");
  overlay.id = "touch-grass-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    font-size: 2rem;
    font-family: sans-serif;
    z-index: 999999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  `;

  const message = document.createElement("div");
  message.innerText = "GO TOUCH GRASS";

  const img = document.createElement("img");
  img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogO3p9--J91KmBy1Xolni0id7EyKVNbir1Q&s";
  img.style.cssText = `
    margin-top: 20px;
    width: ${size}px;
    height: ${size}px;
    cursor: pointer;
    transition: all 0.2s ease;
  `;

  img.addEventListener("click", () => {
    clickCount++;
    size = Math.max(20, size - 3);
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;

    if (clickCount >= 50) {
      overlay.remove();
    }
  });

  overlay.appendChild(message);
  overlay.appendChild(img);
  document.body.appendChild(overlay);
}
