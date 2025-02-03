function nextStage(stageNumber) {
  document.querySelectorAll(".stage").forEach((stage) => {
    stage.classList.remove("active");
  });
  document.getElementById(`stage-${stageNumber}`).classList.add("active");
}

function prevStage(stageNumber) {
  if (stageNumber > 1) {
    nextStage(stageNumber - 1);
  }
}

function showResponseButtons() {
  document.getElementById("response-buttons").classList.remove("hidden");
}

function respond(answer) {
  nextStage(6);
  startConfetti();
  createFloatingHearts();
  setTimeout(stopConfetti, 8000);
}

// Floating Hearts Effect
function createFloatingHearts() {
  const container = document.querySelector(".hearts-container");
  const colors = ["#ff1493", "#ff69b4", "#ff8da1", "#ff469f"];

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.innerHTML = "💖";
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDuration = Math.random() * 3 + 2 + "s";
      heart.style.fontSize = Math.random() * 20 + 10 + "px";
      heart.style.animation = "floatHeart 4s ease-out forwards";

      container.appendChild(heart);

      setTimeout(() => {
        container.removeChild(heart);
      }, 4000);
    }, i * 200);
  }
}

// Enhanced Confetti Effect
let confettiAnimation;
let confettiPieces = [];

function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const colors = ["#ff1493", "#ff69b4", "#ff8da1", "#ff469f", "#ffffff"];

  class Confetti {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -10;
      this.size = Math.random() * 6 + 4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speed = Math.random() * 3 + 2;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 2;
      this.oscillationSpeed = Math.random() * 0.2 + 0.1;
      this.oscillationDistance = Math.random() * 5 + 2;
      this.downSpeed = Math.random() * 3 + 2;
      this.opacity = 1;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;

      // Draw heart shape
      const rad = this.size / 2;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.moveTo(0, rad);
      ctx.bezierCurveTo(rad, -rad, rad * 3, -rad, 0, rad * 3);
      ctx.bezierCurveTo(-rad * 3, -rad, -rad, -rad, 0, rad);
      ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    update(fadeOut = false) {
      this.y += this.downSpeed;
      this.x +=
        Math.sin(this.y * this.oscillationSpeed) * this.oscillationDistance;
      this.rotation += this.rotationSpeed;

      if (fadeOut) {
        this.opacity -= 0.02;
      }

      if (this.y > canvas.height + 10 || this.opacity <= 0) {
        this.reset();
      }
    }
  }

  // Create confetti pieces
  confettiPieces = [];
  for (let i = 0; i < 150; i++) {
    confettiPieces.push(new Confetti());
  }

  let fadeOut = false;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach((confetti) => {
      confetti.draw();
      confetti.update(fadeOut);
    });

    if (!fadeOut) {
      confettiAnimation = requestAnimationFrame(animate);
    } else if (confettiPieces.every((confetti) => confetti.opacity <= 0)) {
      cancelAnimationFrame(confettiAnimation);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      confettiAnimation = requestAnimationFrame(animate);
    }
  }

  animate();
}

function stopConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  // Start fade out
  confettiPieces.forEach((confetti) => {
    confetti.opacity = 1;
  });

  fadeOut = true;

  // Final cleanup after fade out
  setTimeout(() => {
    cancelAnimationFrame(confettiAnimation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces = [];
  }, 2000);
}

// Initialize canvas size on load
window.addEventListener("load", () => {
  const canvas = document.getElementById("confetti-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
