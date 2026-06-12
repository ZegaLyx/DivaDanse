// menu hamburger commun à toutes les pages
// ça sert à ouvrir et fermer le menu sur mobile
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

  // quand on clique sur un lien, le menu se referme tout seul
  nav.querySelectorAll(".header-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("open");
    });
  });
})();
