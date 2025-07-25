const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const rocketImg = new Image();
rocketImg.src = "roketku.png";

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

document.getElementById("shootBtn").addEventListener("click", shoot);

function shoot() {
  bullets.push({ x: rocketX + rocketWidth / 2 - 2.5, y: rocketY });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Gambar roket
  ctx.drawImage(rocketImg, rocketX, rocketY, rocketWidth, rocketHeight);

  // Gambar peluru
  ctx.fillStyle = "red";
  bullets.forEach((b, i) => {
    ctx.fillRect(b.x, b.y, 5, 10);
    b.y -= 5;

    // Hapus peluru yg keluar layar
    if (b.y < 0) bullets.splice(i, 1);
  });

  requestAnimationFrame(draw);
}

rocketImg.onload = () => {
  draw();
};
