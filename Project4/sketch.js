let bugs = [];
let squishedCount = 0;
let timer = 30;
let gameRunning = true;
let bugSpritesheet;
let squishedImage;
let squishSound;
let frameWidth, frameHeight;
let numFrames = 4;
let spriteScale = 1.5;

function preload() {
  bugSpritesheet = loadImage("RoachSprite.png");
  squishedImage = loadImage("RoachSquish.png");
  squishSound = loadSound("squish.mp3");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);

  frameWidth = (bugSpritesheet.width / numFrames) * spriteScale;
  frameHeight = bugSpritesheet.height * spriteScale;

  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug(random(width), random(height)));
  }

  setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      gameRunning = false;
    }
  }, 1000);
}

function draw() {
  background(220);

  if (gameRunning) {
    for (let bug of bugs) {
      bug.move();
      bug.display();
    }

    fill(0);
    textSize(24);
    text(`Bugs Squished: ${squishedCount}`, 20, 30);
    text(`Time Left: ${timer}`, 20, 60);
  } else {
    textSize(32);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
    text(`Bugs Squished: ${squishedCount}`, width / 2, height / 2 + 40);
  }
}

function mousePressed() {
  if (!gameRunning) return;

  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].isClicked(mouseX, mouseY)) {
      bugs[i].squish();
      squishedCount++;
      bugs.push(new Bug(random(width), random(height), bugs[i].speed + 0.5));
    }
  }
}

class Bug {
  constructor(x, y, speed = 1.5) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = p5.Vector.random2D();
    this.alive = true;
    this.rotation = this.direction.heading();
    this.animation = new BugAnimation(bugSpritesheet, numFrames);
  }

  move() {
    if (!this.alive) return;

    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;

    if (this.x < 0 || this.x > width) {
      this.direction.x *= -1;
      this.rotation = this.direction.heading();
    }
    if (this.y < 0 || this.y > height) {
      this.direction.y *= -1;
      this.rotation = this.direction.heading();
    }

    this.animation.update();
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    if (this.alive) {
      this.animation.draw();
    } else {
      image(squishedImage, 0, 0, frameWidth, frameHeight);
    }

    pop();
  }

  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < frameWidth / 2;
  }

  squish() {
    this.alive = false;
    squishSound.play();
  }
}

class BugAnimation {
  constructor(spritesheet, frames) {
    this.spritesheet = spritesheet;
    this.frames = frames;
    this.frameIndex = 0;
    this.frameInterval = 100;
    this.lastUpdate = millis();
  }

  update() {
    if (millis() - this.lastUpdate > this.frameInterval) {
      this.frameIndex = (this.frameIndex + 1) % this.frames;
      this.lastUpdate = millis();
    }
  }

  draw() {
    image(this.spritesheet, 0, 0, frameWidth, frameHeight, 
          this.frameIndex * (bugSpritesheet.width / numFrames), 0, 
          bugSpritesheet.width / numFrames, bugSpritesheet.height);
  }
}
