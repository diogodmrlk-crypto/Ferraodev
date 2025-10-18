const MOCKAPI_URL = "https://68f27d4fb36f9750deecce00.mockapi.io/keys";

// LOGIN
async function checkLogin() {
  const input = document.getElementById("password").value.trim();
  if (!input) {
    alert("Digite a senha ou key.");
    return;
  }

  // Senha mestre
  if (input === "ferraotrick") {
    openPanel();
    return;
  }

  try {
    const res = await fetch(MOCKAPI_URL);
    if (!res.ok) {
      alert("Erro ao acessar a API.");
      return;
    }

    const keys = await res.json();
    // Verifica se a key digitada existe e não foi usada
    const keyObj = keys.find(k => k.key === input && !k.used);

    if (keyObj) {
      // Marca key como usada
      await fetch(`${MOCKAPI_URL}/${keyObj.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...keyObj,
          used: true,
          usedAt: new Date().toISOString()
        })
      });
      openPanel();
    } else {
      alert("Senha ou Key inválida!");
    }
  } catch (e) {
    console.error(e);
    alert("Erro ao verificar a key na API.");
  }
}

// ABRE O PAINEL
function openPanel() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("panel").classList.remove("hidden");
}

// TABS
function openTab(tabId) {
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

  const btn = document.querySelector(`.tab-button[onclick="openTab('${tabId}')"]`);
  if (btn) btn.classList.add("active");
  const content = document.getElementById(tabId);
  if (content) content.classList.add("active");
}

// SLIDERS
document.getElementById("precisao").addEventListener("input", function() {
  document.getElementById("precValue").textContent = this.value;
});
document.getElementById("fps").addEventListener("input", function() {
  document.getElementById("fpsValue").textContent = this.value;
});

// INJETAR FUNÇÕES
function inject() {
  const aim = document.getElementById("aimAssist").checked;
  const prec = document.getElementById("precisao").value;
  const fps = document.getElementById("fps").value;
  alert(`Funções injetadas!\nAuxílio Mira: ${aim}\nPrecisão: ${prec}\nFPS: ${fps}`);
}

// FUNDO ANIMADO
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = Array.from({ length: 50 }, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  dx: (Math.random()-0.5)*1.5,
  dy: (Math.random()-0.5)*1.5
}));

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#1F51FF";
  ctx.strokeStyle = "#1F41FF";

  points.forEach(p=>{
    p.x += p.dx;
    p.y += p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fill();
  });

  for(let i=0;i<points.length;i++){
    for(let j=i+1;j<points.length;j++){
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.beginPath();
        ctx.moveTo(points[i].x,points[i].y);
        ctx.lineTo(points[j].x,points[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

animate();
