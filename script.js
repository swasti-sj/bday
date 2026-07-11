const PASSCODE = "2104";

const lockScreen = document.getElementById("lockScreen");
const partyScreen = document.getElementById("partyScreen");
const passForm = document.getElementById("passForm");
const passInput = document.getElementById("passInput");
const errorMsg = document.getElementById("errorMsg");
const card = document.querySelector(".card");
const blowBtn = document.getElementById("blowBtn");
const flame = document.querySelector(".flame");
const wish = document.getElementById("wish");

passForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passInput.value.trim() === PASSCODE) {
    lockScreen.classList.add("hidden");
    partyScreen.classList.remove("hidden");
    startConfetti();
  } else {
    errorMsg.textContent = "nope, try again cutiee 🥲";
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
    passInput.value = "";
  }
});

blowBtn.addEventListener("click", () => {
  flame.classList.add("out");
  wish.classList.remove("hidden");
  blowBtn.disabled = true;
  blowBtn.textContent = "wish made 🌟";
  burstConfetti();
});

/* floating background hearts */
(function seedHearts() {
  const container = document.getElementById("bgHearts");
  const emojis = ["💗", "🩷", "💕", "🎀", "✨"];
  const count = 22;
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.fontSize = 1 + Math.random() * 1.4 + "rem";
    const duration = 8 + Math.random() * 10;
    span.style.animationDuration = duration + "s";
    span.style.animationDelay = Math.random() * duration + "s";
    container.appendChild(span);
  }
})();

/* confetti canvas */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let particles = [];
let confettiRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const colors = ["#ff8fab", "#ffd166", "#cdb4db", "#ffb6c1", "#a0c4ff", "#caffbf"];

function makeParticle(xRange) {
  return {
    x: xRange ? xRange() : Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.3,
    size: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: 2 + Math.random() * 3,
    speedX: -1.5 + Math.random() * 3,
    rotation: Math.random() * 360,
    rotationSpeed: -6 + Math.random() * 12,
  };
}

function startConfetti() {
  particles = [];
  for (let i = 0; i < 120; i++) particles.push(makeParticle());
  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(animateConfetti);
  }
  setTimeout(() => {
    particles = particles.filter((p) => p.y < canvas.height + 50);
  }, 6000);
}

function burstConfetti() {
  for (let i = 0; i < 90; i++) {
    particles.push(
      makeParticle(() => canvas.width / 2 + (-60 + Math.random() * 120))
    );
  }
  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(animateConfetti);
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });
  particles = particles.filter((p) => p.y < canvas.height + 50);
  if (particles.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
  }
}
