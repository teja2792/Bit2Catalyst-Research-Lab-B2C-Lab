const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {x: 0, y: 0};

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let particles = Array.from({length: 500}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  vx: (Math.random()-0.5)*2,
  vy: (Math.random()-0.5)*2
}));

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    let dx = p.x - mouse.x;
    let dy = p.y - mouse.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 120){
      let force = (120 - dist)/120;
      p.vx += dx/dist * force * 0.6;
      p.vy += dy/dist * force * 0.6;
    }

    p.vx *= 0.95;
    p.vy *= 0.95;

    p.x += p.vx;
    p.y += p.vy;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
    ctx.fillStyle = `hsl(${p.x % 200},70%,60%)`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
