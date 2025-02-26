let samples, button1, button2, button3, button4;

function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}

function preload() {
  samples = new Tone.Players({
    cat: "cat.mp3",
    dog: "dog.mp3",
    thunder: "thunder.mp3",
    waves: "waves.mp3"
  }).toDestination();

}

function setup() {
  createCanvas(400, 400);

  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext);

  button1 = createButton("Play Cat Sample");
  button1.position(10, 30);
  button1.mousePressed(() => samples.player("cat").start());

  button2 = createButton("Play Dog Sample");
  button2.position(200, 30);
  button2.mousePressed(() => samples.player("dog").start());

  button3 = createButton("Play Thunder Sample");
  button3.position(10, 70);
  button3.mousePressed(() => samples.player("thunder").start());

  button4 = createButton("Play Waves Sample");
  button4.position(200, 70);
  button4.mousePressed(() => samples.player("waves").start());
}

function draw() {
  background(220);
}


