import { afterEach, describe, expect, it, vi } from "vitest";
import { installerPiegeFocus } from "@/components/navigation/piege-focus";

// Même ordre que le panneau du menu mobile : fermer, quatre rubriques, sélecteur de langue
function monterPanneau() {
  document.body.innerHTML = `
    <button id="declencheur">Menu</button>
    <div id="mobile-menu">
      <button id="fermer">Fermer</button>
      <a href="/galerie">Photographies</a>
      <a href="/toiles">Toiles</a>
      <a href="/presse">Presse</a>
      <a href="/contact">Contact</a>
      <button id="langue">Français</button>
      <button id="inactif" disabled>Indisponible</button>
    </div>`;
  const panneau = document.getElementById("mobile-menu") as HTMLElement;
  const element = (id: string) => document.getElementById(id) as HTMLElement;
  return { panneau, element };
}

function appuyer(touche: string, shiftKey = false) {
  const evenement = new KeyboardEvent("keydown", { key: touche, shiftKey, bubbles: true, cancelable: true });
  document.activeElement?.dispatchEvent(evenement);
  return evenement;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("piège à focus du menu mobile", () => {
  it("met le focus sur le premier élément du panneau à l'ouverture", () => {
    const { panneau, element } = monterPanneau();
    const retirer = installerPiegeFocus(panneau, () => undefined);
    expect(document.activeElement).toBe(element("fermer"));
    retirer();
  });

  it("fait tourner Tab et Maj+Tab entre le premier et le dernier élément actif", () => {
    const { panneau, element } = monterPanneau();
    const retirer = installerPiegeFocus(panneau, () => undefined);

    element("langue").focus();
    const tab = appuyer("Tab");
    expect(tab.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(element("fermer"));

    const retour = appuyer("Tab", true);
    expect(retour.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(element("langue"));

    // Entre deux éléments, le navigateur garde la main
    element("fermer").focus();
    expect(appuyer("Tab").defaultPrevented).toBe(false);
    retirer();
  });

  it("ramène dans le panneau un focus parti au dehors", () => {
    const { panneau, element } = monterPanneau();
    const retirer = installerPiegeFocus(panneau, () => undefined);
    element("declencheur").focus();
    expect(appuyer("Tab").defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(element("fermer"));
    retirer();
  });

  it("ferme à Échap même quand le focus est hors du panneau", () => {
    const { panneau, element } = monterPanneau();
    const fermer = vi.fn();
    const retirer = installerPiegeFocus(panneau, fermer);
    element("declencheur").focus();
    appuyer("Escape");
    expect(fermer).toHaveBeenCalledTimes(1);
    retirer();
  });

  it("n'écoute plus le clavier une fois retiré", () => {
    const { panneau } = monterPanneau();
    const fermer = vi.fn();
    installerPiegeFocus(panneau, fermer)();
    appuyer("Escape");
    expect(fermer).not.toHaveBeenCalled();
  });
});
