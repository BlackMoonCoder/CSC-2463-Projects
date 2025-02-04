let brushColor;
let brushSize = 10;
let colors = [
  { color: '#FF0000', name: 'Red' },
  { color: '#FFA500', name: 'Orange' },
  { color: '#FFFF00', name: 'Yellow' },
  { color: '#008000', name: 'Green' },
  { color: '#00FFFF', name: 'Cyan' },
  { color: '#0000FF', name: 'Blue' },
  { color: '#FF00FF', name: 'Magenta' },
  { color: '#8B4513', name: 'Brown' },
  { color: '#FFFFFF', name: 'White' },
  { color: '#000000', name: 'Black' }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  brushColor = color(0);
  

  for (let i = 0; i < colors.length; i++) {
    let colorBlock = createDiv('');
    colorBlock.style('background-color', colors[i].color);
    colorBlock.style('width', '40px');
    colorBlock.style('height', '40px');
    colorBlock.style('margin', '5px');
    colorBlock.position(10, 10 + i * 50);
    colorBlock.mousePressed(() => brushColor = color(colors[i].color));
  }
  
  let clearButton = createButton('Clear Canvas');
  clearButton.position(10, colors.length * 50 + 20);
  clearButton.mousePressed(() => background(255));

  let eraserButton = createButton('Eraser');
  eraserButton.position(10, colors.length * 50 + 50);
  eraserButton.mousePressed(() => brushColor = color(255));
}

function draw() {
  if (mouseIsPressed && mouseX > 50) {
    stroke(brushColor);
    strokeWeight(brushSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

