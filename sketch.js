function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 98); 
  //Sketch 1
  fill(120, 100, 50);
  strokeWeight(0);
  rect(25, 350, 500, 300);

  fill(0, 0, 100);  
  strokeWeight(1.5);
  stroke(0, 0, 0);  
  ellipse(145, 500, 215);
  rect(295, 405, 200, 200);

  // Sketch 2
  noStroke();
  fill(0, 100, 100, 0.33);  
  ellipse(270, 130, 200);

  fill(240, 100, 100, 0.3);  
  ellipse(185, 235, 200);

  fill(130, 100, 100, 0.4);  
  ellipse(345, 235, 200);

  // Sketch 3
  noStroke();

  fill(40, 66, 100);  
  ellipse(150, 735.5, 115);

  fill(0, 0, 100);  
  triangle(155, 735, 75, 798, 75, 668);

  fill(0, 100, 76);  
  rect(300, 720, 100, 60);
  ellipse(350, 720, 100);

  fill(0, 0, 100);  
  ellipse(325, 720, 30);
  ellipse(375, 720, 30);

  fill(230, 72, 100);  
  ellipse(325, 720, 20);
  ellipse(375, 720, 20);

  // Sketch 4
  fill(240, 100, 50);
  strokeWeight(0);
  rect(580, 50, 400, 300);

  fill(120, 95, 39);  
  stroke(0, 0, 100);  
  ellipse(780, 192, 215);

  fill(0, 100, 100);  
  beginShape();
  vertex(780, 85);
  vertex(755, 155);
  vertex(680, 155);
  vertex(737, 196);
  vertex(715, 280);
  vertex(780, 225);
  vertex(845, 280);
  vertex(828, 196);
  vertex(880, 155);
  vertex(813, 155);
  vertex(780, 85);
  endShape(CLOSE);
}