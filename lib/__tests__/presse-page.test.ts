import type { AbstractIntlMessages } from "next-intl";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PressePage, { generateMetadata } from "@/app/[locale]/presse/page";
import messagesEn from "@/messages/en.json";
import messagesFr from "@/messages/fr.json";
import messagesIt from "@/messages/it.json";
import { ARTICLES_PRESSE } from "../presse";
import { FILTRE_TOILE } from "../toiles-filter";
import { contientLaPartieObscene, EXTRAITS_PUBLIES } from "./presse-publications";

/**
 * La page Presse telle qu'elle est servie : le composant de app/[locale]/presse/page.tsx rendu en HTML
 * avec les vrais fichiers de messages, puis lu comme un document. Seul l'en-tête du site, que corrige
 * une autre branche, est remplacé par un repère.
 */

vi.hoisted(() => {
  // GSAP interroge matchMedia dès que ScrollReveal enregistre ScrollTrigger ; jsdom ne le fournit pas
  window.matchMedia ??= (requete: string) =>
    ({
      matches: false,
      media: requete,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
});

vi.mock("next-intl/server", async () => {
  const { createTranslator } = await import("next-intl");
  const messages = {
    fr: (await import("@/messages/fr.json")).default,
    en: (await import("@/messages/en.json")).default,
    it: (await import("@/messages/it.json")).default,
  };
  return {
    getTranslations: async ({ locale, namespace }: { locale: keyof typeof messages; namespace: string }) =>
      createTranslator({ locale, messages: messages[locale] as AbstractIntlMessages, namespace }),
  };
});

vi.mock("@/components/navigation/Navigation", () => ({
  default: () => createElement("nav", { "data-en-tete-du-site": "" }),
}));

const LANGUES_DU_SITE = ["fr", "en", "it"] as const;
type LangueDuSite = (typeof LANGUES_DU_SITE)[number];
const MESSAGES = { fr: messagesFr, en: messagesEn, it: messagesIt };
const parametres = (locale: LangueDuSite) => ({ params: Promise.resolve({ locale }) });

async function htmlDeLaPage(locale: LangueDuSite): Promise<string> {
  return renderToStaticMarkup(await PressePage(parametres(locale)));
}

async function pageRendue(locale: LangueDuSite): Promise<Document> {
  return new DOMParser().parseFromString(await htmlDeLaPage(locale), "text/html");
}

/** Texte lu à l'écran, espaces insécables comprises comme des espaces */
const texteLu = (el: Element | null) => (el?.textContent ?? "").replace(/ /g, " ");

const classesDe = (el: Element | null) => (el?.getAttribute("class") ?? "").split(/\s+/).filter(Boolean);

/** Marge intérieure haute (t) ou basse (b) en pixels, lue dans les classes p-, py-, pt- ou pb- sans préfixe d'écran */
function margeInterieure(classes: string[], cote: "t" | "b"): number {
  const valeur = (prefixe: string) => {
    const classe = classes.find((c) => c.startsWith(`${prefixe}-`) && /^\d+(\.\d+)?$/.test(c.slice(prefixe.length + 1)));
    return classe ? Number(classe.slice(prefixe.length + 1)) * 4 : null;
  };
  return valeur(`p${cote}`) ?? valeur("py") ?? valeur("p") ?? 0;
}

/** Taille en pixels d'une classe de police Tailwind (text-xs, sm:text-[11px]…), null pour toute autre classe */
const TAILLES_TAILWIND: Record<string, number> = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24 };
function taillePolice(classe: string): number | null {
  const nommee = classe.match(/(?:^|:)text-(xs|sm|base|lg|xl|2xl)$/);
  if (nommee) return TAILLES_TAILWIND[nommee[1]];
  const arbitraire = classe.match(/(?:^|:)text-\[(\d+(?:\.\d+)?)px\]$/);
  return arbitraire ? Number(arbitraire[1]) : null;
}

/** Version que chaque carte cite, dans l'ordre de la page : article puis langue de l'extrait */
const CITATIONS_ATTENDUES: Record<LangueDuSite, [string, "fr" | "en"][]> = {
  fr: [["qceg-2026-10", "fr"], ["sud-ouest-2026-06", "fr"]],
  en: [["qceg-2026-10", "en"], ["sud-ouest-2026-06", "fr"]],
  it: [["qceg-2026-10", "en"], ["sud-ouest-2026-06", "fr"]],
};
const GUILLEMETS = { fr: ["« ", " »"], en: ["“", "”"] } as const;

/**
 * Avertissements de React pendant le rendu : tout avertissement fait échouer le test qui l'a produit.
 * Un seul est écarté, propre à cet environnement : sous React 18, next/image précharge la toile vedette
 * par next/head, dont l'effet ne s'exécute jamais côté serveur ; Next sert la page avec son propre React.
 */
let avertissements: string[] = [];
beforeEach(() => {
  avertissements = [];
  vi.spyOn(console, "error").mockImplementation((...valeurs: unknown[]) => {
    const message = valeurs.map(String).join(" ");
    if (!message.includes("useLayoutEffect does nothing on the server")) avertissements.push(message);
  });
});
afterEach(() => {
  vi.restoreAllMocks();
  expect(avertissements).toEqual([]);
});

describe("page Presse rendue", () => {
  it.each(LANGUES_DU_SITE)("place l'en-tête du site puis le seul titre au-dessus des cartes (%s)", async (locale) => {
    const page = await pageRendue(locale);
    const main = page.querySelector("main");
    expect(main?.querySelector("nav[data-en-tete-du-site]")).not.toBeNull();
    expect(page.querySelectorAll("h1")).toHaveLength(1);
    expect(texteLu(page.querySelector("h1"))).toBe(MESSAGES[locale].press.title);
    expect(page.querySelectorAll("main article")).toHaveLength(ARTICLES_PRESSE.length);
  });

  it.each(LANGUES_DU_SITE)("n'écrit aucun sous-titre entre le titre et la première carte (%s)", async (locale) => {
    const page = await pageRendue(locale);
    const titre = page.querySelector("main h1");
    const premiereCarte = page.querySelector("main article");
    if (!titre || !premiereCarte) throw new Error("titre ou carte absent de la page rendue");
    const marcheur = page.createTreeWalker(page.querySelector("main") as Element, NodeFilter.SHOW_TEXT);
    const entreLesDeux: string[] = [];
    for (let noeud = marcheur.nextNode(); noeud; noeud = marcheur.nextNode()) {
      const apresLeTitre = titre.compareDocumentPosition(noeud) & Node.DOCUMENT_POSITION_FOLLOWING;
      const avantLaCarte = premiereCarte.compareDocumentPosition(noeud) & Node.DOCUMENT_POSITION_PRECEDING;
      if (apresLeTitre && avantLaCarte && !titre.contains(noeud)) entreLesDeux.push(noeud.textContent ?? "");
    }
    expect(entreLesDeux.join("").trim()).toBe("");
  });

  it.each(LANGUES_DU_SITE)("cite mot pour mot le texte publié, dans sa langue (%s)", async (locale) => {
    const page = await pageRendue(locale);
    const citations = [...page.querySelectorAll("main article blockquote")];
    expect(citations).toHaveLength(CITATIONS_ATTENDUES[locale].length);
    CITATIONS_ATTENDUES[locale].forEach(([id, langue], rang) => {
      const [ouvrant, fermant] = GUILLEMETS[langue];
      const article = ARTICLES_PRESSE.find((a) => a.id === id);
      const version = article?.versions.find((v) => v.langue === langue);
      expect(texteLu(citations[rang])).toBe(`${ouvrant}${EXTRAITS_PUBLIES[id][langue]}${fermant}`);
      expect(citations[rang].getAttribute("lang")).toBe(langue);
      expect(citations[rang].getAttribute("cite")).toBe(version?.url);
    });
  });

  it.each(LANGUES_DU_SITE)("ne montre la partie obscène du titre de Sud Ouest ni dans le texte ni dans les adresses (%s)", async (locale) => {
    const html = await htmlDeLaPage(locale);
    expect(html).toContain("Au festival Wheels and Waves, à Biarritz");
    expect(contientLaPartieObscene(html)).toBe(false);
  });

  it.each(LANGUES_DU_SITE)("ne la met pas non plus dans les métadonnées de la page (%s)", async (locale) => {
    const metadonnees = await generateMetadata(parametres(locale));
    expect(metadonnees.title).toBe(MESSAGES[locale].meta.press.title);
    expect(contientLaPartieObscene(JSON.stringify(metadonnees))).toBe(false);
  });

  it.each(LANGUES_DU_SITE)("déclare sa propre adresse canonique avec celles des autres langues (%s)", async (locale) => {
    const { alternates, openGraph } = await generateMetadata(parametres(locale));
    expect(alternates?.canonical).toBe(`/${locale}/presse`);
    expect(alternates?.languages).toEqual({
      fr: "/fr/presse",
      en: "/en/presse",
      it: "/it/presse",
      "x-default": "/fr/presse",
    });
    expect(openGraph?.url).toBe(`/${locale}/presse`);
  });

  it.each(LANGUES_DU_SITE)("ouvre chaque article dans un nouvel onglet sans transmettre la page d'origine (%s)", async (locale) => {
    const page = await pageRendue(locale);
    const liens = [...page.querySelectorAll("main article a")];
    expect(liens.length).toBeGreaterThanOrEqual(2);
    for (const lien of liens) {
      expect(lien.getAttribute("target")).toBe("_blank");
      expect(lien.getAttribute("rel")?.split(" ")).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
    }
  });

  it.each(LANGUES_DU_SITE)("étend le lien principal de chaque carte en ligne à toute la carte (%s)", async (locale) => {
    const page = await pageRendue(locale);
    // « Lire l'article » ouvre aussi « Lire l'article en anglais » : il commence tout lien principal
    const invitation = MESSAGES[locale].press.read;
    for (const carte of page.querySelectorAll("main article")) {
      const etires = [...carte.querySelectorAll("a")].filter((a) => {
        const classes = (a.getAttribute("class") ?? "").split(/\s+/);
        return classes.includes("after:absolute") && classes.includes("after:inset-0");
      });
      if (carte.querySelector("a") === null) {
        expect(etires).toHaveLength(0);
        continue;
      }
      expect(carte.getAttribute("class")?.split(/\s+/)).toContain("relative");
      expect(etires).toHaveLength(1);
      expect(texteLu(etires[0]).startsWith(invitation)).toBe(true);
    }
  });

  it.each(LANGUES_DU_SITE)("donne à chaque autre langue une cible de 24 pixels bordée d'une marge hors du lien étiré (%s)", async (locale) => {
    const page = await pageRendue(locale);
    const liens = [...page.querySelectorAll("main article a")].filter((a) => !classesDe(a).includes("after:absolute"));
    // QCEG MAG paraît en trois langues : chaque page en propose deux autres que celle de son lien principal
    expect(liens.map(texteLu)).toHaveLength(2);
    for (const lien of liens) {
      expect(classesDe(lien)).toEqual(expect.arrayContaining(["inline-flex", "min-h-6", "min-w-6"]));
      const rangee = classesDe(lien.parentElement);
      expect(rangee).toEqual(expect.arrayContaining(["relative", "z-10"]));
      expect(margeInterieure(rangee, "t")).toBeGreaterThanOrEqual(12);
      expect(margeInterieure(rangee, "b")).toBeGreaterThanOrEqual(12);
    }
  });

  it.each(LANGUES_DU_SITE)("écrit le nom du média dans la couleur du texte, à 12 pixels au moins (%s)", async (locale) => {
    const page = await pageRendue(locale);
    const medias = [...page.querySelectorAll("main article")].map((carte) => carte.querySelector("p"));
    expect(medias.map(texteLu)).toEqual(ARTICLES_PRESSE.map((a) => a.media));
    for (const media of medias) {
      const classes = (media?.getAttribute("class") ?? "").split(/\s+/);
      expect(classes).toContain("text-muted-foreground");
      expect(classes.filter((c) => /(^|:)text-primary$/.test(c))).toEqual([]);
      const tailles = classes.map(taillePolice).filter((t): t is number => t !== null);
      expect(tailles.length).toBeGreaterThan(0);
      expect(Math.min(...tailles)).toBeGreaterThanOrEqual(12);
    }
  });

  it.each(LANGUES_DU_SITE)("rend chaque toile avec le filtre de couleur du site (%s)", async (locale) => {
    const page = await pageRendue(locale);
    const toiles = [...page.querySelectorAll("main article img")];
    expect(toiles).toHaveLength(ARTICLES_PRESSE.length);
    for (const toile of toiles) {
      const declarations = (toile.getAttribute("style") ?? "").split(";").map((d) => d.split(":"));
      const filtre = declarations.find(([propriete]) => propriete.trim() === "filter");
      expect(filtre?.slice(1).join(":").trim()).toBe(FILTRE_TOILE);
    }
  });
});

describe("détection de la partie obscène", () => {
  it("la reconnaît dans le titre entier comme dans l'adresse longue de l'article", () => {
    expect(contientLaPartieObscene("Au festival Wheels and Waves, à Biarritz, Guillaume Farré laisse sa trace de pneus")).toBe(true);
    expect(
      contientLaPartieObscene(
        "https://www.sudouest.fr/culture/au-festival-wheels-and-waves-a-biarritz-guillaume-farre-laisse-sa-trace-de-pneus-29339456.php",
      ),
    ).toBe(true);
    expect(contientLaPartieObscene("LAISSE SA TRACE DE PNEUS")).toBe(true);
  });

  it("se tait sur les phrases voisines du site", () => {
    expect(contientLaPartieObscene("Peintures sur toile — quand la Ferrari laisse sa trace.")).toBe(false);
    expect(contientLaPartieObscene("Au festival Wheels and Waves, à Biarritz")).toBe(false);
  });
});
