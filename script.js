const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 220;  // match sidebar
canvas.height = window.innerHeight;

let mouse = {x: 0, y: 0};

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX - 220;   // 🔥 adjust for sidebar
  mouse.y = e.clientY;
});

// 🔥 particles = electrons (e) and holes (h)
let particles = Array.from({length: 150}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  vx: (Math.random()-0.5)*1.5,
  vy: (Math.random()-0.5)*1.5,
  type: Math.random() > 0.5 ? "e" : "h",   // electron or hole
  r: Math.random()*12 + 15                  // 🔥 bigger size
}));

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
// 👉 1. DISTANCE FROM MOUSE
  let dx = p.x - mouse.x;
  let dy = p.y - mouse.y;
  let dist = Math.sqrt(dx*dx + dy*dy);

  if (dist < 1) dist = 1;   // safety fix

  // 👉 2. MOUSE REPULSION (🔥 PUT HERE)
  if(dist < 120){
    let force = (120 - dist)/120;
    p.vx += dx/dist * force * 0.6;
    p.vy += dy/dist * force * 0.6;
  }

  // 👉 3. SMOOTHING
  p.vx *= 0.95;
  p.vy *= 0.95;

  // 👉 4. UPDATE POSITION
  p.x += p.vx;
  p.y += p.vy;
if (p.x < 0) p.x = 0;
if (p.x > canvas.width) p.x = canvas.width;
if (p.y < 0) p.y = 0;
if (p.y > canvas.height) p.y = canvas.height;
    // 🎨 COLOR + LABEL
    if(p.type === "e"){
      ctx.fillStyle = "orange";   // electrons
    } else {
      ctx.fillStyle = "deepskyblue"; // holes
    }

    // circle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();

    // label (e / h)
    ctx.fillStyle = "black";
    ctx.font = `${p.r}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(p.type, p.x, p.y);
  });

  requestAnimationFrame(animate);
}

animate();
