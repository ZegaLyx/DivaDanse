// HAMBURGER MENU
// ça permet d'ouvrir et fermer le menu quand on est sur mobile
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
