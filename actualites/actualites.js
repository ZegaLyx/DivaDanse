document.addEventListener("DOMContentLoaded", () => {

  fetch("/actualites/actualites.json")
    .then(r => r.json())
    .then(actus => {

      // =============================================
      // GÉNÉRATION DES SECTIONS ACTUALITÉS
      // =============================================
      const body = document.querySelector("body");
      const footer = document.querySelector(".footer-container");
      const lineFooter = document.querySelector(".line-footer");

      // On supprime les sections actu existantes
      document.querySelectorAll(".actu-section").forEach(s => s.remove());

      // On recrée les sections depuis le JSON
      actus.forEach((actu, index) => {
        const isDark = index % 2 === 0;
        const section = document.createElement("section");
        section.className = `actu-section ${isDark ? "actu-dark" : "actu-light"}`;

        const imageBlock = `
          <div class="actu-image-block">
            <img class="actu-img" src="${actu.image}" alt="${actu.titre}" />
          </div>
        `;

        const textBlock = `
          <div class="actu-text-block">
            <h2 class="actu-title">${actu.titre}</h2>
            <p class="actu-date">${actu.date}</p>
            <p class="actu-body">${actu.texte}</p>
          </div>
        `;

        // Alternance image gauche / droite
        section.innerHTML = isDark
          ? imageBlock + textBlock
          : textBlock + imageBlock;

        body.insertBefore(section, lineFooter);
      });

    })
    .catch(err => console.error("Erreur chargement actualités :", err));

  // =============================================
  // HAMBURGER
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
