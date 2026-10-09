// Variable JS 
const boutonRetour = document.getElementById("btnRetourHaut");
const nav = document.querySelector("nav");
const liensNav = document.querySelectorAll("nav a[href^='#']");
const sections = document.querySelectorAll("section");

// Fonction pour mesurer la hauteur réelle de la nav
function getHauteurNav() {
  return nav ? nav.offsetHeight : 0;
}

// Fonction globale d'affichage du bouton et de gestion du scroll
function gererScroll() {
  const positionScroll = window.scrollY || document.documentElement.scrollTop;
  
  if (positionScroll > 200) {
    boutonRetour.style.display = "flex";
  } else {
    boutonRetour.style.display = "none";
  }
  let sectionActuelle = "";
  const hauteurNav = getHauteurNav();

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - hauteurNav - 50;
    const sectionHauteur = section.offsetHeight;

    if (positionScroll >= sectionTop && positionScroll < sectionTop + sectionHauteur) {
      sectionActuelle = section.getAttribute("id");
    }
  });

  liensNav.forEach((lien) => {
    lien.classList.remove("active");
    if (lien.getAttribute("href") === `#${sectionActuelle}`) {
      lien.classList.add("active");
    }
  });
}
gererScroll();

// Écouteur unique sur le défilement
window.addEventListener("scroll", gererScroll);

// Clic sur le bouton REH
boutonRetour.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Clic sur les liens de nav
liensNav.forEach((lien) => {
  lien.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const positionCible = targetSection.offsetTop - getHauteurNav();

      window.scrollTo({
        top: positionCible,
        behavior: "smooth",
      });
    }
  });
});