document.addEventListener("DOMContentLoaded", () => {

  // On charge les 3 fichiers JSON en parallèle
  Promise.all([
    fetch("/cours/profs.json").then(r => r.json()),
    fetch("/cours/styles.json").then(r => r.json()),
    fetch("/cours/planning.json").then(r => r.json())
  ]).then(([profsData, stylesData, planningData]) => {

    // On convertit les tableaux en objets pour accès rapide par id
    const profs = {};
    profsData.forEach(p => { profs[p.id] = p; });

    const styleData = {};
    stylesData.forEach(s => { styleData[s.id] = s; });

    // =============================================
    // 1. MISE À JOUR DES CARTES DE COURS (profs)
    // =============================================
    document.querySelectorAll(".cours-card").forEach(card => {
      const profNameEl = card.querySelector(".prof-name");
      const profPhotoEl = card.querySelector(".prof-photo");
      const profDescEl = card.querySelector(".prof-desc");

      if (!profNameEl) return;

      const profId = profNameEl.textContent.toLowerCase().trim();
      const profData = profs[profId];

      if (profData && profPhotoEl) {
        profPhotoEl.src = profData.profil;
        profPhotoEl.alt = "Photo de " + profData.name;
      }
      if (profData && profDescEl) {
        profDescEl.textContent = profData.bio;
      }
    });

    // =============================================
    // 2. FILTRAGE PLANNING
    // =============================================
    const filterProf = document.getElementById("filter-prof");
    const filterStyle = document.getElementById("filter-style");
    const cells = document.querySelectorAll(".planning-cell:not(.empty)");
    const cardLinks = document.querySelectorAll(".card-horaires-link");

    function filterPlanning() {
      const profValue = filterProf.value;
      const styleValue = filterStyle.value;

      cells.forEach(cell => {
        const cellProf = cell.getAttribute("data-prof");
        const cellStyle = cell.getAttribute("data-style");

        const matchesProf = profValue === "all" || cellProf === profValue;
        const matchesStyle =
          styleValue === "all" ||
          cellStyle === styleValue ||
          (styleValue === "heels-all-levels" &&
            ["heels-initiation", "heels-initiation-deb", "heels-debutant",
             "heels-deb-inter", "heels-inter", "heels-inter-avance"].includes(cellStyle));

        cell.classList.toggle("filtered", !(matchesProf && matchesStyle));
      });
    }

    cardLinks.forEach(link => {
      link.addEventListener("click", e => {
        const targetStyle = link.getAttribute("data-style-target");
        if (targetStyle) {
          filterProf.value = "all";
          filterStyle.value = targetStyle;
          filterPlanning();

          const targetElement = document.getElementById("planning");
          if (targetElement) {
            const offset = 80;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      });
    });

    if (filterProf) filterProf.addEventListener("change", filterPlanning);
    if (filterStyle) filterStyle.addEventListener("change", filterPlanning);

    // =============================================
    // 3. MODALE PROFESSEURS
    // =============================================
    const modal = document.getElementById("prof-modal");
    const closeBtn = document.getElementById("modal-close");

    document.querySelectorAll(".prof-link").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();

        const profId = link.querySelector(".prof-name").textContent.toLowerCase().trim();
        const profData = profs[profId];

        if (profData) {
          document.getElementById("modal-prof-name").textContent = profData.name;
          document.getElementById("modal-prof-name-img").textContent = profData.name;
          document.getElementById("modal-prof-img").src = profData.img;
          document.getElementById("modal-prof-bio").textContent = profData.bio;

          const tagsContainer = document.getElementById("modal-styles-tags");
          tagsContainer.innerHTML = "";
          profData.styles.forEach(style => {
            const pill = document.createElement("span");
            pill.className = "style-pill";
            pill.textContent = style;
            tagsContainer.appendChild(pill);
          });

          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", e => { if (e.target === modal) closeModal(); });

    // =============================================
    // 4. MODALE STYLES
    // =============================================
    const styleModal = document.getElementById("style-modal");
    const styleCloseBtn = document.getElementById("style-modal-close");

    document.querySelectorAll(".cours-card").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest(".prof-link") || e.target.closest(".card-horaires-link")) return;

        const styleId = card.querySelector(".card-course-name").textContent.toLowerCase().trim();
        const data = styleData[styleId];

        if (data) {
          document.getElementById("modal-style-name").textContent = data.name;
          document.getElementById("modal-style-desc").textContent = data.desc;
          document.getElementById("modal-style-img").src = data.img;

          styleModal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    function closeStyleModal() {
      styleModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    if (styleCloseBtn) styleCloseBtn.addEventListener("click", closeStyleModal);
    styleModal.addEventListener("click", e => { if (e.target === styleModal) closeStyleModal(); });

  }).catch(err => {
    console.error("Erreur chargement données :", err);
  });

  // =============================================
  // 5. HAMBURGER MENU
  // =============================================
  (function () {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");
    if (!hamburger || !nav) return;
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", hamburger.classList.contains("active"));
    });
    nav.querySelectorAll(".header-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("open");
      });
    });
  })();

});
