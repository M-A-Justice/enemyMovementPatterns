/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

const numOfEnemies = 10;
const enemies = [];

let gameFrame = 0;

class Enemy {
  constructor() {
    this.img = new Image();
    this.img.src = 'enemies/enemy2.png';
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.sinCurve = Math.random() * 7;
  } 

  update() {
    this.x -= this.speed;
    this.y += this.sinCurve * Math.sin(this.angle);
    this.angle += this.angleSpeed;

    if (this.x + this.width < 0) {
      this.x = canvas.width;
    }

    // animate enemies
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? this.frame = 0 : this.frame += 1;
    }
  }

  draw() {
    ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
};

for (let i = 0; i < numOfEnemies; i += 1) {
  enemies.push(new Enemy());
}

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  enemies.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  })

  gameFrame += 1;

  requestAnimationFrame(animate);
};

animate();
