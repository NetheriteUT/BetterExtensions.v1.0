const haroldUrl = "https://confusinggame.vercel.app/Haroldthefuckingdog.png";

const haroldContainer = document.createElement("div");
haroldContainer.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const haroldImg = document.createElement("img");
haroldImg.src = haroldUrl;
haroldImg.style.cssText = "width: 100px; height: 100px;";

const chatbox = document.createElement("div");
chatbox.style.cssText = `
  background: #fff;
  color: black;
  padding: 10px;
  margin-top: 5px;
  max-width: 250px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  font-size: 14px;
`;

haroldContainer.appendChild(haroldImg);
haroldContainer.appendChild(chatbox);
document.body.appendChild(haroldContainer);

const trivia = [
  "What's the limit of (x^2 + 3x) as x -> ∞? It's ∞.",
  "Power Rule: d/dx of x^n is n*x^(n-1)!",
  "Limit as x→0 of sin(x)/x is 1.",
  "What's the derivative of x^5? 5x^4.",
  "Harold thinks ln(x)'s derivative is 1/x. He's right.",
  "The limit of (1 + 1/n)^n as n→∞ is e.",
  "Derivative of a constant? It's 0. Like Harold's patience.",
  "Limit as x→a of x = a. Harold's favorite fact.",
  "Derivative of x^0.5? (1/2)x^(-0.5)"
];

const jokes = [
  "Why did the math book look sad? It had too many problems.",
  "I tried to be a limit once… but I didn’t approach anything.",
  "I bark in derivatives. Ruff ruff ruff(x).",
  "Parallel lines have so much in common... it’s a shame they’ll never meet.",
  "You fed me calculus. Now feed me kibble."
];

function speakRandom() {
  const entry = Math.random() > 0.4 ? randomFrom(trivia) : randomFrom(jokes);
  chatbox.textContent = entry;
}
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

setInterval(speakRandom, 30000);
speakRandom(); 

setInterval(() => {
  chrome.storage.local.get(["lastFed"], (res) => {
    const lastFed = res.lastFed || 0;
    const timeSince = Date.now() - lastFed;
    const hungry = timeSince > 1000 * 60 * 3;

    if (hungry) {
      chatbox.textContent = "Harold is hungry...";

      setTimeout(() => {
        chatbox.textContent = "You didn't feed Harold...";

        setTimeout(() => {
          chatbox.textContent = "Harold is angry >:(";
          document.body.innerHTML = `
            <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-size:2em;font-family:sans-serif;">
              Harold says: "Thank you so much."
            </div>
          `;
        }, 3000);
      }, 3000);
    }
  });
}, 60000); 
