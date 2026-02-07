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
  noBtn.style.left = Math.random() * 200 + "px";
  noBtn.style.top = Math.random() * 60 + "px";
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
  moveBT21Closer();
  intensifySparkles();
  playMusic();
});

/* Hover reactions */
yesBtn.onmouseenter = () => sparkleBoost = true;
yesBtn.onmouseleave = () => sparkleBoost = false;

noBtn.onmouseenter = () =>
  bt21Elements.forEach(b => b.classList.add("shake"));
noBtn.onmouseleave = () =>
  bt21Elements.forEach(b => b.classList.remove("shake"));

/* Floating hearts */
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerHTML = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = Math.random() * 20 + 15 + "px";
  h.style.animationDuration = Math.random() * 3 + 4 + "s";
  heartsContainer.appendChild(h);
  setTimeout(() => h.remove(), 7000);
}, 400);

/* Sparkles */
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

/* Sparkle boost */
function intensifySparkles() {
  sparkleBoost = true;
  setTimeout(() => sparkleBoost = false, 3000);
}

/* BT21 move closer on YES */
function moveBT21Closer() {
  const r = card.getBoundingClientRect();
  bt21Elements.forEach(el => {
    el.style.left = r.left + r.width / 2 + (Math.random() - 0.5) * 220 + "px";
    el.style.top = r.top + r.height / 2 + (Math.random() - 0.5) * 220 + "px";
  });
}

/* BT21 random movement (every 10s, avoid card) */
function moveBT21Randomly() {
  const cardRect = card.getBoundingClientRect();

  bt21Elements.forEach(el => {
    let x, y, safe = false;

    while (!safe) {
      x = Math.random() * (window.innerWidth - 120);
      y = Math.random() * (window.innerHeight - 120);

      const overlap =
        !(x + 120 < cardRect.left ||
          x > cardRect.right ||
          y + 120 < cardRect.top ||
          y > cardRect.bottom);

      if (!overlap) safe = true;
    }

    el.style.left = x + "px";
    el.style.top = y + "px";
  });
}

setInterval(moveBT21Randomly, 10000);

/* Music */
function playMusic() {
  const music = document.getElementById("bgMusic");
  music.volume = 0.4;
  music.play().catch(() => {});
}
