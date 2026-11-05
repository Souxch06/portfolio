// Éléments de la page utilisés par le script.
const boutonRetourHaut = document.getElementById("btnRetourHaut");
const barreNavigation = document.querySelector("nav");
const liensNavigation = document.querySelectorAll("nav a[href^='#']");
const sections = document.querySelectorAll("section");
const boutonsTelephone = document.querySelectorAll(".copy-phone");

// ==================================================
// BOUTON RETOUR EN HAUT
// ==================================================

function afficherOuCacherBouton() {
  // Le bouton apparaît seulement après un peu de défilement.
  if (window.scrollY > 200) {
    boutonRetourHaut.style.display = "flex";
  } else {
    boutonRetourHaut.style.display = "none";
  }
}

// Ce bouton existe uniquement sur la page d'accueil.
if (boutonRetourHaut) {
  window.addEventListener("scroll", afficherOuCacherBouton);

  boutonRetourHaut.addEventListener("click", () => {
    // Retour en haut avec un défilement doux.
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==================================================
// LIEN ACTIF DANS LA NAVIGATION
// ==================================================

function trouverSectionVisible() {
  const positionActuelle = window.scrollY;
  const hauteurNavigation = barreNavigation.offsetHeight;

  // On cherche la section qui se trouve à la position actuelle.
  for (const section of sections) {
    const hautDeLaSection = section.offsetTop - hauteurNavigation - 50;
    const basDeLaSection = hautDeLaSection + section.offsetHeight;

    if (
      positionActuelle >= hautDeLaSection &&
      positionActuelle < basDeLaSection
    ) {
      return section.id;
    }
  }

  return "";
}

function mettreAJourLienActif() {
  const idSectionVisible = trouverSectionVisible();

  for (const lien of liensNavigation) {
    // Le lien de la section visible reçoit la classe "active".
    const lienVersLaSection =
      lien.getAttribute("href") === `#${idSectionVisible}`;
    lien.classList.toggle("active", lienVersLaSection);
  }
}

if (barreNavigation) {
  mettreAJourLienActif();
  window.addEventListener("scroll", mettreAJourLienActif);
}

// ==================================================
// DÉFILEMENT VERS UNE SECTION
// ==================================================

for (const lien of liensNavigation) {
  lien.addEventListener("click", (evenement) => {
    // On gère nous-mêmes le défilement pour tenir compte de la navigation.
    evenement.preventDefault();

    const idSection = lien.getAttribute("href").substring(1);
    const section = document.getElementById(idSection);

    if (!section || !barreNavigation) return;

    // On retire la hauteur de la navigation pour ne pas cacher le titre.
    const positionSection =
      section.offsetTop - barreNavigation.offsetHeight;
    window.scrollTo({ top: positionSection, behavior: "smooth" });
  });
}

// ==================================================
// COPIE DU NUMÉRO DE TÉLÉPHONE
// ==================================================

function copierNumero(bouton) {
  // Le numéro vient de l'attribut data-phone du bouton.
  const numero = bouton.dataset.phone;
  const piedDePage = bouton.closest(".footer-col");
  const message = piedDePage.querySelector(".copy-status");

  // On affiche un message selon que la copie fonctionne ou non.
  navigator.clipboard.writeText(numero).then(
    () => {
      message.textContent = "Le numéro a bien été copié.";
    },
    (erreur) => {
      console.error("La copie du numéro a échoué :", erreur);
      message.textContent =
        "La copie a échoué. Vous pouvez recopier le numéro : " + numero;
    },
  );
}

for (const bouton of boutonsTelephone) {
  bouton.addEventListener("click", () => {
    copierNumero(bouton);
  });
}
