let bugs = [];
let squishedCount = 0;
let timer = 30;
let gameState = "start";
let bugSpritesheet, squishedImage, squishSound, skitteringSound, missSound, bgMusic, gameOverSound;
let frameWidth, frameHeight;
let numFrames = 4;
let spriteScale = 1.5;

function preload() {
  bugSpritesheet = loadImage("RoachSprite.png");
  squishedImage = loadImage("RoachSquish.png");
  squishSound = loadSound("squish.mp3");
  skitteringSound = loadSound("skittering.mp3");
  missSound = loadSound("miss.mp3");
  bgMusic = loadSound("background-music.mp3");
  gameOverSound = loadSound("game-over.mp3");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  frameWidth = (bugSpritesheet.width / numFrames) * spriteScale;
  frameHeight = bugSpritesheet.height * spriteScale;
}

function startGame() {
  bugs = [];
  squishedCount = 0;
  timer = 30;
  gameState = "playing";
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug(random(width), random(height)));
  }
  bgMusic.loop();
  skitteringSound.loop();
  skitteringSound.setVolume(0.3);

  setInterval(() => {
    if (gameState === "playing" && timer > 0) {
      timer--;
    } else if (timer === 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  if (gameState !== "gameOver") {
    gameState = "gameOver";
    bgMusic.stop();
    skitteringSound.stop();
    gameOverSound.play();
  }
}

function draw() {
  background(220);

  if (gameState === "start") {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Click to Start", width / 2, height / 2);
  } else if (gameState === "playing") {
    for (let bug of bugs) {
      bug.move();
      bug.display();
    }
    let volume = map(bugs.length, 5, 20, 0.3, 1);
    skitteringSound.setVolume(constrain(volume, 0.3, 1));
    bgMusic.rate(constrain(map(timer, 30, 0, 1, 1.2), 1, 1.2));
    fill(0);
    textSize(24);
    text(`Bugs Squished: ${squishedCount}`, 100, 30);
    text(`Time Left: ${timer}`, 85, 60);
  } else if (gameState === "gameOver") {
    textSize(32);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
    text(`Bugs Squished: ${squishedCount}`, width / 2, height / 2 + 40);
    text("Click to Restart", width / 2, height / 2 + 80);
  }
}

function mousePressed() {
  if (gameState === "start" || gameState === "gameOver") {
    startGame();
    return;
  }

  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].isClicked(mouseX, mouseY)) {
      if (bugs[i].alive) {
        bugs[i].squish();
        squishedCount++;
        bugs.push(new Bug(random(width), random(height), bugs[i].speed + 0.5));
      }
      return;
    }
  }
  missSound.play();
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
      }
      if (this.y < 0 || this.y > height) {
          this.direction.y *= -1;
      }

      this.rotation = this.direction.heading();

      this.animation.update();

      if (this.y > height + 10 && this.alive) {
          missSound.play();
          this.alive = false;
      }
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
      squishSound.rate(random(0.9, 1.1));
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