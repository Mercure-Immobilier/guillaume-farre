import { expect, type Locator, type Page, test } from "@playwright/test";
import sharp from "sharp";

/**
 * Gardes d'affichage du site public, jouées contre le serveur local par « bun run test:gardes ». La suite tombe,
 * donc le build de contrôle avec elle, quand :
 *  - un débordement horizontal apparaît à 390, 768, 1024 ou 1440 px sur /fr, /fr/presse, /fr/toiles, /fr/contact ;
 *  - le nom du site touche le premier lien du menu entre 768 et 1024 px ;
 *  - une zone d'appui des liens « Autres langues » de la page Presse passe sous 24 px ;
 *  - le lien actif du menu passe sous 4,5 pour 1 ;
 *  - une carte de la page Presse reste invisible après défilement.
 *
 * Chaque garde a été vue tomber sur une cassure volontaire du code : e2e/cassures-gardes.sh les rejoue.
 * Les mesures reprennent celles des outils de navigation du 7 novembre 2026 (écart entre le nom et le menu,
 * largeur du document au repos et au défilement, fond réel lu en pixels sous un texte rendu transparent).
 */

const TAILLES = [
  { largeur: 390, hauteur: 844 },
  { largeur: 768, hauteur: 1024 },
  { largeur: 1024, hauteur: 768 },
  { largeur: 1440, hauteur: 900 },
] as const;
const PAGES_SANS_DEBORDEMENT = ["/fr", "/fr/presse", "/fr/toiles", "/fr/contact"];
const LARGEURS_DE_TABLETTE = [768, 820, 900, 1000, 1023, 1024];
/** Air minimal entre le nom du site et l'élément qui le suit dans l'en-tête, seuil de la mesure de la pilote */
const AIR_MINIMAL = 24;
/** Zone d'appui minimale d'un lien, règle 2.5.8 des WCAG 2.2 */
const CIBLE_MINIMALE = 24;
const CONTRASTE_MINIMAL = 4.5;
const CONTRASTE_ECRIT = "4,5";
const BOUTON_MENU = 'button[aria-label="Menu"]';

test.beforeEach(async ({ context }) => {
  // Bandeau de cookies refusé d'avance : il couvrirait le bas de l'écran pendant les mesures
  await context.addInitScript(() => {
    localStorage.setItem("gf_cookie_consent", "refused");
    localStorage.setItem("gf_cookie_consent_date", new Date().toISOString());
  });
});

async function ouvrir(page: Page, chemin: string, largeur: number, hauteur: number) {
  await page.setViewportSize({ width: largeur, height: hauteur });
  const reponse = await page.goto(chemin, { waitUntil: "networkidle" });
  expect(reponse?.status(), `${chemin} répond`).toBe(200);
  expect(new URL(page.url()).pathname, `${chemin} servie sans redirection`).toBe(chemin);
}

// --- Couleurs ---------------------------------------------------------------------------------------------------

type Rvb = [number, number, number];

function lireCouleur(css: string): { rvb: Rvb; alpha: number } {
  const [r, v, b, alpha = 1] = (css.match(/[\d.]+/g) ?? []).map(Number);
  return { rvb: [r, v, b], alpha };
}

function luminance(rvb: Rvb): number {
  const [r, v, b] = rvb.map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * v + 0.0722 * b;
}

function rapport(a: Rvb, b: Rvb): number {
  const [clair, sombre] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((clair + 0.05) / (sombre + 0.05)) * 100) / 100;
}

/** Couleur du texte posée sur son fond, transparence comprise */
function surFond(texte: { rvb: Rvb; alpha: number }, fond: Rvb): Rvb {
  return texte.rvb.map((c, i) => Math.round(c * texte.alpha + fond[i] * (1 - texte.alpha))) as Rvb;
}

/** Fond réel derrière un lien : texte rendu transparent, boîte capturée, médiane de ses pixels */
async function fondReel(page: Page, lien: Locator): Promise<Rvb> {
  await lien.evaluate((e) => e.setAttribute("data-garde-fond", ""));
  const style = await page.addStyleTag({
    content: "[data-garde-fond],[data-garde-fond] *{color:transparent!important;text-shadow:none!important;transition:none!important}",
  });
  const boite = await lien.boundingBox();
  expect(boite, "boîte du lien mesuré").not.toBeNull();
  const image = await page.screenshot({ clip: boite! });
  await style.evaluate((n) => (n as Element).remove());
  await lien.evaluate((e) => e.removeAttribute("data-garde-fond"));
  const { data, info } = await sharp(image).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const canaux: number[][] = [[], [], []];
  for (let i = 0; i < data.length; i += info.channels) for (let k = 0; k < 3; k++) canaux[k].push(data[i + k]);
  return canaux.map((v) => v.sort((x, y) => x - y)[v.length >> 1]) as Rvb;
}

async function contrasteDuLien(page: Page, lien: Locator) {
  const couleur = lireCouleur(await lien.evaluate((e) => getComputedStyle(e).color));
  const fond = await fondReel(page, lien);
  const texte = surFond(couleur, fond);
  return { texte: `rgb(${texte})`, fond: `rgb(${fond})`, rapport: rapport(texte, fond) };
}

// --- Mesures dans la page ---------------------------------------------------------------------------------------

/** Largeur du document au repos puis à chaque pas d'un défilement jusqu'en bas, avec les éléments qui dépassent */
async function largeurAuDefilement(page: Page) {
  return page.evaluate(async () => {
    const attendre = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const racine = document.documentElement;
    let largeurMax = racine.scrollWidth;
    for (let y = 0; y < racine.scrollHeight; y += Math.round(innerHeight * 0.8)) {
      window.scrollTo(0, y);
      await attendre(100);
      largeurMax = Math.max(largeurMax, racine.scrollWidth);
    }
    const fautifs = [...document.querySelectorAll("body *")]
      .filter((e) => e.getBoundingClientRect().right > racine.clientWidth + 1)
      .slice(0, 5)
      .map((e) => `${e.tagName.toLowerCase()}.${String(e.getAttribute("class") ?? "").split(/\s+/).slice(0, 4).join(".")}`);
    return { largeurMax, largeurVue: racine.clientWidth, fautifs };
  });
}

/** Écart entre le nom du site et l'élément visible qui le suit dans l'en-tête : premier lien du menu ou bouton Menu */
async function ecartNomMenu(page: Page) {
  return page.evaluate(() => {
    const entete = document.querySelector("nav.sticky");
    const nom = entete?.querySelector("a");
    if (!entete || !nom) return { erreur: "en-tête ou nom introuvable", suivant: null, ecart: null };
    const boiteNom = nom.getBoundingClientRect();
    const suivant = [...entete.querySelectorAll("a, button")]
      .filter((e) => e !== nom && !e.closest("#mobile-menu"))
      .map((e) => ({ e, b: e.getBoundingClientRect() }))
      .filter(({ e, b }) => b.width > 0 && b.height > 0 && getComputedStyle(e).visibility !== "hidden")
      .filter(({ b }) => b.left > boiteNom.left)
      .sort((x, y) => x.b.left - y.b.left)[0];
    if (!suivant) return { erreur: "aucun élément après le nom", suivant: null, ecart: null };
    return {
      erreur: null,
      suivant: (suivant.e.textContent ?? "").trim() || suivant.e.getAttribute("aria-label"),
      ecart: Math.round((suivant.b.left - boiteNom.right) * 10) / 10,
    };
  });
}

/** Cartes de la page Presse encore invisibles : opacité cumulée sous 0,99, visibilité cachée ou boîte vide */
async function cartesInvisibles(page: Page) {
  return page.locator("main article").evaluateAll((cartes) =>
    cartes
      .filter((carte) => {
        let opacite = 1;
        for (let e: Element | null = carte; e; e = e.parentElement) opacite *= Number(getComputedStyle(e).opacity);
        const b = carte.getBoundingClientRect();
        return opacite < 0.99 || getComputedStyle(carte).visibility === "hidden" || b.width === 0 || b.height === 0;
      })
      .map((carte) => (carte.querySelector("h2, h3")?.textContent ?? carte.textContent ?? "").trim().slice(0, 50)),
  );
}

/** Liens de la rangée « Autres langues » des cartes de la page Presse */
function liensAutresLangues(page: Page): Locator {
  return page.locator("main article p").filter({ hasText: /^Autres langues/ }).locator("a[hreflang]");
}

// --- Gardes ------------------------------------------------------------------------------------------------------

test("témoin : le serveur sert le site public, page Presse, cartes et liens de langue compris", async ({ page }) => {
  await ouvrir(page, "/fr/presse", 1440, 900);
  await expect(page.locator("main h1")).toHaveText("Presse");
  expect(await page.locator("main article").count()).toBeGreaterThan(1);
  expect(await liensAutresLangues(page).count()).toBeGreaterThan(0);
  await expect(page.locator("nav.sticky a[href$='/presse']").first()).toBeVisible();
});

test.describe("aucun débordement horizontal", () => {
  for (const { largeur, hauteur } of TAILLES) {
    for (const chemin of PAGES_SANS_DEBORDEMENT) {
      test(`${chemin} à ${largeur} px, au repos puis au défilement`, async ({ page }) => {
        await ouvrir(page, chemin, largeur, hauteur);
        const mesure = await largeurAuDefilement(page);
        // La vue mesure la largeur demandée, moins une barre de défilement quand le navigateur en dessine une
        expect(mesure.largeurVue).toBeLessThanOrEqual(largeur);
        expect(mesure.largeurVue).toBeGreaterThan(largeur - 20);
        expect(mesure.largeurMax, `document plus large que l'écran ; dépassent : ${mesure.fautifs.join(", ")}`).toBeLessThanOrEqual(
          mesure.largeurVue,
        );
      });
    }
  }
});

test.describe(`le nom du site garde ${AIR_MINIMAL} px d'air avant le menu entre 768 et 1024 px`, () => {
  for (const largeur of LARGEURS_DE_TABLETTE) {
    test(`à ${largeur} px`, async ({ page }) => {
      await ouvrir(page, "/fr/toiles", largeur, 900);
      const mesure = await ecartNomMenu(page);
      expect(mesure.erreur).toBeNull();
      expect(mesure.ecart, `écart entre le nom et « ${mesure.suivant} »`).toBeGreaterThanOrEqual(AIR_MINIMAL);
    });
  }
});

test.describe(`liens « Autres langues » de la page Presse : zone d'appui de ${CIBLE_MINIMALE} px au moins`, () => {
  for (const { largeur, hauteur } of TAILLES) {
    test(`à ${largeur} px`, async ({ page }) => {
      await ouvrir(page, "/fr/presse", largeur, hauteur);
      const boites = await liensAutresLangues(page).evaluateAll((liens) =>
        liens.map((a) => {
          // Au centième : une boîte de 24 px déplacée par l'animation d'apparition mesure 23,9999 px
          const b = a.getBoundingClientRect();
          const auCentieme = (v: number) => Math.round(v * 100) / 100;
          return { texte: (a.textContent ?? "").trim(), largeur: auCentieme(b.width), hauteur: auCentieme(b.height) };
        }),
      );
      expect(boites.length, "liens relevés").toBeGreaterThan(0);
      expect(boites.filter((b) => b.largeur < CIBLE_MINIMALE || b.hauteur < CIBLE_MINIMALE)).toEqual([]);
    });
  }
});

test.describe(`lien actif du menu : ${CONTRASTE_ECRIT} pour 1 au moins`, () => {
  for (const { largeur, hauteur } of TAILLES) {
    test(`à ${largeur} px, contre le fond réel`, async ({ page }) => {
      await ouvrir(page, "/fr/presse", largeur, hauteur);
      let lien = page.locator("nav.sticky a[href$='/presse']").first();
      if (largeur < 1024) {
        await page.locator(BOUTON_MENU).first().click();
        lien = page.locator("#mobile-menu a[href$='/presse']");
        await expect(lien).toBeVisible();
        await page.waitForTimeout(500); // fin de l'entrée du panneau
      }
      const mesure = await contrasteDuLien(page, lien);
      expect(mesure.rapport, `${mesure.texte} sur ${mesure.fond}`).toBeGreaterThanOrEqual(CONTRASTE_MINIMAL);
    });
  }

  test("au survol d'un autre lien du menu, au bureau", async ({ page }) => {
    await ouvrir(page, "/fr/presse", 1440, 900);
    const lien = page.locator("nav.sticky a[href$='/contact']").first();
    await lien.hover();
    await page.waitForTimeout(500); // fin de la transition de couleur
    const mesure = await contrasteDuLien(page, lien);
    expect(mesure.rapport, `${mesure.texte} sur ${mesure.fond}`).toBeGreaterThanOrEqual(CONTRASTE_MINIMAL);
  });

  test("sous l'en-tête voilé au défilement, posé sur l'image la plus sombre", async ({ page }) => {
    await ouvrir(page, "/fr/presse", 1440, 900);
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(1200); // fin de la transition du voile, 700 ms
    const voile = lireCouleur(await page.locator("nav.sticky > div[aria-hidden='true']").evaluate((e) => getComputedStyle(e).backgroundColor));
    expect(voile.alpha, "voile translucide une fois la page défilée").toBeLessThan(1);
    const pireFond = voile.rvb.map((c) => Math.round(c * voile.alpha)) as Rvb; // le voile posé sur du noir
    const couleur = lireCouleur(await page.locator("nav.sticky a[href$='/presse']").first().evaluate((e) => getComputedStyle(e).color));
    const texte = surFond(couleur, pireFond);
    expect(rapport(texte, pireFond), `rgb(${texte}) sur rgb(${pireFond})`).toBeGreaterThanOrEqual(CONTRASTE_MINIMAL);
  });
});

test.describe("chaque carte de la page Presse devient visible après défilement", () => {
  for (const { largeur, hauteur } of TAILLES) {
    test(`à ${largeur} px`, async ({ page }) => {
      await ouvrir(page, "/fr/presse", largeur, hauteur);
      expect(await page.locator("main article").count(), "cartes relevées").toBeGreaterThan(1);
      await page.evaluate(async () => {
        const attendre = (ms: number) => new Promise((r) => setTimeout(r, ms));
        for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight / 2)) {
          window.scrollTo(0, y);
          await attendre(200);
        }
        window.scrollTo(0, document.documentElement.scrollHeight);
      });
      await expect.poll(() => cartesInvisibles(page), { timeout: 10_000 }).toEqual([]);
    });
  }
});
