/*PERCORSI NELLA LETTERATURA ITALIANA
INIZIALIZZAZIONE*/
  
document.addEventListener("DOMContentLoaded", () => {

    initializeMobileNavigation();

    initializeCurrentPage();

    initializeAuthorAccordions();
});


/*  NAVIGAZIONE MOBILE */

function initializeMobileNavigation() {

    const navigationContainer = document.querySelector(".site-navigation");

    // Se la pagina non contiene il componente, interrompe
    // l'inizializzazione senza generare errori.
    if (!navigationContainer) {
        return;
    }

    const navigationToggle = navigationContainer.querySelector(
        ".navigation-toggle"
    );

    const navigationMenu = navigationContainer.querySelector(
        ".main-navigation"
    );

    const navigationLinks = navigationContainer.querySelectorAll(
        ".navigation-list a"
    );

    const mobileBreakpoint = window.matchMedia("(max-width: 700px)");

function setInitialNavigationState() {
    navigationContainer.open = !mobileBreakpoint.matches;
    updateExpandedState();
}
    if (!navigationToggle || !navigationMenu) {
        return;
        }

setInitialNavigationState();

mobileBreakpoint.addEventListener("change", setInitialNavigationState);


    // Recupera gli elementi interattivi del menu.
    const menuItems = Array.from(navigationLinks);

    /* menu gestito da <details>
     Il comportamento nativo di <summary> permette di usare la tastiera.     */
// Inizializza aria-expanded in base allo stato del menu.
    updateExpandedState();

    /* Aggiorna lo stato accessibile del pulsante. */
    function updateExpandedState() {

        const isOpen = navigationContainer.open;

        navigationToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }


    /* Aggiorna aria-expanded se menù aperto o chiuso attraverso details.*/
    navigationContainer.addEventListener("toggle", () => {

        updateExpandedState();

    });


    /* Il menu si chiude solo se è aperto, ritorna al controllo che permette di riaprirlo */
    navigationContainer.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && navigationContainer.open) {

            event.preventDefault();

            navigationContainer.open = false;

            navigationToggle.focus();

            updateExpandedState();

        }

    });


    /*Chiusura del menu dopo la selezione di una voce.
     I collegamenti mantengono il loro normale comportamento: il browser carica la destinazione.      */
    menuItems.forEach((link) => {

        link.addEventListener("click", () => {

            if (navigationContainer.open) {

                navigationContainer.open = false;

                updateExpandedState();

            }

        });

    });


    /* Se il menu viene chiuso attraverso un'interazione esterna al componente,
    non vengono alterati i normali comportamenti di navigazione. */

}


/* IDENTIFICAZIONE DELLA PAGINA CORRENTE*/

function initializeCurrentPage() {

    const navigationLinks = document.querySelectorAll(
        ".navigation-list a, .footer-navigation a"
    );

    // Se la pagina non contiene collegamenti di navigazione,
    // non è necessario procedere.
    if (navigationLinks.length === 0) {
        return;
    }

    // Recupera il nome del file della pagina corrente.
    let currentPage = window.location.pathname
        .split("/")
        .pop();

    /* Quando l'indirizzo termina con una barra, viene considerata la homepage. */
    if (!currentPage || currentPage === "") {
        currentPage = "index.html";
    }

    /* Confronta il nome del file corrente con quello in href dei collegamenti ->il riconoscimento funziona anche quando il sito viene spostato in una sottocartella.*/
    navigationLinks.forEach((link) => {

        const linkUrl = new URL(
            link.getAttribute("href"),
            window.location.href
        );

        const linkPage = linkUrl.pathname
            .split("/")
            .pop();

        if (
            linkPage === currentPage &&
            linkUrl.origin === window.location.origin
        ) {

            link.setAttribute("aria-current", "page");

        } else {

            link.removeAttribute("aria-current");

        }

    });

}


/*SINCRONIZZAZIONE DELLA NAVIGAZIONE */

function synchronizeNavigation() {

    initializeCurrentPage();

}



/*Pulsante per tornare all'inizio della pagina con rispetto delle preferenze*/
function scrollToTop() {

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
    });

}

const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {
    backToTopButton.addEventListener("click", scrollToTop);
}
/* Schede autori */

function initializeAuthorAccordions() {
    const accordions = document.querySelectorAll(".author-accordion");

    accordions.forEach((accordion) => {
        accordion.addEventListener("toggle", () => {
            if (!accordion.open) return;

            accordions.forEach((otherAccordion) => {
                if (otherAccordion !== accordion) {
                    otherAccordion.open = false;
                }
            });
        });
    });
}


