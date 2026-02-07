const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionView = document.getElementById("questionView");
const yesView = document.getElementById("yesView");
const heartsContainer = document.getElementById("hearts-container");
const bt21Elements = document.querySelectorAll(".bt21");

const sparkleSymbols = ["💫", "⭐", "❇️"];

/* NO button escape */
noBtn.addEventListener("mouseover", () => {
  noBtn.style.left = Math.random() * 200 + "px";
  noBtn.style.top = Math.random() * 50 + "px";
});

/* YES click */
yesBtn.addEventListener("click", () => {
  questionView.classList.add("hidden");
  yesView.classList.remove("hidden");
  heartBurst();
});

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
  const s = document.createElement("div");
  s.className = "cursor-sparkle";
  s.innerHTML = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
  s.style.left = x + "px";
  s.style.top = y + "px";
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 900);
}

/* Heart burst */
function heartBurst() {
  for (let i = 0; i < 25; i++) {
    sparkle(window.innerWidth / 2, window.innerHeight / 2);
  }
}

/* Move BT21 randomly */
setInterval(() => {
  bt21Elements.forEach(el => {
    el.style.left = Math.random() * (window.innerWidth - 150) + "px";
    el.style.top = Math.random() * (window.innerHeight - 150) + "px";
  });
}, 4500);
yesBtn.addEventListener("click", () => {
  // Fade out question view
  questionView.classList.remove("active");

  setTimeout(() => {
    questionView.classList.add("hidden");

    // Show YES view
    yesView.classList.remove("hidden");

    // Trigger animation
    requestAnimationFrame(() => {
      yesView.classList.add("active");
    });

    // Celebration
    heartBurst();
  }, 400);
});
