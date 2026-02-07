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
noBtn.addEventListener("mouseover", () => {
  const yesRect = yesBtn.getBoundingClientRect();
  const cardRect = document.querySelector(".buttons").getBoundingClientRect();

  let x, y, safe = false;

  while (!safe) {
    x = Math.random() * (cardRect.width - noBtn.offsetWidth);
    y = Math.random() * (cardRect.height - noBtn.offsetHeight);

    const noRect = {
      left: cardRect.left + x,
      right: cardRect.left + x + noBtn.offsetWidth,
      top: cardRect.top + y,
      bottom: cardRect.top + y + noBtn.offsetHeight
    };

    // Check overlap with YES button
    const overlap =
      !(noRect.right < yesRect.left ||
        noRect.left > yesRect.right ||
        noRect.bottom < yesRect.top ||
        noRect.top > yesRect.bottom);

    if (!overlap) safe = true;
  }

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
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
