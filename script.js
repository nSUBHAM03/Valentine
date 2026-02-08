const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionView = document.getElementById("questionView");
const yesView = document.getElementById("yesView");
const heartsContainer = document.getElementById("hearts-container");
const bt21Elements = document.querySelectorAll(".bt21");
const card = document.querySelector(".card");

const sparkleSymbols = ["💫", "⭐", "❇️"];
let sparkleBoost = false;

/* NO button escape */
const SAFE_PADDING = 20;     // distance from screen edges
const TRIGGER_DISTANCE = 120; // how close cursor triggers escape

document.addEventListener("mousemove", (e) => {
  const noRect = noBtn.getBoundingClientRect();

  const noCenterX = noRect.left + noRect.width / 2;
  const noCenterY = noRect.top + noRect.height / 2;

  const distance = Math.hypot(
    e.clientX - noCenterX,
    e.clientY - noCenterY
  );

  if (distance < TRIGGER_DISTANCE) {
    moveNoButtonSafely();
  }
});

function moveNoButtonSafely() {
  const yesRect = yesBtn.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const maxX =
    window.innerWidth - noBtn.offsetWidth - SAFE_PADDING;
  const maxY =
    window.innerHeight - noBtn.offsetHeight - SAFE_PADDING;

  let x, y, safe = false;

  while (!safe) {
    x =
      Math.random() * (maxX - SAFE_PADDING) +
      SAFE_PADDING;
    y =
      Math.random() * (maxY - SAFE_PADDING) +
      SAFE_PADDING;

    const noRect = {
      left: x,
      right: x + noBtn.offsetWidth,
      top: y,
      bottom: y + noBtn.offsetHeight,
    };

    const overlapYes =
      !(noRect.right < yesRect.left ||
        noRect.left > yesRect.right ||
        noRect.bottom < yesRect.top ||
        noRect.top > yesRect.bottom);

    const overlapCard =
      !(noRect.right < cardRect.left ||
        noRect.left > cardRect.right ||
        noRect.bottom < cardRect.top ||
        noRect.top > cardRect.bottom);

    if (!overlapYes && !overlapCard) {
      safe = true;
    }
  }

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  // playful tilt
noBtn.style.transform =
  `rotate(${Math.random() * 20 - 10}deg)`;
}

document.addEventListener("mousemove", () => {
  noBtn.style.transform = "rotate(0deg)";
});


/* YES click */
yesBtn.addEventListener("click", () => {
  questionView.classList.remove("active");

  setTimeout(() => {
    questionView.classList.add("hidden");
    yesView.classList.remove("hidden");
    requestAnimationFrame(() => yesView.classList.add("active"));
  }, 400);

  card.classList.add("celebrate");
  intensifySparkles();
  playMusic();
});

/* Hover reactions */
yesBtn.addEventListener("mouseenter", () => sparkleBoost = true);
yesBtn.addEventListener("mouseleave", () => sparkleBoost = false);

noBtn.addEventListener("mouseenter", () =>
  bt21Elements.forEach(b => b.classList.add("shake"))
);
noBtn.addEventListener("mouseleave", () =>
  bt21Elements.forEach(b => b.classList.remove("shake"))
);

/* Floating hearts */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}, 400);

/* Cursor sparkles */
document.addEventListener("mousemove", e => sparkle(e.clientX, e.clientY));

function sparkle(x, y) {
  const count = sparkleBoost ? 3 : 1;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "cursor-sparkle";
    s.innerHTML = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    s.style.left = x + Math.random() * 20 + "px";
    s.style.top = y + Math.random() * 20 + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
}

/* Sparkle boost on YES */
function intensifySparkles() {
  sparkleBoost = true;
  setTimeout(() => sparkleBoost = false, 3000);
}

/* Music */
function playMusic() {
  const music = document.getElementById("bgMusic");
  if (music) {
    music.volume = 0.4;
    music.play().catch(() => {});
  }
}
