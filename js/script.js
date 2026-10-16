const boutonRetourHaut = document.getElementById("btnRetourHaut");
const barreNavigation = document.querySelector("nav");
const liensInternes = document.querySelectorAll("nav a[href^='#']");
const sections = document.querySelectorAll("section");
const boutonsTelephone = document.querySelectorAll(".copy-phone");

// Affiche ou masque le bouton de retour en haut.
function afficherBoutonRetour() {
  if (!boutonRetourHaut) return;

  const pageDefilee = window.scrollY > 200;
  boutonRetourHaut.style.display = pageDefilee ? "flex" : "none";
}

// Met en évidence le lien correspondant à la section visible.
function mettreAJourSectionActive() {
  if (!barreNavigation || sections.length === 0) return;

  const positionScroll = window.scrollY || document.documentElement.scrollTop;
  const hauteurNavigation = barreNavigation.offsetHeight;
  let sectionVisible = null;

  sections.forEach((section) => {
    const debutSection = section.offsetTop - hauteurNavigation - 50;
    const finSection = debutSection + section.offsetHeight;

    if (positionScroll >= debutSection && positionScroll < finSection) {
      sectionVisible = section.id;
    }
  });

  liensInternes.forEach((lien) => {
    const idActif = sectionVisible ? `#${sectionVisible}` : "";
    lien.classList.toggle("active", lien.hash === idActif);
  });
}

function mettreAJourPage() {
  afficherBoutonRetour();
  mettreAJourSectionActive();
}

// Gestion du défilement.
mettreAJourPage();
window.addEventListener("scroll", mettreAJourPage);

// Retour fluide en haut de la page.
if (boutonRetourHaut) {
  boutonRetourHaut.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Défilement fluide vers les sections.
liensInternes.forEach((lien) => {
  lien.addEventListener("click", (evenement) => {
    evenement.preventDefault();

    const idSection = lien.hash.slice(1);
    const section = document.getElementById(idSection);
    if (!section || !barreNavigation) return;

    const positionSection = section.offsetTop - barreNavigation.offsetHeight;
    window.scrollTo({ top: positionSection, behavior: "smooth" });
  });
});

// Copie le numéro de téléphone dans le presse-papiers.
boutonsTelephone.forEach((bouton) => {
  let minuteurNotification;

  bouton.addEventListener("click", async () => {
    const numeroTelephone = bouton.dataset.phone;
    const footer = bouton.closest(".footer-col");
    const message = footer ? footer.querySelector(".copy-status") : null;

    if (!numeroTelephone || !message) return;

    try {
      await navigator.clipboard.writeText(numeroTelephone);
      message.className = "copy-status copy-success";
      message.textContent = "Numéro copié dans le presse-papiers.";
    } catch (erreur) {
      message.className = "copy-status copy-error";
      message.textContent =
        "Impossible de copier le numéro. Vous pouvez le sélectionner manuellement.";
      console.error("La copie du numéro de téléphone a échoué.", erreur);
    }

    clearTimeout(minuteurNotification);
    minuteurNotification = setTimeout(() => {
      message.textContent = "";
      message.className = "copy-status";
    }, 3500);
  });
});
