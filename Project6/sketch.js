let synth1, filt, rev, polySynth, noise1, ampEnv1, filt1;
let activeKey = null;
let filterSlider;

let keyNotes = {
  'a': 'A4', 's': 'B4', 'd': 'C5', 'f': 'D5',
  'g': 'E5', 'h': 'F5', 'j': 'G5', 'k': 'A5'
};

let keyNotes1 = {
  'q': 'C4', 'w': 'D4', 'e': 'F4', 'r': 'G4',
  't': 'A4', 'y': 'B4', 'u': 'C5', 'i': 'D5'
};

function setup() {
  createCanvas(400, 400);
  
  filterSlider = createSlider(200, 5000, 1500, 1);
  filterSlider.position(20, 350);
  filterSlider.style('width', '360px');

  filt = new Tone.Filter(1500, "lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);

  synth1 = new Tone.Synth({
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.9, release: 0.3 },
    oscillator: { type: 'sine' }
  }).connect(rev);
  synth1.portamento = 0.5;

  polySynth = new Tone.PolySynth(Tone.Synth).connect(rev);
  polySynth.set({
    envelope: { attack: 0.1, decay: 0.1, sustain: 1, release: 0.1 },
    oscillator: { type: 'square' }
  });
  polySynth.volume.value = -6;

  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1, decay: 0.5, sustain: 0, release: 0.1
  }).toDestination();

  filt1 = new Tone.Filter(1500, "highpass").connect(ampEnv1);
  noise1 = new Tone.Noise('pink').start().connect(filt1);
}

function draw() {
  background(220);
  text("Keys A-K: Monophonic Synth\nKeys Q-I: Polyphonic Synth\nKey Z: Noise", 20, 20);
  text("Filter Frequency", 20, 340);
  filt.frequency.value = filterSlider.value();
}

function keyPressed() {
  let keyPressed = key.toLowerCase();
  let pitch = keyNotes[keyPressed];
  let pitch1 = keyNotes1[keyPressed];

  if (pitch && keyPressed !== activeKey) {
    synth1.triggerRelease();
    activeKey = keyPressed;
    synth1.triggerAttack(pitch);
  } else if (pitch1) {
    polySynth.triggerAttack(pitch1);
  } else if (keyPressed === "z") {
    ampEnv1.triggerAttackRelease(0.1);
  }
}

function keyReleased() {
  let keyReleased = key.toLowerCase();
  let pitch1 = keyNotes1[keyReleased];

  if (keyReleased === activeKey) {
    synth1.triggerRelease();
    activeKey = null;
  } else if (pitch1) {
    polySynth.triggerRelease(pitch1);
  }
}