// Variables
const boutonRetour = document.getElementById("btnRetourHaut");
const navigation = document.querySelector("nav");
const liensNavigation = [...document.querySelectorAll("nav a[href^='#']")];
const sections = [...document.querySelectorAll("section")];

let sectionActive = null;

// Met à jour le bouton de retour
function mettreAJourNavigation() {
  const positionScroll = window.scrollY || document.documentElement.scrollTop;
  const hauteurNavigation = navigation ? navigation.offsetHeight : 0;

  boutonRetour.style.display = positionScroll > 200 ? "flex" : "none";

  const sectionVisible =
    sections.find((section) => {
      const debutSection = section.offsetTop - hauteurNavigation - 50;
      const finSection = debutSection + section.offsetHeight;

      return positionScroll >= debutSection && positionScroll < finSection;
    }) ?? null;

  if (sectionVisible === sectionActive) return;

  liensNavigation.forEach((lien) => {
    lien.classList.toggle(
      "active",
      lien.hash === `#${sectionVisible?.id ?? ""}`,
    );
  });

  sectionActive = sectionVisible;
}

mettreAJourNavigation();
//Affichage pendant le défilement.
window.addEventListener("scroll", mettreAJourNavigation);

// Haut de la page avec un défilement fluide.
boutonRetour.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fait défiler la page jusqu'à la section choisie dans le menu.
liensNavigation.forEach((lien) => {
  lien.addEventListener("click", (evenement) => {
    evenement.preventDefault();

    const sectionCible = document.getElementById(lien.hash.slice(1));
    if (!sectionCible) return;

    const positionCible = sectionCible.offsetTop - navigation.offsetHeight;
    window.scrollTo({ top: positionCible, behavior: "smooth" });
  });
});
