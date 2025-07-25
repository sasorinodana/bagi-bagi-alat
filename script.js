const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const rocketImg = new Image();
rocketImg.src = "roketku.png";

const enemyImg = new Image();
enemyImg.src = "musuhku.png";


let rocketX = canvas.width / 2 - 25;
const rocketY = canvas.height - 80;
const rocketWidth = 50;
const rocketHeight = 50;

let bullets = [];

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") rocketX -= 10;
  if (e.key === "ArrowRight") rocketX += 10;
  if (e.key === " ") shoot();
});

let enemies = [];

function spawnEnemy() {
  const enemyX = Math.random() * (canvas.width - 40);
  enemies.push({ x: enemyX, y: -40, width: 40, height: 40 });
}
let isTouching = false;
let touchX = 0;

canvas.addEventListener("touchstart", (e) => {
  isTouching = true;
  touchX = e.touches[0].clientX;
});

canvas.addEventListener("touchmove", (e) => {
  if (isTouching) {
    const currentX = e.touches[0].clientX;
    const dx = currentX - touchX;
    rocketX += dx;
    touchX = currentX;
  }
});

canvas.addEventListener("touchend", () => {
  isTouching = false;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




document.getElementById("shootBtn").addEventListener("click", shoot);

function shoot() {
  bullets.push({ x: rocketX + rocketWidth / 2 - 2.5, y: rocketY });
}

function draw() {
  if (rocketX < 0) rocketX = 0;
  if (rocketX + rocketWidth > canvas.width) rocketX = canvas.width - rocketWidth;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Gambar roket
  ctx.drawImage(rocketImg, rocketX, rocketY, rocketWidth, rocketHeight);

  // Gambar peluru
  ctx.fillStyle = "red";
  bullets.forEach((b, i) => {
    ctx.fillRect(b.x, b.y, 5, 10);
    b.y -= 5;
    if (b.y < 0) bullets.splice(i, 1);
  });

  // Gambar musuh
  enemies.forEach((e, ei) => {
    ctx.drawImage(enemyImg, e.x, e.y, e.width, e.height);
    e.y += 2;

    // Cek tabrakan dengan peluru
    bullets.forEach((b, bi) => {
      if (
        b.x < e.x + e.width &&
        b.x + 5 > e.x &&
        b.y < e.y + e.height &&
        b.y + 10 > e.y
      ) {
        // Hapus musuh & peluru kalau kena
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
      }
    });
  });

  requestAnimationFrame(draw);
}

rocketImg.onload = () => {
  draw();
};

setInterval(spawnEnemy, 2000);

