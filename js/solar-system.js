/**
 * ==============================================================================
 * INTERACTIVE SOLAR SYSTEM (ORBIT KEAHLIAN & TEKNOLOGI)
 * ==============================================================================
 * Keahlian Utama: Laravel, PHP, React, JavaScript, Tailwind CSS, MySQL.
 */

(function () {
  const PLANET_DATA = {
    core: {
      name: "Sol / Central Core",
      type: "Logika Pemrograman & Solusi Masalah",
      color: "#fbbf24",
      desc: "Pusat dari setiap aplikasi yang saya bangun: struktur kode yang bersih (clean code), arsitektur terstruktur, pemecahan masalah algoritma secara efisien, serta fokus pada kebutuhan pengguna.",
      skills: [
        "Problem Solving & Logika",
        "Arsitektur MVC & REST API",
        "Clean Code & Refactoring",
        "Keamanan Aplikasi Web",
        "User Experience & Aksesibilitas"
      ]
    },
    frontend: {
      name: "Kepler-Front (React & JS)",
      type: "Frontend & Interaktivitas Web",
      color: "#38bdf8",
      orbitRadius: 140,
      desc: "Membangun antarmuka web modern yang interaktif, cepat, dan responsif di berbagai perangkat menggunakan ekosistem React dan JavaScript modern.",
      skills: [
        "React.js",
        "JavaScript (ES6+)",
        "React Hooks & State Management",
        "DOM & Event Handling",
        "Single Page Application (SPA)",
        "Integrasi REST API ke Frontend"
      ]
    },
    backend: {
      name: "Titan-Back (Laravel & PHP)",
      type: "Backend & Arsitektur Server",
      color: "#818cf8",
      orbitRadius: 210,
      desc: "Merancang backend andal dengan Laravel dan PHP: routing, controller, autentikasi aman, validasi data, middleware, dan pembuatan endpoint REST API.",
      skills: [
        "Laravel Framework",
        "PHP (PHP 8+)",
        "Eloquent ORM & Migrations",
        "RESTful API Development",
        "Autentikasi & Middleware",
        "Blade Templating Engine"
      ]
    },
    database: {
      name: "Ares-Data (MySQL)",
      type: "Basis Data & Manajemen Data",
      color: "#f43f5e",
      orbitRadius: 280,
      desc: "Perancangan skema database relasional yang rapi, normalisasi tabel, penulisan query SQL teroptimasi, serta pengelolaan relasi data yang konsisten.",
      skills: [
        "MySQL Database",
        "Relational Schema Design",
        "Query Optimization & Indexing",
        "Foreign Keys & Transactions",
        "Database Migrations & Seeding",
        "Data Integrity & Backup"
      ]
    },
    devops: {
      name: "Jovian-Style (Tailwind & Workflow)",
      type: "Styling Modern & Deployment",
      color: "#34d399",
      orbitRadius: 350,
      desc: "Desain visual yang presisi menggunakan Tailwind CSS, alur kerja version control dengan Git/GitHub, serta deployment website tanpa biaya melalui GitHub Pages.",
      skills: [
        "Tailwind CSS",
        "Utility-First Responsive Styling",
        "Custom Tailwind Components",
        "Git & GitHub Workflow",
        "GitHub Pages Deployment",
        "Postman API Testing"
      ]
    }
  };

  let isPaused = false;
  let isWarpSpeed = false;
  let activePlanetKey = null;

  function initSolarSystem() {
    const container = document.getElementById("solar-stage");
    if (!container) return;

    const planets = container.querySelectorAll(".orbit-planet, .solar-core");
    const hudModal = document.getElementById("planet-hud-dialog");
    const hudCloseBtn = document.getElementById("hud-close-btn");
    const warpBtn = document.getElementById("btn-warp-speed");
    const pauseBtn = document.getElementById("btn-pause-orbit");

    // Event Klik Planet
    planets.forEach((planetEl) => {
      planetEl.addEventListener("click", (e) => {
        e.stopPropagation();
        const key = planetEl.dataset.planet;
        if (key && PLANET_DATA[key]) {
          showPlanetDetails(key);
          if (window.CosmicAudio) {
            window.CosmicAudio.playPlanetHover(getKeyFreq(key));
          }
        }
      });

      // Sound hover
      planetEl.addEventListener("mouseenter", () => {
        const key = planetEl.dataset.planet;
        if (window.CosmicAudio) {
          window.CosmicAudio.playPlanetHover(getKeyFreq(key));
        }
      });
    });

    // Tombol Warp Speed
    if (warpBtn) {
      warpBtn.addEventListener("click", () => {
        isWarpSpeed = !isWarpSpeed;
        container.classList.toggle("warp-speed-active", isWarpSpeed);
        warpBtn.classList.toggle("btn-active", isWarpSpeed);
        warpBtn.innerHTML = isWarpSpeed ? "⚡ Normal Speed" : "🚀 Warp Speed (3x)";

        if (window.CosmicAudio && isWarpSpeed) {
          window.CosmicAudio.playWarpSound();
        }
      });
    }

    // Tombol Pause Orbit
    if (pauseBtn) {
      pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        container.classList.toggle("orbit-paused", isPaused);
        pauseBtn.classList.toggle("btn-active", isPaused);
        pauseBtn.innerHTML = isPaused ? "▶ Lanjutkan Orbit" : "⏸ Hentikan Putaran";
      });
    }

    // Modal Close
    if (hudCloseBtn && hudModal) {
      hudCloseBtn.addEventListener("click", () => {
        if (typeof hudModal.close === "function") {
          hudModal.close();
        } else {
          hudModal.removeAttribute("open");
        }
      });
    }

    // Klik di luar dialog menutup HUD
    if (hudModal) {
      hudModal.addEventListener("click", (e) => {
        const rect = hudModal.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          if (typeof hudModal.close === "function") hudModal.close();
          else hudModal.removeAttribute("open");
        }
      });
    }
  }

  function getKeyFreq(key) {
    switch (key) {
      case "core": return 523.25;
      case "frontend": return 659.25;
      case "backend": return 783.99;
      case "database": return 880.00;
      case "devops": return 1046.50;
      default: return 587.33;
    }
  }

  function showPlanetDetails(key) {
    const data = PLANET_DATA[key];
    if (!data) return;

    activePlanetKey = key;
    const hudModal = document.getElementById("planet-hud-dialog");
    const nameEl = document.getElementById("hud-planet-name");
    const typeEl = document.getElementById("hud-planet-type");
    const descEl = document.getElementById("hud-planet-desc");
    const skillsList = document.getElementById("hud-planet-skills");
    const dotEl = document.getElementById("hud-planet-indicator");

    if (nameEl) nameEl.textContent = data.name;
    if (typeEl) typeEl.textContent = data.type;
    if (descEl) descEl.textContent = data.desc;
    if (dotEl) dotEl.style.backgroundColor = data.color;

    if (skillsList) {
      skillsList.innerHTML = "";
      data.skills.forEach((skill) => {
        const li = document.createElement("li");
        li.className = "skill-hud-pill";
        li.innerHTML = `<span class="pill-dot" style="background:${data.color}"></span> ${skill}`;
        skillsList.appendChild(li);
      });
    }

    if (hudModal) {
      if (typeof hudModal.showModal === "function") {
        hudModal.showModal();
      } else {
        hudModal.setAttribute("open", "true");
      }
      if (window.CosmicAudio) {
        window.CosmicAudio.playModalOpen();
      }
    }
  }

  // Run on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSolarSystem);
  } else {
    initSolarSystem();
  }

  window.showPlanetTelemetry = showPlanetDetails;
})();
