/**
 * ==============================================================================
 * STEALTH ADMIN AUTHENTICATION ENGINE
 * ==============================================================================
 * Fitur:
 * - Tersembunyi 100% dari pengunjung umum (tanpa tombol login di halaman).
 * - Cara login rahasia:
 *   1. Shortcut keyboard: Ctrl + Shift + A (atau Cmd + Shift + A di Mac)
 *   2. Klik ikon planet 🪐 di header 3x berturut-turut
 *   3. Akses URL berakhiran #admin (misal: index.html#admin)
 * - Password terenkripsi SHA-256 (Default: "yogi2026")
 * - Mengaktifkan fitur CRUD proyek dan crop foto hanya untuk Yogi
 */

(function () {
  // Hash SHA-256 default untuk kata sandi "yogi2026"
  const DEFAULT_HASH = "9e5dc106fe85e582ed4a7b4aa8df2f5693adcfabf8920a4ca1a43d156cb51c8a";
  const HASH_KEY = "yogi_admin_pwd_hash";
  const AUTH_KEY = "yogi_admin_session";

  // Hitung SHA-256 via Web Crypto API
  async function computeSHA256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function getStoredHash() {
    return localStorage.getItem(HASH_KEY) || DEFAULT_HASH;
  }

  function isLoggedIn() {
    return sessionStorage.getItem(AUTH_KEY) === "true";
  }

  function setLoggedIn(state) {
    if (state) {
      sessionStorage.setItem(AUTH_KEY, "true");
      document.body.classList.add("admin-logged-in");
    } else {
      sessionStorage.removeItem(AUTH_KEY);
      document.body.classList.remove("admin-logged-in");
    }
    updateAdminUI();
  }

  // Update Tampilan Berdasarkan Status Login
  function updateAdminUI() {
    const logged = isLoggedIn();
    let bar = document.getElementById("admin-floating-bar");

    // Tombol Pasang/Crop foto di kartu profil
    const avatarBtn = document.getElementById("btn-custom-avatar-guide");
    if (avatarBtn) {
      avatarBtn.style.display = logged ? "inline-flex" : "none";
    }

    if (logged) {
      document.body.classList.add("admin-logged-in");
      if (!bar) {
        bar = document.createElement("div");
        bar.id = "admin-floating-bar";
        bar.className = "admin-floating-bar";
        document.body.prepend(bar);
      }
      bar.innerHTML = `
        <div class="admin-bar-inner">
          <div class="admin-identity">
            <span class="admin-badge-dot">●</span>
            <strong>Mode Admin: Yogi Fernando</strong>
          </div>
          <div class="admin-actions-group">
            <button id="btn-admin-add-project" class="btn-admin-pill" title="Tambah Proyek Baru">
              ➕ Tambah Proyek
            </button>
            <button id="btn-admin-crop-photo" class="btn-admin-pill" title="Buka Crop Foto">
              📷 Crop Foto
            </button>
            <button id="btn-admin-export-data" class="btn-admin-pill" title="Unduh file data untuk diupload ke GitHub">
              💾 Unduh data/projects-data.js
            </button>
            <button id="btn-admin-change-pwd" class="btn-admin-pill" title="Ubah Password Admin">
              🔑 Ganti Password
            </button>
            <button id="btn-admin-logout" class="btn-admin-pill btn-admin-logout" title="Keluar dari Mode Admin">
              🚪 Logout
            </button>
          </div>
        </div>
      `;

      // Event listener tombol admin bar
      document.getElementById("btn-admin-add-project")?.addEventListener("click", () => {
        if (window.openProjectCrudModal) window.openProjectCrudModal(null);
      });
      document.getElementById("btn-admin-crop-photo")?.addEventListener("click", () => {
        const dlg = document.getElementById("avatar-guide-dialog");
        if (dlg) {
          if (typeof dlg.showModal === "function") dlg.showModal();
          else dlg.setAttribute("open", "true");
        }
      });
      document.getElementById("btn-admin-export-data")?.addEventListener("click", () => {
        if (window.exportProjectsDataFile) window.exportProjectsDataFile();
      });
      document.getElementById("btn-admin-change-pwd")?.addEventListener("click", promptChangePassword);
      document.getElementById("btn-admin-logout")?.addEventListener("click", () => {
        setLoggedIn(false);
        if (window.showToastMessage) window.showToastMessage("Keluar dari Mode Admin.");
        if (window.renderProjectGrid) window.renderProjectGrid();
      });
    } else {
      document.body.classList.remove("admin-logged-in");
      if (bar) bar.remove();
    }

    // Refresh grid proyek agar tombol Edit/Hapus muncul/hilang
    if (window.renderProjectGrid) {
      window.renderProjectGrid();
    }
  }

  // Buka Modal Login Rahasia
  function openSecretLoginDialog() {
    if (isLoggedIn()) {
      if (window.showToastMessage) {
        window.showToastMessage("Anda sudah dalam mode Admin (Yogi Fernando).");
      }
      return;
    }

    const dialog = document.getElementById("admin-login-dialog");
    const input = document.getElementById("admin-password-input");
    const errorMsg = document.getElementById("admin-login-error");

    if (errorMsg) errorMsg.style.display = "none";
    if (input) input.value = "";

    if (dialog) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "true");
      if (input) setTimeout(() => input.focus(), 150);
    }
  }

  // Verifikasi Password
  async function attemptLogin(password) {
    const errorMsg = document.getElementById("admin-login-error");
    const dialog = document.getElementById("admin-login-dialog");
    const hash = await computeSHA256(password);
    const validHash = getStoredHash();

    if (hash === validHash) {
      setLoggedIn(true);
      if (dialog) {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      }
      if (window.showToastMessage) {
        window.showToastMessage("✨ Selamat datang kembali, Yogi Fernando! Mode Admin aktif.");
      }
      if (window.CosmicAudio) {
        window.CosmicAudio.playStarlightChime();
      }
    } else {
      if (errorMsg) {
        errorMsg.textContent = "Kata sandi salah. Akses ditolak.";
        errorMsg.style.display = "block";
      }
    }
  }

  // Ganti Password Admin
  async function promptChangePassword() {
    const current = prompt("Masukkan kata sandi lama Anda:");
    if (!current) return;
    const currentHash = await computeSHA256(current);
    if (currentHash !== getStoredHash()) {
      alert("Kata sandi lama salah!");
      return;
    }

    const newPwd = prompt("Masukkan kata sandi baru Anda (minimal 6 karakter):");
    if (!newPwd || newPwd.length < 6) {
      alert("Kata sandi baru terlalu pendek!");
      return;
    }

    const newHash = await computeSHA256(newPwd);
    localStorage.setItem(HASH_KEY, newHash);
    if (window.showToastMessage) {
      window.showToastMessage("✅ Kata sandi admin berhasil diperbarui!");
    }
  }

  // Inisialisasi Pemicu Rahasia (Stealth Triggers)
  function setupSecretTriggers() {
    // 1. Shortcut Keyboard: Ctrl + Shift + A (atau Cmd + Shift + A)
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        openSecretLoginDialog();
      }
    });

    // 2. Klik Ikon Planet 🪐 di header sebanyak 3x
    const brandIcon = document.querySelector(".brand-icon-wrap");
    if (brandIcon) {
      let clickCount = 0;
      let clickTimer = null;
      brandIcon.addEventListener("click", (e) => {
        clickCount++;
        clearTimeout(clickTimer);
        if (clickCount >= 3) {
          e.preventDefault();
          clickCount = 0;
          openSecretLoginDialog();
        } else {
          clickTimer = setTimeout(() => {
            clickCount = 0;
          }, 800);
        }
      });
    }

    // 3. Deteksi Hash URL #admin
    if (window.location.hash === "#admin") {
      history.replaceState(null, null, window.location.pathname);
      openSecretLoginDialog();
    }

    // Form Submit pada Dialog Login
    const form = document.getElementById("admin-login-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const pwdInput = document.getElementById("admin-password-input");
        if (pwdInput) {
          attemptLogin(pwdInput.value);
        }
      });
    }

    // Close button dialog
    const closeBtn = document.getElementById("admin-login-close");
    const dialog = document.getElementById("admin-login-dialog");
    if (closeBtn && dialog) {
      closeBtn.addEventListener("click", () => {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      });
    }
  }

  // Expose API
  window.AdminAuth = {
    isLoggedIn,
    setLoggedIn,
    openSecretLoginDialog
  };

  document.addEventListener("DOMContentLoaded", () => {
    setupSecretTriggers();
    updateAdminUI();
  });
})();
