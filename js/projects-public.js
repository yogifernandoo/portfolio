(function () {
  let currentProject = null;
  let currentImageIndex = 0;

  function initProjects() {
    renderProjectGrid();
    setupModalHandlers();
  }

  function renderProjectGrid(targetGridId = "portfolio-grid") {
    const grid = document.getElementById(targetGridId);
    if (!grid) return;

    const projects = window.PORTFOLIO_PROJECTS || [];
    grid.innerHTML = "";

    if (projects.length === 0) {
      grid.innerHTML = `
        <div class="empty-state-card" style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <h3>Belum ada proyek yang terdaftar</h3>
        </div>
      `;
      return;
    }

    projects.forEach((item) => {
      const card = document.createElement("article");
      card.className = "project-card-orbit";
      card.dataset.id = item.id;

      const techBadges = (item.tags || [])
        .slice(0, 5)
        .map((tag) => `<span class="tag-pill tag-pill-accent">${escapeHTML(tag)}</span>`)
        .join("");
      const photoCount = item.images && item.images.length > 1
        ? `<span class="card-gallery-pill">📷 ${item.images.length} Foto</span>`
        : "";
      const bannerImage = item.bannerImage || (item.images && item.images[0] && item.images[0].src) || "";
      const githubUrl = safeExternalUrl(item.githubUrl);

      card.innerHTML = `
        <div class="project-media-viewport">
          <div class="browser-dot-bar">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
            <span class="viewport-title">${escapeHTML(item.status || "Proyek")}</span>
          </div>
          <div class="project-image-box">
            <img
              src="${escapeHTML(bannerImage)}"
              alt="Dokumentasi ${escapeHTML(item.title)}"
              loading="lazy"
              class="project-img-preview"
            />
            ${photoCount}
            <div class="image-overlay-glow">
              <span class="view-doc-prompt">🔍 Buka Detail &amp; ${item.images && item.images.length > 1 ? `${item.images.length} Foto Dokumentasi` : "Dokumentasi"}</span>
            </div>
          </div>
        </div>

        <div class="project-content-body">
          <div class="project-meta-row">
            <span class="badge-status">● ${escapeHTML(item.status || "Selesai")}</span>
            <span class="badge-year">${escapeHTML(item.year || "2026")}</span>
          </div>
          <h3 class="project-title">${escapeHTML(item.title)}</h3>
          <p class="project-description">${escapeHTML(item.subtitle || "")}</p>
          <div class="project-tags-wrap">${techBadges}</div>
          <div class="project-actions-row">
            <button class="btn-open-study" type="button" data-project-id="${escapeHTML(item.id)}">
              <span>Buka Detail &amp; Galeri</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            ${githubUrl ? `
              <a href="${escapeHTML(githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-icon-link" title="Buka Repositori GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            ` : ""}
          </div>
        </div>
      `;

      card.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;
        openProjectModal(item.id);
      });

      grid.appendChild(card);
    });
  }

  function openProjectModal(projectId) {
    const item = (window.PORTFOLIO_PROJECTS || []).find((project) => project.id === projectId);
    if (!item) return;

    currentProject = item;
    currentImageIndex = 0;

    const dialog = document.getElementById("project-lightbox-dialog");
    if (!dialog) return;

    document.getElementById("modal-project-title").textContent = item.title;
    document.getElementById("modal-project-year").textContent = `${item.year || "2026"} • ${item.status || "Selesai"}`;
    document.getElementById("modal-project-overview").textContent = item.overview || "";
    updateModalGalleryImage();

    const metricsContainer = document.getElementById("modal-project-metrics");
    if (metricsContainer) {
      metricsContainer.innerHTML = (item.metrics || []).map((metric) => `
        <div class="metric-hud-item">
          <span class="metric-value">${escapeHTML(metric.value)}</span>
          <span class="metric-label">${escapeHTML(metric.label)}</span>
        </div>
      `).join("");
    }

    const featuresList = document.getElementById("modal-features-list");
    if (featuresList) {
      featuresList.innerHTML = (item.features || []).map((feature) => `
        <li><span class="feature-bullet">✦</span><span>${escapeHTML(feature)}</span></li>
      `).join("");
    }

    const challengesList = document.getElementById("modal-challenges-list");
    if (challengesList) {
      challengesList.innerHTML = (item.challenges || []).map((challenge) => `
        <div class="challenge-card">
          <p class="challenge-title">⚠️ <strong>Tantangan:</strong> ${escapeHTML(challenge.challenge)}</p>
          <p class="solution-text">💡 <strong>Solusi:</strong> ${escapeHTML(challenge.solution)}</p>
        </div>
      `).join("");
    }

    const tagsContainer = document.getElementById("modal-tech-tags");
    if (tagsContainer) {
      tagsContainer.innerHTML = (item.tags || []).map((tag) => `
        <span class="tag-pill tag-pill-accent">${escapeHTML(tag)}</span>
      `).join("");
    }

    setModalLink("modal-live-link", item.liveUrl);
    setModalLink("modal-gh-link", item.githubUrl);

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "true");

    if (window.CosmicAudio) window.CosmicAudio.playModalOpen();
  }

  function setModalLink(elementId, value) {
    const link = document.getElementById(elementId);
    if (!link) return;

    const url = safeExternalUrl(value);
    link.style.display = url ? "inline-flex" : "none";
    if (url) link.href = url;
    else link.removeAttribute("href");
  }

  function updateModalGalleryImage() {
    if (!currentProject) return;
    const images = currentProject.images || [];
    const currentImage = images[currentImageIndex] || images[0] || { src: currentProject.bannerImage };
    const displayImage = document.getElementById("modal-main-image");
    const caption = document.getElementById("modal-image-caption");
    const counter = document.getElementById("modal-img-counter");
    const thumbnails = document.getElementById("modal-thumbnails-container");

    if (displayImage) {
      displayImage.src = currentImage.src || "";
      displayImage.alt = currentImage.caption || currentProject.title;
    }
    if (caption) caption.textContent = currentImage.caption || "";
    if (counter) counter.textContent = `📸 ${currentImageIndex + 1} / ${images.length}`;

    if (!thumbnails) return;
    thumbnails.style.display = images.length > 1 ? "flex" : "none";
    thumbnails.innerHTML = images.length > 1 ? images.map((image, index) => `
      <button class="thumb-btn ${index === currentImageIndex ? "active" : ""}" data-index="${index}" type="button">
        <img src="${escapeHTML(image.src)}" alt="Thumbnail ${index + 1}" />
      </button>
    `).join("") : "";

    thumbnails.querySelectorAll(".thumb-btn").forEach((button) => {
      button.addEventListener("click", () => {
        currentImageIndex = Number(button.dataset.index);
        updateModalGalleryImage();
      });
    });
  }

  function setupModalHandlers() {
    const dialog = document.getElementById("project-lightbox-dialog");
    const closeButton = document.getElementById("modal-close-btn");
    const previousButton = document.getElementById("modal-prev-img");
    const nextButton = document.getElementById("modal-next-img");

    if (closeButton && dialog) {
      closeButton.addEventListener("click", () => dialog.close());
    }
    if (dialog) {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
    }
    if (previousButton) {
      previousButton.addEventListener("click", () => {
        if (!currentProject || !currentProject.images || !currentProject.images.length) return;
        currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
        updateModalGalleryImage();
      });
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        if (!currentProject || !currentProject.images || !currentProject.images.length) return;
        currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
        updateModalGalleryImage();
      });
    }
  }

  function safeExternalUrl(value) {
    if (!value) return "";
    try {
      const url = new URL(value, window.location.href);
      return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
    } catch (error) {
      return "";
    }
  }

  function showToastMessage(message) {
    let toast = document.getElementById("cosmic-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cosmic-toast";
      toast.className = "cosmic-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("toast-show");
    setTimeout(() => toast.classList.remove("toast-show"), 3200);
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  window.renderProjectGrid = renderProjectGrid;
  window.openCaseStudy = openProjectModal;
  window.showToastMessage = showToastMessage;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjects);
  } else {
    initProjects();
  }
})();
