document.addEventListener("DOMContentLoaded", () => {
  // je prépare les infos de la carte pour l'adresse de l'école
  const locationData = {
    lat: 43.5746481,
    lng: 3.86163,
    zoom: 15,
    popupText: "Cliquez pour ouvrir Google Maps",
    googleMapsUrl:
      "https://www.google.com/maps/place/Ecole+Diva+danse/@43.5747589,3.8567339,17z/data=!3m2!4b1!5s0x12b6ae2a37c5cac5:0xbc8a5fabcc0bb94b!4m6!3m5!1s0x12b6af18e1b2d7fd:0xb413a727d942f8ad!8m2!3d43.574759!4d3.8615995!16s%2Fg%2F11yf_6dr4f?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3Dhttps://www.google.com/maps/search/?api=1&query=137+rue+Claude+Balbastre+Bat+1C+34070+Montpellier",
  };

  // j'instancie la carte et je la place sur l'adresse
  const map = L.map("contact-map").setView(
    [locationData.lat, locationData.lng],
    locationData.zoom,
  );

  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const marker = L.marker([locationData.lat, locationData.lng]).addTo(map);

  marker.bindPopup(locationData.popupText);

  marker.on("click", () => {
    window.open(locationData.googleMapsUrl, "_blank", "noopener,noreferrer");
  });
});

// HAMBURGER MENU
// ça sert à ouvrir et fermer le menu sur petit écran
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
