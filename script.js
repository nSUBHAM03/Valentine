const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const card = document.querySelector(".card");
const heartsContainer = document.getElementById("hearts-container");

/* NO button runs away */
noBtn.addEventListener("mouseover", () => {
  const rect = card.getBoundingClientRect();

  const x = Math.random() * (rect.width - noBtn.offsetWidth);
  const y = Math.random() * (rect.height - noBtn.offsetHeight);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
});

/* YES button */
yesBtn.addEventListener("click", () => {
  message.classList.remove("hidden");
  createHeartBurst();
  createSparkleBurst();
});

/* Floating hearts */
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

setInterval(createFloatingHeart, 400);

/* Heart explosion */
function createHeartBurst() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.classList.add("burst-heart");
    heart.innerHTML = "❤️";

    heart.style.setProperty("--x", (Math.random() - 0.5) * 300 + "px");
    heart.style.setProperty("--y", (Math.random() - 0.5) * 300 + "px");
    heart.style.fontSize = Math.random() * 15 + 20 + "px";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }
}

/* Sparkle explosion */
function createSparkleBurst() {
  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.innerHTML = "✨";

    sparkle.style.setProperty("--x", (Math.random() - 0.5) * 250 + "px");
    sparkle.style.setProperty("--y", (Math.random() - 0.5) * 250 + "px");
    sparkle.style.fontSize = Math.random() * 10 + 10 + "px";

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

/* Cursor-follow sparkles */
const sparkleSymbols = ["💫", "⭐", "❇️"];

document.addEventListener("mousemove", (e) => {
  createCursorSparkle(e.clientX, e.clientY);
});

document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  createCursorSparkle(touch.clientX, touch.clientY);
});

function createCursorSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("cursor-sparkle");

  sparkle.innerHTML =
    sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];

  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  sparkle.style.fontSize = Math.random() * 8 + 10 + "px";

  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 900);
}
/* ===== BT21 RANDOM MOVEMENT + SPARKLE SYNC ===== */

const bt21Elements = document.querySelectorAll(".bt21");

/* Move BT21 characters randomly */
function moveBT21Randomly() {
  bt21Elements.forEach((char) => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 150;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    char.style.left = randomX + "px";
    char.style.top = randomY + "px";

    createSparklesNearBT21(char);
  });
}

/* Sparkles near BT21 */
function createSparklesNearBT21(element) {
  const rect = element.getBoundingClientRect();

  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("cursor-sparkle");

    sparkle.innerHTML =
      sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];

    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;

    sparkle.style.left = rect.left + rect.width / 2 + offsetX + "px";
    sparkle.style.top = rect.top + rect.height / 2 + offsetY + "px";
    sparkle.style.fontSize = Math.random() * 8 + 10 + "px";

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 900);
  }
}

/* Start random movement */
setInterval(moveBT21Randomly, 4500);

