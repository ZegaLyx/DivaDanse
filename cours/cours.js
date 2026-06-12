document.addEventListener("DOMContentLoaded", () => {
  // 1. FILTRAGE PLANNING
  // là, je filtre le planning selon le prof ou le style choisi

  const filterProf = document.getElementById("filter-prof");
  const filterStyle = document.getElementById("filter-style");
  const cells = document.querySelectorAll(".planning-cell:not(.empty)");
  const cardLinks = document.querySelectorAll(".card-horaires-link");
  const planningSection = document.getElementById("planning");

  function filterPlanning() {
    const profValue = filterProf.value;
    const styleValue = filterStyle.value;

    cells.forEach((cell) => {
      const cellProf = cell.getAttribute("data-prof");
      const cellStyle = cell.getAttribute("data-style");

      const matchesProf = profValue === "all" || cellProf === profValue;

      // Logique pour le groupe "Heels tous niveaux"
      const matchesStyle =
        styleValue === "all" ||
        cellStyle === styleValue ||
        (styleValue === "heels-all-levels" &&
          [
            "heels-initiation",
            "heels-initiation-deb",
            "heels-debutant",
            "heels-deb-inter",
            "heels-inter",
            "heels-inter-avance",
          ].includes(cellStyle));

      if (matchesProf && matchesStyle) {
        cell.classList.remove("filtered");
      } else {
        cell.classList.add("filtered");
      }
    });
  }

  cardLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetStyle = link.getAttribute("data-style-target");
      if (targetStyle) {
        filterProf.value = "all";
        filterStyle.value = targetStyle;
        filterPlanning();

        // Défilement fluide vers le planning
        const targetElement = document.getElementById("planning");
        if (targetElement) {
          const offset = 80; // Pour remonter le titre et centrer le corps
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  if (filterProf) filterProf.addEventListener("change", filterPlanning);
  if (filterStyle) filterStyle.addEventListener("change", filterPlanning);

  // 2. MODALE PROFESSEURS
  // ça sert à ouvrir une petite fenêtre avec la bio du prof
  const modal = document.getElementById("prof-modal");
  const closeBtn = document.getElementById("modal-close");
  const profLinks = document.querySelectorAll(".prof-link");

  // Données des professeurs
  const profs = {
    maeva: {
      name: "MAEVA",
      styles: ["Lyrical", "Sensuel Contempo", "Heels"],
      bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Profs/Maëva.png",
    },
    laurence: {
      name: "LAURENCE",
      styles: ["Modern Jazz", "Broadway Jazz", "Street Jazz"],
      bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Profs/Laurence.png",
    },
    magdalena: {
      name: "MAGDALENA",
      styles: ["Heels Inter", "Heels Avancé"],
      bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Profs/Magdaléna.png",
    },
    "mister k": {
      name: "MISTER K",
      styles: ["Waacking", "Commercial Girly"],
      bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Profs/Mister_K.png",
    },
    redlysa: {
      name: "REDLYSA",
      styles: ["Dancehall", "Reggaeton"],
      bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Profs/Redlysa.png",
    },
    noha: {
      name: "NOHA",
      styles: ["Floorwork", "Twerk"],
      bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Profs/Noha.png",
    },
    thom: {
      name: "THOM",
      styles: ["Commercial"],
      bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Profs/Thom.png",
    },
    aurore: {
      name: "AURORE",
      styles: ["Jazz Sensuel", "Heels Cabaret", "Heels Escarpins"],
      bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Profs/Aurore.png",
    },
  };

  profLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const profNameText = link
        .querySelector(".prof-name")
        .textContent.toLowerCase()
        .trim();
      const profData = profs[profNameText];

      if (profData) {
        // Remplissage de la modale
        document.getElementById("modal-prof-name").textContent = profData.name;
        document.getElementById("modal-prof-name-img").textContent =
          profData.name;
        document.getElementById("modal-prof-img").src = profData.img;
        document.getElementById("modal-prof-bio").textContent = profData.bio;

        // Tags de styles
        const tagsContainer = document.getElementById("modal-styles-tags");
        tagsContainer.innerHTML = "";
        profData.styles.forEach((style) => {
          const pill = document.createElement("span");
          pill.className = "style-pill";
          pill.textContent = style;
          tagsContainer.appendChild(pill);
        });

        // Affichage
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Empêche le scroll
      }
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Fermer en cliquant à l'extérieur
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});

// 3. MODALE DESCRIPTION DES STYLES
// ici on ouvre une modale quand on clique sur une carte de cours
document.addEventListener("DOMContentLoaded", () => {
  const styleModal = document.getElementById("style-modal");
  const styleCloseBtn = document.getElementById("style-modal-close");
  const styleLinks = document.querySelectorAll(".cours-card"); // On écoute sur toute la carte désormais

  const styleData = {
    "street jazz": {
      name: "STREET JAZZ",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/street-jazz.png",
    },
    lyrical: {
      name: "LYRICAL",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/lyrical.png",
    },
    "sensuel contempo": {
      name: "SENSUAL CONTEMPO",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/sensual-contempo.png",
    },
    heels: {
      name: "HEELS",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/heels.png",
    },
    waacking: {
      name: "WAACKING",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/waacking.png",
    },
    "commercial girly": {
      name: "COMMERCIAL GIRLY",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/commercial-girly.png",
    },
    "dance hall": {
      name: "DANCE HALL",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/dancehall-gyal.png",
    },
    "floor work": {
      name: "FLOOR WORK",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/floorwork.png",
    },
    reggaeton: {
      name: "REGGAETON",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/reggaeton.png",
    },
    twerk: {
      name: "TWERK",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/twerk.png",
    },
    "modern jazz": {
      name: "MODERN JAZZ",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/modern-jazz.png",
    },
    "broadway jazz": {
      name: "BROADWAY JAZZ",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/broadway-jazz.png",
    },
    "jazz sensuel": {
      name: "JAZZ SENSUEL",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/jazz-sensuel.png",
    },
    "heels cabaret": {
      name: "HEELS CABARET",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/heels.png",
    },
    "heels escarpins": {
      name: "HEELS ESCARPINS",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/heels.png",
    },
    commercial: {
      name: "COMMERCIAL",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      img: "/Images/Styles/Styles_popup/commercial.png",
    },
  };

  styleLinks.forEach((card) => {
    card.addEventListener("click", (e) => {
      // On vérifie qu'on ne clique pas sur le prof ou le lien horaires
      if (
        e.target.closest(".prof-link") ||
        e.target.closest(".card-horaires-link")
      ) {
        return;
      }

      const styleNameText = card
        .querySelector(".card-course-name")
        .textContent.toLowerCase()
        .trim();
      const data = styleData[styleNameText];

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

  styleModal.addEventListener("click", (e) => {
    if (e.target === styleModal) {
      closeStyleModal();
    }
  });
});

// 4. HAMBURGER MENU
(function () {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  if (!hamburger || !nav) return;
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("open");
    hamburger.setAttribute(
      "aria-expanded",
      hamburger.classList.contains("active"),
    );
  });
  nav.querySelectorAll(".header-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("open");
    });
  });
})();
