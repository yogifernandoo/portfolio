/**
 * ==============================================================================
 * STARFIELD & COSMIC CANVAS ENGINE
 * ==============================================================================
 * Menghadirkan latar belakang luar angkasa hidup:
 * - Partikel bintang bertingkat (3D depth parallax)
 * - Efek gravitasi halus saat kursor bergerak
 * - Bintang jatuh (shooting stars) periodik & saat diklik
 * - Mode konstelasi interaktif
 */

(function () {
  const canvas = document.getElementById("space-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Konfigurasi
  const STAR_COUNT = Math.min(220, Math.floor((width * height) / 6000));
  const stars = [];
  const shootingStars = [];
  const ripples = [];

  const mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    active: false,
    radius: 140
  };

  const PALETTE = [
    { r: 248, g: 250, b: 252 }, // Starlight White
    { r: 56, g: 189, b: 248 },  // Pulsar Cyan
    { r: 168, g: 85, b: 247 },  // Nebula Violet
    { r: 251, g: 191, b: 36 }   // Solar Gold
  ];

  class Star {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : 0;
      this.baseX = this.x;
      this.baseY = this.y;
      this.z = Math.random() * 0.9 + 0.1; // Depth factor: 0.1 (jauh) s/d 1.0 (dekat)
      this.radius = this.z * 1.8;
      this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      this.alpha = Math.random() * 0.7 + 0.2;
      this.twinkleSpeed = (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
      this.speedY = this.z * 0.12;
      this.vx = 0;
      this.vy = 0;
    }

    update() {
      if (isReducedMotion) return;

      // Twinkle
      this.alpha += this.twinkleSpeed;
      if (this.alpha > 0.95 || this.alpha < 0.2) {
        this.twinkleSpeed = -this.twinkleSpeed;
      }

      // Gravitasi kursor mouse
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.6 * this.z;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
      }

      // Damping & restore
      this.vx *= 0.92;
      this.vy *= 0.92;

      this.x += this.vx;
      this.y += this.speedY + this.vy;

      // Wrap around canvas
      if (this.y > height) {
        this.y = 0;
        this.x = Math.random() * width;
      }
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
      ctx.fill();

      // Tambahkan glow untuk bintang yang dekat (z > 0.7)
      if (this.z > 0.75) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.18})`;
        ctx.fill();
      }
    }
  }

  class ShootingStar {
    constructor(startX, startY) {
      this.x = startX !== undefined ? startX : Math.random() * width * 0.8;
      this.y = startY !== undefined ? startY : Math.random() * (height * 0.4);
      this.len = Math.random() * 80 + 70;
      this.speed = Math.random() * 10 + 14;
      this.angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // ~45 derajat
      this.opacity = 1;
      this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.opacity -= this.decay;
    }

    draw() {
      if (this.opacity <= 0) return;
      const tailX = this.x - Math.cos(this.angle) * this.len;
      const tailY = this.y - Math.sin(this.angle) * this.len;

      const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
      grad.addColorStop(0.3, `rgba(56, 189, 248, ${this.opacity * 0.7})`);
      grad.addColorStop(1, "rgba(56, 189, 248, 0)");

      ctx.save();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      // Sparkle di ujung kepala meteor
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }

  class Ripple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 4;
      this.maxRadius = 120;
      this.opacity = 0.8;
    }

    update() {
      this.radius += 3.5;
      this.opacity -= 0.025;
    }

    draw() {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56, 189, 248, ${this.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(168, 85, 247, ${this.opacity * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
  }

  // Inisialisasi bintang
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star());
  }

  // Draw Constellation Lines near mouse
  function drawConstellations() {
    if (!mouse.active) return;
    const nearby = [];
    const maxDist = 95;

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const dx = s.x - mouse.x;
      const dy = s.y - mouse.y;
      if (Math.sqrt(dx * dx + dy * dy) < mouse.radius) {
        nearby.push(s);
      }
    }

    ctx.save();
    for (let i = 0; i < nearby.length; i++) {
      for (let j = i + 1; j < nearby.length; j++) {
        const p1 = nearby[i];
        const p2 = nearby[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.35;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  // Loop utama
  let lastMeteorTime = 0;
  function animate(timestamp) {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    // Gambar dan perbarui bintang
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
    }

    drawConstellations();

    // Bintang jatuh periodik setiap 4-7 detik
    if (timestamp - lastMeteorTime > 5000 + Math.random() * 3000) {
      shootingStars.push(new ShootingStar());
      lastMeteorTime = timestamp;
    }

    // Perbarui bintang jatuh
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ms = shootingStars[i];
      ms.update();
      ms.draw();
      if (ms.opacity <= 0) {
        shootingStars.splice(i, 1);
      }
    }

    // Perbarui ripples klik
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.update();
      r.draw();
      if (r.opacity <= 0) {
        ripples.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars.length = 0;
    const newCount = Math.min(220, Math.floor((width * height) / 6000));
    for (let i = 0; i < newCount; i++) {
      stars.push(new Star());
    }
  });

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  // Klik semesta: ciptakan ripple & tembakkan meteor kustom!
  window.addEventListener("click", (e) => {
    // Abaikan jika klik terjadi di dalam modal atau tombol navigasi
    if (e.target.closest("button, a, input, dialog, .no-canvas-click")) return;

    ripples.push(new Ripple(e.clientX, e.clientY));
    shootingStars.push(new ShootingStar(e.clientX - 50, e.clientY - 60));

    if (window.CosmicAudio && typeof window.CosmicAudio.playStarlightChime === "function") {
      window.CosmicAudio.playStarlightChime();
    }
  });

  // Start loop
  requestAnimationFrame(animate);

  // Expose helper untuk memicu meteor dari tombol UI
  window.spawnCosmicMeteor = function () {
    shootingStars.push(new ShootingStar());
  };
})();
