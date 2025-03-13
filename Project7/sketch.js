let basicSynth, filt, LFOfilt, panner, jumpNoise, jumpEnv, jumpFilter, values1, jumpImage;
let showImage = false;
let imageTimer = 0; 
let lfoDuration = 0.1; 

function preload() {
  jumpImage = loadImage('ToyLaser.png');
}

function setup() {
  createCanvas(400, 400);
 
  Tone.start();
  
  panner = new Tone.Panner(0).toDestination();
  
  filt = new Tone.Filter(1500, "bandpass", -12).connect(panner);
  
  basicSynth = new Tone.Synth({
    oscillator: {
      type: "triangle"
    },
    envelope: {
      attack: 0.005,
      decay: 0.05,
      sustain: 0.03,
      release: 0.08
    }
  }).connect(filt);
  
  LFOfilt = new Tone.LFO(10, 1500, 4000).start();
  LFOfilt.connect(filt.frequency);
  
  jumpEnv = new Tone.AmplitudeEnvelope({
    attack: 0.005,
    decay: 0.05,
    sustain: 0.03,
    release: 0.08
  }).connect(filt);
  
  jumpNoise = new Tone.Noise("white").connect(jumpEnv).start();
  
  jumpFilter = new Tone.Filter(2000, "bandpass").connect(filt);
  jumpNoise.connect(jumpFilter);
  
  values1 = new Float32Array([-96, -30, -30, -12, 0, -12, -6, -12, -30, -96]);
}

function draw() {
  background(220);

  if (showImage && millis() < imageTimer) {
    imageMode(CENTER);
    image(jumpImage, width / 2, height / 2, 100, 100);
  }

  textAlign(CENTER, CENTER);
  textSize(20);
  text('Click to simulate toy laser', width / 2, height / 2 + 120);
}

function mouseClicked() {
  basicSynth.triggerAttackRelease(random(900, 1300), 0.05);
  basicSynth.frequency.rampTo(random(1100, 1500), 0.02);
 
  jumpEnv.triggerAttackRelease(0.02);
  jumpNoise.volume.setValueCurveAtTime(values1, Tone.now(), 0.05);
 
  lfoDuration = 0.05;
  LFOfilt.frequency.value = 15;
  LFOfilt.frequency.rampTo(50, lfoDuration);
 
  panner.pan.setValueAtTime(random(-0.5, 0.5), Tone.now());

  showImage = true;
  imageTimer = millis() + (lfoDuration * 1000); 
}
