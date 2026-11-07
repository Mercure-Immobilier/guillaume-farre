/**
 * Piège à focus d'un panneau ouvert : le focus y entre à l'ouverture, Tab et Maj+Tab tournent entre
 * ses éléments, Échap ferme où que soit le focus. Rend la fonction qui retire l'écoute du clavier.
 */
export const ELEMENTS_FOCALISABLES = "a[href], button:not([disabled])";

export function installerPiegeFocus(panneau: HTMLElement, fermer: () => void): () => void {
  const doc = panneau.ownerDocument;
  panneau.querySelector<HTMLElement>(ELEMENTS_FOCALISABLES)?.focus();

  const surTouche = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      fermer();
      return;
    }
    if (e.key !== "Tab") return;
    const elements = Array.from(panneau.querySelectorAll<HTMLElement>(ELEMENTS_FOCALISABLES));
    if (elements.length === 0) return;
    const premier = elements[0];
    const dernier = elements[elements.length - 1];
    const actif = doc.activeElement;
    if (!panneau.contains(actif)) {
      e.preventDefault();
      premier.focus();
    } else if (e.shiftKey && actif === premier) {
      e.preventDefault();
      dernier.focus();
    } else if (!e.shiftKey && actif === dernier) {
      e.preventDefault();
      premier.focus();
    }
  };

  doc.addEventListener("keydown", surTouche);
  return () => doc.removeEventListener("keydown", surTouche);
}
