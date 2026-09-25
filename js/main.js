/**
 * ==============================================================================
 * MAIN INTERACTIVITY & CONTROLLER — YOGI FERNANDO
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupContactForm();
  checkRealProfilePhoto();
});

// Setup Mobile Navigation & Header Scroll State
function setupNavigation() {
  const header = document.getElementById("header");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("main-nav");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("nav-open");
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav-open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const navLink = document.querySelector(`.main-nav a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      }
    });
  });
}

// Setup Contact Form & Quick Email Copy
function setupContactForm() {
  const contactForm = document.getElementById("mission-contact-form");
  const copyEmailBtn = document.getElementById("btn-copy-email");
  const copyEmailHeroBtn = document.getElementById("btn-copy-email-hero");
  const devEmail = "yogifernando885@gmail.com";

  function handleCopyEmail() {
    navigator.clipboard.writeText(devEmail).then(() => {
      if (window.showToastMessage) {
        window.showToastMessage(`📋 Email ${devEmail} berhasil disalin!`);
      }
    }).catch(() => {
      window.location.href = `mailto:${devEmail}`;
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", handleCopyEmail);
  }

  if (copyEmailHeroBtn) {
    copyEmailHeroBtn.addEventListener("click", handleCopyEmail);
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
          window.showToastMessage("⚠️ Harap lengkapi seluruh kolom formulir!");
        }
        return;
      }

      const subject = encodeURIComponent(`Pesan Portofolio dari ${name}`);
      const body = encodeURIComponent(`Halo Yogi,\n\n${message}\n\nDari: ${name} (${email})`);
      const mailtoUrl = `mailto:${devEmail}?subject=${subject}&body=${body}`;

      if (window.showToastMessage) {
        window.showToastMessage("Membuka aplikasi email...");
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);

      contactForm.reset();
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
