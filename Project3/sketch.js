let Monk, Ninja, Robot;
let characters = [];

function preload() {
  Monk = loadImage('Monk.png');
  Ninja = loadImage('Ninja.png');
  Robot = loadImage('Robot.png');
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  characters.push(new Character(random(30, width), random(30, height), Monk));
  characters.push(new Character(random(30, width), random(30, height), Ninja));
  characters.push(new Character(random(30, width), random(30, height), Robot));
}

function draw() {
  background(220);
  characters.forEach(char => {
    char.update();
    char.draw();
  });
}

function keyPressed() {
  characters.forEach(char => char.handleKeyPress());
}

function keyReleased() {
  characters.forEach(char => char.handleKeyRelease());
}

// Character Class
class Character {
  constructor(x, y, spritesheet) {
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.currentAnimation = "stand";
    this.lastDirection = "right"; // Track last movement direction
    this.animations = {
      "right": new SpriteAnimation(spritesheet, 2, 0, 7),
      "left": new SpriteAnimation(spritesheet, 2, 0, 7, true),
      "stand": new SpriteAnimation(spritesheet, 0, 0, 1),
      "standLeft": new SpriteAnimation(spritesheet, 0, 0, 1, true)
    };
  }

  update() {
    if (this.currentAnimation === "right") {
      this.x += 2;
    } else if (this.currentAnimation === "left") {
      this.x -= 2;
    }
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    push();
    translate(this.x, this.y);
    animation.draw();
    pop();
  }

  handleKeyPress() {
    if (keyCode === RIGHT_ARROW) {
      this.currentAnimation = "right";
      this.lastDirection = "right"; // Update last movement direction
    } else if (keyCode === LEFT_ARROW) {
      this.currentAnimation = "left";
      this.lastDirection = "left"; // Update last movement direction
      this.animations["left"].flipped = true;
    }
  }

  handleKeyRelease() {
    if (this.lastDirection === "right") {
      this.currentAnimation = "stand";
    } else {
      this.currentAnimation = "standLeft";
    }
  }
}

// Sprite Animation Class
class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration, flipped = false) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = flipped;
  }

  draw() {
    push();
    scale(this.flipped ? -1 : 1, 1);
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);

    this.frameCount = (this.frameCount + 1) % (this.duration * 10);
    if (this.frameCount % 10 === 0) {
      this.u = this.startU + (this.u - this.startU + 1) % this.duration;
    }
    pop();
  }
}
