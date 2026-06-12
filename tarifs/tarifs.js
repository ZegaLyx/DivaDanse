// je récupère la zone où les cartes de tarifs vont défiler
const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const CARD_WIDTH = 280; // largeur carte
const CARD_GAP = 30; // gap entre cartes
const STEP = CARD_WIDTH + CARD_GAP;

let currentOffset = 0;

function getMaxOffset() {
  const totalCards = track.children.length;
  const visibleCards = Math.floor(track.parentElement.offsetWidth / STEP);
  return Math.max(0, (totalCards - visibleCards) * STEP);
}

// cette fonction met à jour la position des cartes
function updateCarousel() {
  track.style.transform = `translateX(-${currentOffset}px)`;
  prevBtn.disabled = currentOffset <= 0;
  nextBtn.disabled = currentOffset >= getMaxOffset();
  prevBtn.style.opacity = prevBtn.disabled ? "0.3" : "1";
  nextBtn.style.opacity = nextBtn.disabled ? "0.3" : "1";
}

prevBtn.addEventListener("click", () => {
  currentOffset = Math.max(0, currentOffset - STEP);
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  currentOffset = Math.min(getMaxOffset(), currentOffset + STEP);
  updateCarousel();
});

window.addEventListener("resize", () => {
  currentOffset = Math.min(currentOffset, getMaxOffset());
  updateCarousel();
});

updateCarousel();

// HAMBURGER MENU
// ça ouvre et ferme le menu quand on clique dessus
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
