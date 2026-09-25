/**
 * ==============================================================================
 * MAIN INTERACTIVITY & CONTROLLER
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupAudioControl();
  setupContactForm();
  setupMeteorTrigger();
  checkRealProfilePhoto();
  setupScrollAnimations();
});

// Setup Mobile Navigation & Sticky Header
function setupNavigation() {
  const header = document.querySelector(".cosmic-header");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("main-nav");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("nav-open");
    });

    // Tutup menu saat link diklik di mobile
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav-open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll header styling
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
}

// Setup Cosmic Audio FX Toggle
function setupAudioControl() {
  const audioBtn = document.getElementById("audio-toggle-btn");
  if (!audioBtn || !window.CosmicAudio) return;

  function updateAudioButtonUI() {
    const enabled = window.CosmicAudio.isEnabled;
    audioBtn.setAttribute("aria-pressed", enabled ? "true" : "false");
    audioBtn.innerHTML = enabled
      ? `<span class="sound-wave-icon">🔊</span> <span>Sound: ON</span>`
      : `<span class="sound-wave-icon">🔇</span> <span>Sound: OFF</span>`;
    audioBtn.classList.toggle("audio-active", enabled);
  }

  updateAudioButtonUI();

  audioBtn.addEventListener("click", () => {
    window.CosmicAudio.toggle();
    updateAudioButtonUI();
    if (window.showToastMessage) {
      window.showToastMessage(
        window.CosmicAudio.isEnabled
          ? "✨ Efek Suara Kosmik Diaktifkan!"
          : "Efek Suara Dinonaktifkan."
      );
    }
  });
}

// Setup Contact Form & Quick Email Copy
function setupContactForm() {
  const contactForm = document.getElementById("mission-contact-form");
  const copyEmailBtn = document.getElementById("btn-copy-email");
  const devEmail = "yogifernando885@gmail.com"; // Email Yogi Fernando

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(devEmail).then(() => {
        if (window.showToastMessage) {
          window.showToastMessage(`📋 Email ${devEmail} berhasil disalin ke clipboard!`);
        }
        if (window.CosmicAudio) {
          window.CosmicAudio.playStarlightChime();
        }
      }).catch(() => {
        window.location.href = `mailto:${devEmail}`;
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("sender-name");
      const emailInput = document.getElementById("sender-email");
      const messageInput = document.getElementById("sender-message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !email || !message) {
        if (window.showToastMessage) {
          window.showToastMessage("⚠️ Harap lengkapi semua kolom pesan!");
        }
        return;
      }

      // Buat mailto link langsung agar pesan bisa dikirim dari email pengguna
      const subject = encodeURIComponent(`Inquiry Portofolio dari ${name}`);
      const body = encodeURIComponent(`Halo Yogi,\n\n${message}\n\nDari: ${name} (${email})`);
      const mailtoUrl = `mailto:${devEmail}?subject=${subject}&body=${body}`;

      if (window.showToastMessage) {
        window.showToastMessage("🚀 Membuka aplikasi email Anda...");
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      contactForm.reset();
    });
  }
}

// Setup Trigger Meteor dari tombol
function setupMeteorTrigger() {
  const triggerBtn = document.getElementById("btn-trigger-meteor");
  if (triggerBtn) {
    triggerBtn.addEventListener("click", () => {
      if (typeof window.spawnCosmicMeteor === "function") {
        window.spawnCosmicMeteor();
      }
      if (window.CosmicAudio) {
        window.CosmicAudio.playStarlightChime();
      }
    });
  }
}

// Cek ketersediaan file foto profil nyata 'assets/profile.png' atau 'assets/profile.jpg'
function checkRealProfilePhoto() {
  const avatarImg = document.getElementById("developer-avatar");
  if (!avatarImg) return;

  const testPng = new Image();
  testPng.src = "assets/profile.png";
  testPng.onload = function () {
    avatarImg.src = "assets/profile.png";
  };
  testPng.onerror = function () {
    const testJpg = new Image();
    testJpg.src = "assets/profile.jpg";
    testJpg.onload = function () {
      avatarImg.src = "assets/profile.jpg";
    };
  };
}

// Scroll Intersection Reveal
function setupScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
}
