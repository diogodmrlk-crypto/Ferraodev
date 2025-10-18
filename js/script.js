// Login
function checkLogin() {
  const pass = document.getElementById("password").value;
  if (pass === "ferraodev") {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("panel").classList.remove("hidden");
  } else {
    alert("Senha incorreta!");
  }
}

// Tabs
function openTab(tabId) {
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  
  // Ativa o botão clicado
  document.querySelector(`.tab-button[onclick="openTab('${tabId}')"]`).classList.add("active");
  document.getElementById(tabId).classList.add("active");
}

// Sliders
document.getElementById("precisao").addEventListener("input", function() {
  document.getElementById("precValue").textContent = this.value;
});
document.getElementById("fps").addEventListener("input", function() {
  document.getElementById("fpsValue").textContent = this.value;
});

// Injetar funções
function inject() {
  const aim = document.getElementById("aimAssist").checked;
  const prec = document.getElementById("precisao").value;
  const fps = document.getElementById("fps").value;
  alert(`Funções injetadas!\nAuxílio Mira: ${aim}\nPrecisão: ${prec}\nFPS: ${fps}`);
}

// Fundo animado (pontos conectados)
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = Array.from({ length: 50 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  dx: (Math.random() - 0.5) * 1.5,
  dy: (Math.random() - 0.5) * 1.5
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#1F51FF" // azul neon
  ctx.strokeStyle = "#1F41FF"; // azul neon

  points.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
