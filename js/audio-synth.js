/**
 * ==============================================================================
 * COSMIC SYNTHESIZER AUDIO ENGINE (Web Audio API)
 * ==============================================================================
 * 100% Native Web Audio API - Tanpa file audio eksternal, hemat bandwidth,
 * dan langsung bekerja optimal di GitHub Pages.
 */

window.CosmicAudio = (function () {
  let audioCtx = null;
  let isEnabled = false;

  // Baca preferensi tersimpan
  try {
    isEnabled = localStorage.getItem("cosmic_sound_enabled") === "true";
  } catch (e) {
    isEnabled = false;
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Nada lembut kosmik (Pentatonic Celestial Frequencies)
  const CELESTIAL_NOTES = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

  function playTone(freq, type = "sine", duration = 0.6, gainLevel = 0.08) {
    if (!isEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Smooth attack & exponential decay
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainLevel, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Graceful fallback
    }
  }

  return {
    get isEnabled() {
      return isEnabled;
    },

    toggle() {
      isEnabled = !isEnabled;
      try {
        localStorage.setItem("cosmic_sound_enabled", isEnabled ? "true" : "false");
      } catch (e) {}

      if (isEnabled) {
        getAudioContext();
        this.playPlanetHover(440); // Feedback aktif
      }
      return isEnabled;
    },

    playStarlightChime() {
      if (!isEnabled) return;
      const note = CELESTIAL_NOTES[Math.floor(Math.random() * CELESTIAL_NOTES.length)];
      playTone(note, "sine", 0.5, 0.07);
    },

    playPlanetHover(freq = 587.33) {
      if (!isEnabled) return;
      playTone(freq, "triangle", 0.4, 0.06);
    },

    playWarpSound() {
      if (!isEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.8);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } catch (e) {}
    },

    playModalOpen() {
      if (!isEnabled) return;
      playTone(659.25, "sine", 0.35, 0.08);
      setTimeout(() => playTone(880, "sine", 0.45, 0.07), 80);
    }
  };
})();
