document.addEventListener("DOMContentLoaded", () => {

  fetch("/tarifs/tarifs.json")
    .then(r => r.json())
    .then(data => {

      // =============================================
      // 1. ABONNEMENTS ANNUELS
      // =============================================
      const track = document.getElementById("carouselTrack");
      if (track) {
        track.innerHTML = "";
        data.abonnements.forEach(item => {
          track.innerHTML += `
            <div class="tarif-card">
              <h3 class="card-title">${item.label}</h3>
              <div class="card-price">${item.prix} &euro;</div>
              <div class="space"></div>
              <a href="${data.lien_inscription}" target="_blank" class="card-btn">S'inscrire</a>
            </div>
          `;
        });
      }

      // Frais inscription
      const fraisNote = document.querySelector(".frais-note");
      if (fraisNote) {
        fraisNote.textContent = `Les frais d'inscription de ${data.frais_inscription} € sont dus une seule fois à la première inscription.`;
      }

      // =============================================
      // 2. COURS À LA CARTE
      // =============================================
      const wrapper = document.querySelector(".wrapper");
      if (wrapper) {
        wrapper.innerHTML = "";
        data.carte.forEach(item => {
          wrapper.innerHTML += `
            <div class="carte-card">
              <h3 class="card-title-carte">${item.label}</h3>
              <div class="card-price-carte">${item.prix} &euro;</div>
              <div class="space"></div>
              <a href="${data.lien_inscription}" target="_blank" class="card-btn">S'inscrire</a>
            </div>
          `;
        });
      }

      // =============================================
      // 3. TARIFS RÉDUITS
      // =============================================
      const reduitsCol = document.querySelectorAll(".reduits-col");
      if (reduitsCol.length >= 3) {
        const prixCol = reduitsCol[2];
        prixCol.innerHTML = "";
        data.reduits.forEach(item => {
          prixCol.innerHTML += `<p class="reduit-prix">${item.label} &rarr; ${item.prix}&euro;</p>`;
        });
      }

    })
    .catch(err => console.error("Erreur chargement tarifs :", err));

  // =============================================
  // 4. CAROUSEL
  // =============================================
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  function getVisibleCards() {
    const width = window.innerWidth;
    if (width < 600) return 1;
    if (width < 900) return 2;
    return 3;
  }

  function updateCarousel() {
    if (!track) return;
    const cards = track.querySelectorAll(".tarif-card");
    if (!cards.length) return;
    const cardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!track) return;
      const cards = track.querySelectorAll(".tarif-card");
      const maxIndex = Math.max(0, cards.length - getVisibleCards());
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  window.addEventListener("resize", updateCarousel);

  // =============================================
  // 5. HAMBURGER
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
