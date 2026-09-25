/**
 * ==============================================================================
 * PORTFOLIO SHOWCASE & DYNAMIC CRUD ENGINE
 * ==============================================================================
 * - Render proyek (bawaan + kustom dari localStorage)
 * - Fitur CRUD lengkap (Create, Read, Update, Delete) saat mode Admin aktif
 * - Ekspor satu klik ke "projects-data.js" untuk deploy permanen ke GitHub Pages
 * - Interactive Photo Cropper
 */

(function () {
  const STORAGE_KEY = "custom_portfolio_projects";
  let currentProject = null;
  let currentImageIndex = 0;
  let editingProjectId = null;
  let crudUploadedImageBase64 = null;

  // Dapatkan data proyek (gabungan default + storage kustom)
  function getAllProjects() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}

    return window.PORTFOLIO_PROJECTS || [];
  }

  function saveAllProjects(projects) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {}
  }

  function initProjects() {
    renderProjectGrid();
    setupModalHandlers();
    setupAvatarCropper();
    setupCrudForm();
  }

  // Render Kartu Proyek
  function renderProjectGrid(targetGridId = "portfolio-grid") {
    const grid = document.getElementById(targetGridId);
    if (!grid) return;

    const projects = getAllProjects();
    const isAdmin = window.AdminAuth && window.AdminAuth.isLoggedIn();
    grid.innerHTML = "";

    // Jika mode Admin aktif, tampilkan kartu tambah proyek di urutan pertama
    if (isAdmin) {
      const addCard = document.createElement("article");
      addCard.className = "project-card-orbit add-new-project-card";
      addCard.innerHTML = `
        <div class="add-card-inner">
          <div class="add-card-icon">➕</div>
          <h3>Tambah Proyek Baru</h3>
          <p>Klik di sini untuk menambah dokumentasi website baru dengan form CRUD.</p>
        </div>
      `;
      addCard.addEventListener("click", () => {
        openProjectCrudModal(null);
      });
      grid.appendChild(addCard);
    }

    if (projects.length === 0 && !isAdmin) {
      grid.innerHTML = `
        <div class="empty-state-card" style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 2.5rem; margin-bottom: 1rem;">🛸</p>
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

      // Kontrol Admin: Edit & Hapus
      const adminControls = isAdmin ? `
        <div class="card-admin-action-bar">
          <button class="btn-card-edit" data-edit-id="${escapeHTML(item.id)}" title="Edit Proyek">✏️ Edit</button>
          <button class="btn-card-delete" data-delete-id="${escapeHTML(item.id)}" title="Hapus Proyek">🗑️ Hapus</button>
        </div>
      ` : "";

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
              src="${escapeHTML(item.bannerImage || 'assets/projects/project1-ecommerce.svg')}" 
              alt="Dokumentasi ${escapeHTML(item.title)}" 
              loading="lazy" 
              class="project-img-preview"
            />
            <div class="image-overlay-glow">
              <span class="view-doc-prompt">🔍 Buka Detail &amp; Dokumentasi</span>
            </div>
          </div>
          ${adminControls}
        </div>

        <div class="project-content-body">
          <div class="project-meta-row">
            <span class="badge-status">● ${escapeHTML(item.status || "Selesai")}</span>
            <span class="badge-year">${escapeHTML(item.year || "2026")}</span>
          </div>

          <h3 class="project-title">${escapeHTML(item.title)}</h3>
          <p class="project-description">${escapeHTML(item.subtitle || "")}</p>

          <div class="project-tags-wrap">
            ${techBadges}
          </div>

          <div class="project-actions-row">
            <button class="btn-open-study" data-project-id="${escapeHTML(item.id)}">
              <span>Buka Detail &amp; Galeri</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            ${item.githubUrl ? `
              <a href="${escapeHTML(item.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-icon-link" title="Buka Repositori GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            ` : ""}
          </div>
        </div>
      `;

      // Event klik kartu
      card.addEventListener("click", (e) => {
        // Jangan buka modal jika klik tombol edit/hapus atau link
        if (e.target.closest("button, a")) return;
        openProjectModal(item.id);
      });

      // Tombol Edit
      const editBtn = card.querySelector(".btn-card-edit");
      if (editBtn) {
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          openProjectCrudModal(item.id);
        });
      }

      // Tombol Hapus
      const delBtn = card.querySelector(".btn-card-delete");
      if (delBtn) {
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          confirmDeleteProject(item.id, item.title);
        });
      }

      grid.appendChild(card);
    });
  }

  // ============================================================================
  // CRUD MODAL & LOGIC
  // ============================================================================
  function openProjectCrudModal(projectId = null) {
    editingProjectId = projectId;
    crudUploadedImageBase64 = null;

    const dialog = document.getElementById("project-crud-dialog");
    const titleEl = document.getElementById("crud-modal-title");
    const form = document.getElementById("project-crud-form");
    const imgPreview = document.getElementById("crud-img-preview");

    if (!dialog || !form) return;

    if (projectId) {
      // Mode Edit
      titleEl.textContent = "✏️ Edit Dokumentasi Proyek";
      const projects = getAllProjects();
      const item = projects.find((p) => p.id === projectId);
      if (item) {
        document.getElementById("crud-title").value = item.title || "";
        document.getElementById("crud-subtitle").value = item.subtitle || "";
        document.getElementById("crud-overview").value = item.overview || "";
        document.getElementById("crud-tags").value = (item.tags || []).join(", ");
        document.getElementById("crud-year").value = item.year || "2026";
        document.getElementById("crud-status").value = item.status || "Production Ready";
        document.getElementById("crud-github").value = item.githubUrl || "";
        document.getElementById("crud-live").value = item.liveUrl || "";
        document.getElementById("crud-features").value = (item.features || []).join("\n");
        
        crudUploadedImageBase64 = item.bannerImage || null;
        if (imgPreview && item.bannerImage) {
          imgPreview.src = item.bannerImage;
          imgPreview.style.display = "block";
        }
      }
    } else {
      // Mode Tambah Baru
      titleEl.textContent = "➕ Tambah Proyek Baru";
      form.reset();
      if (imgPreview) imgPreview.style.display = "none";
    }

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "true");
  }

  function setupCrudForm() {
    const dialog = document.getElementById("project-crud-dialog");
    const form = document.getElementById("project-crud-form");
    const closeBtn = document.getElementById("crud-close-btn");
    const fileInput = document.getElementById("crud-image-file");
    const imgPreview = document.getElementById("crud-img-preview");

    if (closeBtn && dialog) {
      closeBtn.addEventListener("click", () => {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      });
    }

    // Baca upload screenshot ke Base64
    if (fileInput && imgPreview) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            crudUploadedImageBase64 = evt.target.result;
            imgPreview.src = evt.target.result;
            imgPreview.style.display = "block";
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Submit Form (Simpan / Update)
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("crud-title").value.trim();
        const subtitle = document.getElementById("crud-subtitle").value.trim();
        const overview = document.getElementById("crud-overview").value.trim();
        const tagsStr = document.getElementById("crud-tags").value.trim();
        const year = document.getElementById("crud-year").value.trim() || "2026";
        const status = document.getElementById("crud-status").value.trim() || "Selesai";
        const githubUrl = document.getElementById("crud-github").value.trim();
        const liveUrl = document.getElementById("crud-live").value.trim();
        const featuresStr = document.getElementById("crud-features").value.trim();

        const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : ["Laravel", "PHP", "MySQL"];
        const features = featuresStr ? featuresStr.split("\n").map((f) => f.trim()).filter(Boolean) : [];

        const projects = getAllProjects();
        const bannerImage = crudUploadedImageBase64 || "assets/projects/project1-ecommerce.svg";

        if (editingProjectId) {
          // Update yang sudah ada
          const idx = projects.findIndex((p) => p.id === editingProjectId);
          if (idx !== -1) {
            projects[idx] = {
              ...projects[idx],
              title,
              subtitle,
              overview,
              tags,
              year,
              status,
              githubUrl,
              liveUrl,
              features,
              bannerImage,
              images: [
                {
                  src: bannerImage,
                  caption: `Dokumentasi Utama ${title}`
                }
              ]
            };
          }
        } else {
          // Tambah Baru
          const newId = "proj-" + Date.now();
          projects.unshift({
            id: newId,
            title,
            subtitle,
            overview,
            tags,
            year,
            status,
            githubUrl,
            liveUrl,
            features,
            bannerImage,
            images: [
              {
                src: bannerImage,
                caption: `Dokumentasi Utama ${title}`
              }
            ],
            metrics: [
              { label: "Status", value: "Active" }
            ],
            challenges: []
          });
        }

        saveAllProjects(projects);
        renderProjectGrid();

        if (dialog) {
          if (typeof dialog.close === "function") dialog.close();
          else dialog.removeAttribute("open");
        }

        showToastMessage("✨ Proyek berhasil disimpan!");
        if (window.CosmicAudio) {
          window.CosmicAudio.playStarlightChime();
        }
      });
    }
  }

  function confirmDeleteProject(projectId, projectTitle) {
    if (!confirm(`Apakah Anda yakin ingin menghapus proyek "${projectTitle}"?`)) return;

    let projects = getAllProjects();
    projects = projects.filter((p) => p.id !== projectId);
    saveAllProjects(projects);
    renderProjectGrid();

    showToastMessage(`🗑️ Proyek "${projectTitle}" berhasil dihapus.`);
  }

  // ============================================================================
  // EKSPOR KE data/projects-data.js UNTUK DEPLOY KE GITHUB PAGES
  // ============================================================================
  function exportProjectsDataFile() {
    const projects = getAllProjects();
    const jsonStr = JSON.stringify(projects, null, 2);

    const fileContent = `/**
 * ==============================================================================
 * DATA DOKUMENTASI PROYEK PORTOFOLIO — YOGI FERNANDO
 * ==============================================================================
 * Terakhir diekspor: ${new Date().toLocaleString("id-ID")}
 */

const PORTFOLIO_PROJECTS = ${jsonStr};

if (typeof window !== "undefined") {
  window.PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS;
}
`;

    const blob = new Blob([fileContent], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects-data.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToastMessage("💾 Berkas data/projects-data.js berhasil diunduh! Silakan timpa file lama dan push ke GitHub.");
  }

  // ============================================================================
  // MODAL DETAIL & LIGHTBOX
  // ============================================================================
  function openProjectModal(projectId) {
    const projects = getAllProjects();
    const item = projects.find((p) => p.id === projectId);
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
      metricsContainer.innerHTML = (item.metrics || []).map((m) => `
        <div class="metric-hud-item">
          <span class="metric-value">${escapeHTML(m.value)}</span>
          <span class="metric-label">${escapeHTML(m.label)}</span>
        </div>
      `).join("");
    }

    const featuresList = document.getElementById("modal-features-list");
    if (featuresList) {
      featuresList.innerHTML = (item.features || []).map((f) => `
        <li>
          <span class="feature-bullet">✦</span>
          <span>${escapeHTML(f)}</span>
        </li>
      `).join("");
    }

    const challengesList = document.getElementById("modal-challenges-list");
    if (challengesList) {
      challengesList.innerHTML = (item.challenges || []).map((c) => `
        <div class="challenge-card">
          <p class="challenge-title">⚠️ <strong>Tantangan:</strong> ${escapeHTML(c.challenge)}</p>
          <p class="solution-text">💡 <strong>Solusi:</strong> ${escapeHTML(c.solution)}</p>
        </div>
      `).join("");
    }

    const tagsContainer = document.getElementById("modal-tech-tags");
    if (tagsContainer) {
      tagsContainer.innerHTML = (item.tags || []).map((t) => `
        <span class="tag-pill tag-pill-accent">${escapeHTML(t)}</span>
      `).join("");
    }

    const liveLink = document.getElementById("modal-live-link");
    const ghLink = document.getElementById("modal-gh-link");
    if (liveLink) {
      if (item.liveUrl) {
        liveLink.href = item.liveUrl;
        liveLink.style.display = "inline-flex";
      } else {
        liveLink.style.display = "none";
      }
    }
    if (ghLink) {
      if (item.githubUrl) {
        ghLink.href = item.githubUrl;
        ghLink.style.display = "inline-flex";
      } else {
        ghLink.style.display = "none";
      }
    }

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "true");
    }

    if (window.CosmicAudio) {
      window.CosmicAudio.playModalOpen();
    }
  }

  function updateModalGalleryImage() {
    if (!currentProject || !currentProject.images) return;
    const images = currentProject.images;
    const curImg = images[currentImageIndex] || images[0] || { src: currentProject.bannerImage };

    const displayImg = document.getElementById("modal-main-image");
    const captionEl = document.getElementById("modal-image-caption");
    const thumbnailsContainer = document.getElementById("modal-thumbnails-container");

    if (displayImg) {
      displayImg.src = curImg.src;
      displayImg.alt = curImg.caption || currentProject.title;
    }
    if (captionEl) {
      captionEl.textContent = curImg.caption || "";
    }

    if (thumbnailsContainer) {
      if (images.length > 1) {
        thumbnailsContainer.style.display = "flex";
        thumbnailsContainer.innerHTML = images.map((img, idx) => `
          <button class="thumb-btn ${idx === currentImageIndex ? "active" : ""}" data-index="${idx}">
            <img src="${escapeHTML(img.src)}" alt="Thumbnail ${idx + 1}" />
          </button>
        `).join("");

        thumbnailsContainer.querySelectorAll(".thumb-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            currentImageIndex = parseInt(btn.dataset.index, 10);
            updateModalGalleryImage();
          });
        });
      } else {
        thumbnailsContainer.style.display = "none";
      }
    }
  }

  function setupModalHandlers() {
    const dialog = document.getElementById("project-lightbox-dialog");
    const closeBtn = document.getElementById("modal-close-btn");
    const prevBtn = document.getElementById("modal-prev-img");
    const nextBtn = document.getElementById("modal-next-img");

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

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (!currentProject || !currentProject.images) return;
        currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
        updateModalGalleryImage();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (!currentProject || !currentProject.images) return;
        currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
        updateModalGalleryImage();
      });
    }
  }

  // ============================================================================
  // INTERACTIVE PHOTO CROPPER ENGINE
  // ============================================================================
  function setupAvatarCropper() {
    const avatarImg = document.getElementById("developer-avatar");
    const openGuideBtn = document.getElementById("btn-custom-avatar-guide");
    const avatarDialog = document.getElementById("avatar-guide-dialog");
    const avatarCloseBtn = document.getElementById("avatar-guide-close");
    const fileInput = document.getElementById("avatar-file-input");

    const cropBox = document.getElementById("cropper-workspace");
    const cropCanvas = document.getElementById("crop-canvas");
    const zoomInput = document.getElementById("crop-zoom-slider");
    const applyBtn = document.getElementById("btn-apply-crop");
    const downloadBtn = document.getElementById("btn-download-cropped");

    try {
      const savedPhoto = localStorage.getItem("custom_user_photo");
      if (savedPhoto && avatarImg) {
        avatarImg.src = savedPhoto;
      }
    } catch (e) {}

    if (openGuideBtn && avatarDialog) {
      openGuideBtn.addEventListener("click", () => {
        if (typeof avatarDialog.showModal === "function") avatarDialog.showModal();
        else avatarDialog.setAttribute("open", "true");
      });
    }

    if (avatarCloseBtn && avatarDialog) {
      avatarCloseBtn.addEventListener("click", () => {
        if (typeof avatarDialog.close === "function") avatarDialog.close();
        else avatarDialog.removeAttribute("open");
      });
    }

    let loadedImage = null;
    let baseScale = 1;
    let currentZoom = 1;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const CANVAS_SIZE = 320;
    const CROP_RADIUS = 130;

    function redrawCropCanvas() {
      if (!cropCanvas || !loadedImage) return;
      const ctx = cropCanvas.getContext("2d");
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      const drawScale = baseScale * currentZoom;
      const imgW = loadedImage.width * drawScale;
      const imgH = loadedImage.height * drawScale;

      const drawX = (CANVAS_SIZE - imgW) / 2 + panX;
      const drawY = (CANVAS_SIZE - imgH) / 2 + panY;

      ctx.drawImage(loadedImage, drawX, drawY, imgW, imgH);

      ctx.save();
      ctx.fillStyle = "rgba(4, 7, 16, 0.78)";
      ctx.beginPath();
      ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CROP_RADIUS, 0, Math.PI * 2, true);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CROP_RADIUS, 0, Math.PI * 2);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(CANVAS_SIZE / 2 - 12, CANVAS_SIZE / 2);
      ctx.lineTo(CANVAS_SIZE / 2 + 12, CANVAS_SIZE / 2);
      ctx.moveTo(CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 12);
      ctx.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 12);
      ctx.stroke();

      ctx.restore();
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
          const img = new Image();
          img.onload = () => {
            loadedImage = img;
            panX = 0;
            panY = 0;
            currentZoom = 1;
            if (zoomInput) zoomInput.value = "1";

            const minDimension = Math.min(img.width, img.height);
            baseScale = (CROP_RADIUS * 2) / minDimension;

            if (cropBox) cropBox.style.display = "flex";
            redrawCropCanvas();
            showToastMessage("Foto dimuat! Geser atau atur zoom untuk memotong.");
          };
          img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    if (zoomInput) {
      zoomInput.addEventListener("input", (e) => {
        currentZoom = parseFloat(e.target.value) || 1;
        redrawCropCanvas();
      });
    }

    if (cropCanvas) {
      cropCanvas.addEventListener("mousedown", (e) => {
        if (!loadedImage) return;
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        redrawCropCanvas();
      });

      window.addEventListener("mouseup", () => {
        isDragging = false;
      });

      cropCanvas.addEventListener("touchstart", (e) => {
        if (!loadedImage || e.touches.length === 0) return;
        isDragging = true;
        startX = e.touches[0].clientX - panX;
        startY = e.touches[0].clientY - panY;
      }, { passive: true });

      cropCanvas.addEventListener("touchmove", (e) => {
        if (!isDragging || e.touches.length === 0) return;
        panX = e.touches[0].clientX - startX;
        panY = e.touches[0].clientY - startY;
        redrawCropCanvas();
      }, { passive: true });

      cropCanvas.addEventListener("touchend", () => {
        isDragging = false;
      });
    }

    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        if (!loadedImage) {
          showToastMessage("Silakan pilih file foto terlebih dahulu.");
          return;
        }

        const outCanvas = document.createElement("canvas");
        const OUT_SIZE = 400;
        outCanvas.width = OUT_SIZE;
        outCanvas.height = OUT_SIZE;
        const outCtx = outCanvas.getContext("2d");

        const ratio = OUT_SIZE / (CROP_RADIUS * 2);
        const drawScale = baseScale * currentZoom * ratio;
        const imgW = loadedImage.width * drawScale;
        const imgH = loadedImage.height * drawScale;
        const drawX = (OUT_SIZE - imgW) / 2 + (panX * ratio);
        const drawY = (OUT_SIZE - imgH) / 2 + (panY * ratio);

        outCtx.beginPath();
        outCtx.arc(OUT_SIZE / 2, OUT_SIZE / 2, OUT_SIZE / 2, 0, Math.PI * 2);
        outCtx.clip();

        outCtx.drawImage(loadedImage, drawX, drawY, imgW, imgH);

        const croppedDataUrl = outCanvas.toDataURL("image/png");

        if (avatarImg) {
          avatarImg.src = croppedDataUrl;
        }

        try {
          localStorage.setItem("custom_user_photo", croppedDataUrl);
        } catch (err) {}

        if (downloadBtn) {
          downloadBtn.href = croppedDataUrl;
          downloadBtn.download = "profile.jpg";
          downloadBtn.style.display = "inline-flex";
        }

        showToastMessage("✨ Foto berhasil dipotong & diterapkan!");
        if (window.CosmicAudio) {
          window.CosmicAudio.playStarlightChime();
        }
      });
    }
  }

  function showToastMessage(msg) {
    let toast = document.getElementById("cosmic-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cosmic-toast";
      toast.className = "cosmic-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("toast-show");
    setTimeout(() => {
      toast.classList.remove("toast-show");
    }, 3200);
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

  window.renderProjectGrid = renderProjectGrid;
  window.openProjectCrudModal = openProjectCrudModal;
  window.exportProjectsDataFile = exportProjectsDataFile;
  window.openCaseStudy = openProjectModal;
  window.showToastMessage = showToastMessage;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjects);
  } else {
    initProjects();
  }
})();
