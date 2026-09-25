/**
 * ==============================================================================
 * CERTIFICATES & ACHIEVEMENTS ENGINE — YOGI FERNANDO
 * ==============================================================================
 * Mengatur render sertifikat di halaman utama (index.html) dan halaman sertifikat (certificates.html),
 * filter kategori, serta modal lightbox gambar beresolusi tinggi.
 */

(function () {
  let currentCert = null;

  function getAllCertificates() {
    return window.CERTIFICATES_DATA || [];
  }

  function initCertificates() {
    renderCertificatesGrid();
    renderHomepageCertPreview();
    setupCertificateFilter();
    setupCertificateModal();
  }

  // Render di Halaman certificates.html
  function renderCertificatesGrid(filterCategory = "all") {
    const grid = document.getElementById("certificates-grid");
    if (!grid) return;

    const certs = getAllCertificates();
    const filtered = filterCategory === "all"
      ? certs
      : certs.filter(c => c.category === filterCategory);

    grid.innerHTML = "";

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 2.2rem; margin-bottom: 0.5rem;">📜</p>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Belum ada sertifikasi dalam kategori ini</h3>
        </div>
      `;
      return;
    }

    filtered.forEach((item) => {
      const card = document.createElement("article");
      card.className = "cert-card";
      card.dataset.id = item.id;

      const isAward = item.badge && item.badge.includes("Juara");
      const badgeClass = isAward ? "cert-badge-gold" : "cert-badge-blue";

      const tags = (item.skills || [])
        .slice(0, 4)
        .map((s) => `<span class="tag-pill">${escapeHTML(s)}</span>`)
        .join("");

      card.innerHTML = `
        <div class="cert-media-box">
          <div class="cert-image-placeholder" id="placeholder-${escapeHTML(item.id)}">
            <span class="cert-fallback-icon">${item.fallbackIcon || '📜'}</span>
            <span class="cert-fallback-label">${escapeHTML(item.issuer)}</span>
          </div>
          <img 
            src="${escapeHTML(item.image)}" 
            alt="${escapeHTML(item.title)}" 
            class="cert-img-cover" 
            loading="lazy"
            onload="const ph = document.getElementById('placeholder-${escapeHTML(item.id)}'); if(ph) ph.style.display='none';"
            onerror="this.style.display='none'"
          />
          <span class="cert-floating-badge ${badgeClass}">${escapeHTML(item.badge)}</span>
        </div>

        <div class="cert-card-body">
          <div class="cert-meta-row">
            <span class="cert-issuer-text">${escapeHTML(item.issuer)}</span>
            <span class="cert-year-text">${escapeHTML(item.year)}</span>
          </div>

          <h3 class="cert-card-title">${escapeHTML(item.title)}</h3>
          <p class="cert-card-desc">${escapeHTML(item.subtitle || item.overview || '')}</p>

          <div class="cert-tags-wrap">
            ${tags}
          </div>

          <div class="cert-action-row">
            <button class="btn-cert-detail" data-cert-id="${escapeHTML(item.id)}">
              <span>Buka Detail &amp; Verifikasi</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        openCertModal(item.id);
      });

      grid.appendChild(card);
    });
  }

  // Render di Beranda (index.html) pada container #cert-preview-grid
  function renderHomepageCertPreview() {
    const previewGrid = document.getElementById("cert-preview-grid");
    if (!previewGrid) return;

    const certs = getAllCertificates();
    previewGrid.innerHTML = "";

    certs.forEach((item) => {
      const card = document.createElement("article");
      card.className = "cert-preview-card";
      card.dataset.id = item.id;

      const isAward = item.badge && item.badge.includes("Juara");
      const badgeClass = isAward ? "cert-badge-gold" : "cert-badge-blue";

      const tags = (item.skills || [])
        .slice(0, 3)
        .map((s) => `<span class="tag-pill">${escapeHTML(s)}</span>`)
        .join("");

      card.innerHTML = `
        <div class="cert-preview-card-img-wrap">
          <img 
            src="${escapeHTML(item.image)}" 
            alt="${escapeHTML(item.title)}" 
            loading="lazy"
            onerror="this.parentElement.style.display='none'"
          />
        </div>
        <div class="cert-preview-body">
          <span class="cert-preview-badge ${badgeClass}">${escapeHTML(item.badge)}</span>
          <h3 class="cert-preview-title">${escapeHTML(item.title)}</h3>
          <p class="cert-preview-meta">${escapeHTML(item.issuer)} • ${escapeHTML(item.year)}</p>
          <p class="cert-preview-desc">${escapeHTML(item.subtitle || item.overview || '')}</p>
          <div class="cert-preview-skills">
            ${tags}
          </div>
          <div class="cert-preview-action">
            <span>Lihat Sertifikat &amp; Bukti ↗</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        openCertModal(item.id);
      });

      previewGrid.appendChild(card);
    });
  }

  function setupCertificateFilter() {
    const filterButtons = document.querySelectorAll(".cert-filter-btn");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category || "all";
        renderCertificatesGrid(category);
      });
    });
  }

  function openCertModal(certId) {
    const certs = getAllCertificates();
    const item = certs.find(c => c.id === certId);
    if (!item) return;

    currentCert = item;
    const dialog = document.getElementById("certificate-lightbox-dialog");
    if (!dialog) return;

    const titleEl = document.getElementById("modal-cert-title");
    if (titleEl) titleEl.textContent = item.title;

    const issuerEl = document.getElementById("modal-cert-issuer");
    if (issuerEl) issuerEl.textContent = `${item.issuer} • ${item.year}`;

    const overviewEl = document.getElementById("modal-cert-overview");
    if (overviewEl) overviewEl.textContent = item.overview || "";

    const badgeEl = document.getElementById("modal-cert-badge");
    if (badgeEl) {
      badgeEl.textContent = item.badge || "";
      const isAward = item.badge && item.badge.includes("Juara");
      badgeEl.className = `cert-floating-badge ${isAward ? "cert-badge-gold" : "cert-badge-blue"}`;
    }

    const imgEl = document.getElementById("modal-cert-image");
    const fallbackBox = document.getElementById("modal-cert-fallback");
    if (imgEl) {
      imgEl.src = item.image;
      imgEl.alt = item.title;
      imgEl.style.display = "block";
      if (fallbackBox) fallbackBox.style.display = "none";

      imgEl.onerror = () => {
        imgEl.style.display = "none";
        if (fallbackBox) {
          fallbackBox.style.display = "flex";
          const iconEl = document.getElementById("modal-fallback-icon");
          if (iconEl) iconEl.textContent = item.fallbackIcon || "🏆";
          const fTitleEl = document.getElementById("modal-fallback-title");
          if (fTitleEl) fTitleEl.textContent = item.title;
        }
      };
    }

    const highlightsList = document.getElementById("modal-cert-highlights");
    if (highlightsList) {
      highlightsList.innerHTML = (item.highlights || []).map(h => `
        <li>
          <span class="feature-bullet">✦</span>
          <span>${escapeHTML(h)}</span>
        </li>
      `).join("");
    }

    const tagsWrap = document.getElementById("modal-cert-skills");
    if (tagsWrap) {
      tagsWrap.innerHTML = (item.skills || []).map(s => `
        <span class="tag-pill tag-pill-accent">${escapeHTML(s)}</span>
      `).join("");
    }

    const linkedinLink = document.getElementById("modal-cert-linkedin");
    if (linkedinLink) {
      linkedinLink.href = item.verifyUrl || "https://www.linkedin.com/in/yogi-fernando1";
    }

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "true");
    }
  }

  function setupCertificateModal() {
    const dialog = document.getElementById("certificate-lightbox-dialog");
    const closeBtn = document.getElementById("modal-cert-close");

    if (closeBtn && dialog) {
      closeBtn.addEventListener("click", () => {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      });
    }

    if (dialog) {
      dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          if (typeof dialog.close === "function") dialog.close();
          else dialog.removeAttribute("open");
        }
      });
    }
  }

  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  window.openCertModal = openCertModal;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCertificates);
  } else {
    initCertificates();
  }
})();
