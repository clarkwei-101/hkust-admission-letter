/**
 * Procedural sound effects via WebAudio API.
 * No audio assets required — everything synthesised in browser.
 */

let audioContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (audioContext) return audioContext;
  const Ctor = window.AudioContext || (window as any).webkitAudioContext;
  if (!Ctor) return null;
  audioContext = new Ctor();
  return audioContext;
}

/** Envelope seal crack — short crisp noise burst */
export function playSealCrack() {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const t = i / ctx.sampleRate;
    const env = Math.exp(-t * 12);
    data[i] = (Math.random() * 2 - 1) * env;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2400;
  filter.Q.value = 1.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.6, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start();
}

/** Soft paper unfold swoosh */
export function playUnfoldSwoosh() {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const bufferSize = ctx.sampleRate * 0.7;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const t = i / ctx.sampleRate;
    const env = Math.sin((Math.PI * t) / 0.7);
    data[i] = (Math.random() * 2 - 1) * env * 0.4;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 900;
  filter.Q.value = 0.7;
  const gain = ctx.createGain();
  gain.gain.value = 0.5;
  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start();
}

/** Single bell chime */
export function playChime(frequency = 880, duration = 1.8) {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = frequency;
  osc.connect(gain).connect(ctx.destination);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start();
  osc.stop(ctx.currentTime + duration);

  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.value = frequency * 2;
  osc2.connect(gain2).connect(ctx.destination);
  gain2.gain.setValueAtTime(0, ctx.currentTime);
  gain2.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04);
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration * 0.7);
  osc2.start();
  osc2.stop(ctx.currentTime + duration * 0.7);

  // Third harmonic
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = 'sine';
  osc3.frequency.value = frequency * 3;
  osc3.connect(gain3).connect(ctx.destination);
  gain3.gain.setValueAtTime(0, ctx.currentTime);
  gain3.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.03);
  gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration * 0.4);
  osc3.start();
  osc3.stop(ctx.currentTime + duration * 0.4);
}

/** Victory fanfare — ascending fanfare sequence */
export function playCelebrationFanfare() {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  // C-E-G-C major arpeggio (famous triumphant chord)
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  const noteLen = 0.18;

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    osc.connect(gain).connect(ctx.destination);

    const start = ctx.currentTime + i * noteLen;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.3, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + noteLen * 2.5);

    osc.start(start);
    osc.stop(start + noteLen * 3);
  });

  // Add a sustained chord underneath
  [523, 659, 784].forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(gain).connect(ctx.destination);

    const start = ctx.currentTime;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.12, start + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 2.5);

    osc.start(start);
    osc.stop(start + 2.5);
  });
}

/** Extended crowd applause — 10 seconds, layered with clap variations */
export function playApplause() {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const duration = 10;

  // --- Layer 1: main pink-noise applause body ---
  const mainSize = ctx.sampleRate * duration;
  const mainBuffer = ctx.createBuffer(1, mainSize, ctx.sampleRate);
  const mainData = mainBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < mainSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + white * 0.099046;
    b1 = 0.96300 * b1 + white * 0.29680;
    b2 = 0.57000 * b2 + white * 1.05269;
    mainData[i] = (b0 + b1 + b2 + white * 0.1848) * 0.18;
  }
  const mainNoise = ctx.createBufferSource();
  mainNoise.buffer = mainBuffer;
  const mainFilter = ctx.createBiquadFilter();
  mainFilter.type = 'bandpass';
  mainFilter.frequency.value = 1600;
  mainFilter.Q.value = 0.8;
  const mainGain = ctx.createGain();
  mainGain.gain.setValueAtTime(0, ctx.currentTime);
  mainGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.4);
  mainGain.gain.setValueAtTime(0.35, ctx.currentTime + 2.5);
  mainGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 7);
  mainGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  mainNoise.connect(mainFilter).connect(mainGain).connect(ctx.destination);
  mainNoise.start();
  mainNoise.stop(ctx.currentTime + duration);

  // --- Layer 2: high-freq claps (attack transients) ---
  const clapSize = ctx.sampleRate * duration;
  const clapBuffer = ctx.createBuffer(1, clapSize, ctx.sampleRate);
  const clapData = clapBuffer.getChannelData(0);
  for (let i = 0; i < clapSize; i++) {
    clapData[i] = Math.random() * 2 - 1;
  }
  const clapNoise = ctx.createBufferSource();
  clapNoise.buffer = clapBuffer;
  const clapFilter = ctx.createBiquadFilter();
  clapFilter.type = 'highpass';
  clapFilter.frequency.value = 3000;
  clapFilter.Q.value = 1.2;
  const clapGain = ctx.createGain();

  // Stamp-like pulses every ~0.12s for the first 5 seconds
  for (let stamp = 0; stamp < 5; stamp += 0.12) {
    const stampTime = ctx.currentTime + stamp;
    clapGain.gain.setValueAtTime(0, stampTime);
    clapGain.gain.linearRampToValueAtTime(0.15, stampTime + 0.01);
    clapGain.gain.exponentialRampToValueAtTime(0.001, stampTime + 0.08);
  }
  clapGain.gain.setValueAtTime(0, ctx.currentTime + 5);
  clapGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 5.5);
  clapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  clapNoise.connect(clapFilter).connect(clapGain).connect(ctx.destination);
  clapNoise.start();
  clapNoise.stop(ctx.currentTime + duration);

  // --- Layer 3: low rumble (audience presence) ---
  const rumbleSize = ctx.sampleRate * duration;
  const rumbleBuffer = ctx.createBuffer(1, rumbleSize, ctx.sampleRate);
  const rumbleData = rumbleBuffer.getChannelData(0);
  for (let i = 0; i < rumbleSize; i++) {
    rumbleData[i] = (Math.random() * 2 - 1) * 0.4;
  }
  const rumbleNoise = ctx.createBufferSource();
  rumbleNoise.buffer = rumbleBuffer;
  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = 'lowpass';
  rumbleFilter.frequency.value = 200;
  rumbleFilter.Q.value = 0.5;
  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0, ctx.currentTime);
  rumbleGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1);
  rumbleGain.gain.setValueAtTime(0.2, ctx.currentTime + 7);
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  rumbleNoise.connect(rumbleFilter).connect(rumbleGain).connect(ctx.destination);
  rumbleNoise.start();
  rumbleNoise.stop(ctx.currentTime + duration);

  // --- Layer 4: random secondary claps (delayed echoes) ---
  const echoSize = ctx.sampleRate * duration;
  const echoBuffer = ctx.createBuffer(1, echoSize, ctx.sampleRate);
  const echoData = echoBuffer.getChannelData(0);
  let eb0 = 0, eb1 = 0;
  for (let i = 0; i < echoSize; i++) {
    const white = Math.random() * 2 - 1;
    eb0 = 0.99 * eb0 + white * 0.08;
    eb1 = 0.97 * eb1 + white * 0.15;
    echoData[i] = (eb0 + eb1 + white * 0.1) * 0.15;
  }
  const echoNoise = ctx.createBufferSource();
  echoNoise.buffer = echoBuffer;
  const echoFilter = ctx.createBiquadFilter();
  echoFilter.type = 'bandpass';
  echoFilter.frequency.value = 2500;
  echoFilter.Q.value = 1.5;
  const echoGain = ctx.createGain();
  echoGain.gain.setValueAtTime(0, ctx.currentTime);
  echoGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3);
  echoGain.gain.setValueAtTime(0.25, ctx.currentTime + 2);
  echoGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 8);
  echoGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  echoNoise.connect(echoFilter).connect(echoGain).connect(ctx.destination);
  echoNoise.start();
  echoNoise.stop(ctx.currentTime + duration);
}
