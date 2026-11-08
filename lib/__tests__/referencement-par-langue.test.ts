/**
 * Référencement par langue : chaque adresse du plan du site, dans chacune des trois langues, déclare pour canonical sa
 * propre adresse de production avec ses versions linguistiques, puis des métadonnées dans sa langue : titre,
 * descriptions, cartes de partage, og:locale.
 *
 * Les métadonnées se lisent comme Next les rend : celles du gabarit app/[locale]/layout.tsx, dont la page remplace
 * chaque clé qu'elle déclare. Jusqu'au 8 novembre 2026 le gabarit portait le canonical de la racine, que 72 adresses
 * sur 75 héritaient : Google les tenait pour des doublons de l'accueil.
 */
import type { Metadata } from "next";
import type { AbstractIntlMessages } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import { generateMetadata as metaGabarit } from "@/app/[locale]/layout";
import { generateMetadata as metaAccueil } from "@/app/[locale]/page";
import { generateMetadata as metaCgv } from "@/app/[locale]/cgv/page";
import { generateMetadata as metaContact } from "@/app/[locale]/contact/page";
import { generateMetadata as metaGalerie } from "@/app/[locale]/galerie/page";
import { generateMetadata as metaFiche } from "@/app/[locale]/galerie-item/[slug]/page";
import { generateMetadata as metaMentions } from "@/app/[locale]/mentions-legales/page";
import { generateMetadata as metaPolitique } from "@/app/[locale]/politique-de-confidentialite/page";
import { generateMetadata as metaPresse } from "@/app/[locale]/presse/page";
import { generateMetadata as metaRetours } from "@/app/[locale]/retours-echanges/page";
import { generateMetadata as metaToiles } from "@/app/[locale]/toiles/page";
import sitemap from "@/app/sitemap";

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

// Seules les métadonnées comptent ici : les composants que les pages et le gabarit importent ne se rendent pas
const RIEN = vi.hoisted(() => ({ default: () => null }));
vi.mock("@/components/ClientShell", () => RIEN);
vi.mock("@/components/Footer", () => RIEN);
vi.mock("@/components/StructuredData", () => RIEN);
vi.mock("@/components/admin/AdminWrapper", () => RIEN);
vi.mock("@/components/navigation/Navigation", () => RIEN);
vi.mock("@/components/HeroCarousel", () => RIEN);
vi.mock("@/components/early-access/EarlyAccessCountdown", () => RIEN);
vi.mock("@/components/landing/LandingSection", () => RIEN);
vi.mock("@/components/animations/ScrollReveal", () => RIEN);

const ORIGINE_DE_PRODUCTION = "https://guillaumefarre.com";
const LANGUES = ["fr", "en", "it"] as const;

type Generateur = (parametres: { params: Promise<{ locale: string }> }) => Promise<Metadata>;

/** Page qui sert chaque chemin du plan du site, les fiches d'œuvres à part */
const PAGES: Record<string, Generateur> = {
  "": metaAccueil,
  "/galerie": metaGalerie,
  "/toiles": metaToiles,
  "/contact": metaContact,
  "/presse": metaPresse,
  "/cgv": metaCgv,
  "/mentions-legales": metaMentions,
  "/politique-de-confidentialite": metaPolitique,
  "/retours-echanges": metaRetours,
};

interface Adresse {
  adresse: string;
  langue: string;
  chemin: string;
}

function decomposer(adresse: string): Adresse {
  const [, langue = "", ...reste] = new URL(adresse).pathname.split("/");
  return { adresse, langue, chemin: reste.length > 0 ? `/${reste.join("/")}` : "" };
}

/** Métadonnées que Next rend pour une adresse : celles du gabarit, dont la page remplace chaque clé qu'elle déclare */
async function metadonneesDe({ adresse, langue, chemin }: Adresse): Promise<Metadata> {
  const fiche = /^\/galerie-item\/([^/]+)$/.exec(chemin);
  const generateur = PAGES[chemin];
  let page: Metadata;
  if (fiche) page = await metaFiche({ params: Promise.resolve({ locale: langue, slug: fiche[1] }) });
  else if (generateur) page = await generateur({ params: Promise.resolve({ locale: langue }) });
  else throw new Error(`aucune page connue ne sert ${adresse}`);
  return { ...(await metaGabarit({ params: Promise.resolve({ locale: langue }) })), ...page };
}

/** Adresse absolue d'une adresse de métadonnées, complétée comme Next le fait par le metadataBase */
function absolue(adresse: string | URL, metadonnees: Metadata): string {
  return new URL(String(adresse), metadonnees.metadataBase ?? undefined).href.replace(/\/$/, "");
}

function canonicalDe(metadonnees: Metadata): string | undefined {
  const canonical = metadonnees.alternates?.canonical;
  if (!canonical) return undefined;
  return absolue(typeof canonical === "string" || canonical instanceof URL ? canonical : canonical.url, metadonnees);
}

function versionsDe(metadonnees: Metadata): Record<string, string> {
  const versions = metadonnees.alternates?.languages ?? {};
  return Object.fromEntries(
    Object.entries(versions).flatMap(([code, adresse]) =>
      typeof adresse === "string" || adresse instanceof URL ? [[code, absolue(adresse, metadonnees)]] : [],
    ),
  );
}

/**
 * Mots qui n'existent qu'en français parmi les trois langues du site. L'italien partage « la », « le » ou « qui » avec
 * le français, l'anglais « on » ou « a » : ces mots restent hors de la liste, qui ne doit rien signaler à tort.
 */
const MOTS_FRANCAIS = [
  "les", "des", "du", "une", "et", "avec", "pour", "dans", "sur", "par", "aux", "votre", "vos", "nous", "vous",
  "cette", "ces", "leur", "leurs", "est", "sont", "découvrez", "créés", "créées", "tableaux", "toile", "toiles",
  "œuvre", "œuvres", "oeuvre", "oeuvres", "photographie", "photographies", "artistique", "univers", "tirage",
  "tirages", "numérotés", "signés", "série", "séries", "limitées", "édition", "éditions", "légales", "générales",
  "confidentialité", "rétractation", "échanges", "retours", "livraison", "commande", "paiement", "contactez",
];
// Bornes écrites en lettres Unicode : en JavaScript, \b ignore « œ » ou « é » en tête de mot
const MOT_FRANCAIS = new RegExp(`(?<![\\p{L}\\p{N}])(${MOTS_FRANCAIS.join("|")})(?![\\p{L}\\p{N}])`, "giu");

function motsFrancais(texte: string): string[] {
  return [...texte.matchAll(MOT_FRANCAIS)].map(([mot]) => mot);
}

interface CarteDePartage {
  title?: unknown;
  description?: unknown;
  locale?: unknown;
  alternateLocale?: unknown;
  images?: unknown;
}

function chaines(valeur: unknown): string[] {
  if (typeof valeur === "string") return [valeur];
  if (Array.isArray(valeur)) return valeur.flatMap(chaines);
  return [];
}

function textesDeCarte(carte: CarteDePartage | null | undefined): string[] {
  if (!carte) return [];
  const images = Array.isArray(carte.images) ? carte.images : [carte.images];
  const alternatifs = images.map((image) => (image && typeof image === "object" ? (image as { alt?: unknown }).alt : undefined));
  return [...chaines(carte.title), ...chaines(carte.description), ...chaines(alternatifs)];
}

/** Textes que les moteurs de recherche et les cartes de partage lisent : titre, descriptions, mots-clés, images */
function textesDe(metadonnees: Metadata): string[] {
  const titre = metadonnees.title;
  const titres =
    typeof titre === "string" ? [titre] : titre && typeof titre === "object" ? chaines(Object.values(titre)) : [];
  return [
    ...titres,
    ...chaines(metadonnees.description),
    ...chaines(metadonnees.keywords),
    ...textesDeCarte(metadonnees.openGraph as CarteDePartage),
    ...textesDeCarte(metadonnees.twitter as CarteDePartage),
  ];
}

const ADRESSES = (await sitemap()).map(({ url }) => decomposer(url));
const TRADUCTIONS = ADRESSES.filter(({ langue }) => langue !== "fr");
const LOCALES_OPEN_GRAPH: Record<string, string> = { fr: "fr_FR", en: "en_US", it: "it_IT" };

describe("plan du site", () => {
  it("témoin : il porte les neuf pages et les fiches d'œuvres, dans les trois langues, sur l'origine de production", () => {
    const chemins = new Set(ADRESSES.map(({ chemin }) => chemin));
    for (const chemin of Object.keys(PAGES)) expect(chemins.has(chemin)).toBe(true);
    const fiches = ADRESSES.filter(({ chemin }) => chemin.startsWith("/galerie-item/"));
    expect(fiches.length).toBeGreaterThan(0);
    for (const langue of LANGUES) {
      expect(ADRESSES.filter((a) => a.langue === langue)).toHaveLength(ADRESSES.length / LANGUES.length);
    }
    for (const { adresse } of ADRESSES) expect(new URL(adresse).origin).toBe(ORIGINE_DE_PRODUCTION);
  });

  it("chaque fiche d'œuvre qu'il annonce répond avec les métadonnées de son œuvre", async () => {
    const fiches = ADRESSES.filter(({ chemin }) => chemin.startsWith("/galerie-item/"));
    for (const fiche of fiches) {
      const slug = fiche.chemin.split("/").pop() ?? "";
      const page = await metaFiche({ params: Promise.resolve({ locale: fiche.langue, slug }) });
      expect(page.title, fiche.adresse).toBeTruthy();
    }
  });
});

describe("canonical", () => {
  it("témoin : la comparaison voit le canonical de la racine sur une page qui n'est pas l'accueil", () => {
    const metadonnees: Metadata = {
      metadataBase: new URL(ORIGINE_DE_PRODUCTION),
      alternates: { canonical: ORIGINE_DE_PRODUCTION },
    };
    expect(canonicalDe(metadonnees)).not.toBe(`${ORIGINE_DE_PRODUCTION}/fr/galerie`);
    expect(canonicalDe({ ...metadonnees, alternates: { canonical: "/fr/galerie" } })).toBe(
      `${ORIGINE_DE_PRODUCTION}/fr/galerie`,
    );
  });

  it.each(ADRESSES)("$adresse déclare sa propre adresse pour canonical", async (adresse) => {
    expect(canonicalDe(await metadonneesDe(adresse))).toBe(adresse.adresse);
  });
});

describe("versions linguistiques", () => {
  it.each(ADRESSES)("$adresse déclare la même page dans chaque langue, x-default compris", async (adresse) => {
    const versions = versionsDe(await metadonneesDe(adresse));
    const page = (langue: string) => `${ORIGINE_DE_PRODUCTION}/${langue}${adresse.chemin}`;
    expect(versions).toEqual({ fr: page("fr"), en: page("en"), it: page("it"), "x-default": page("fr") });
  });
});

describe("langue des métadonnées", () => {
  it("témoin : le relevé des mots français voit le texte que portaient les pages anglaises et italiennes", () => {
    const ancien =
      "Découvrez l'univers artistique unique de Guillaume Farré : tableaux abstraits créés par le passage direct de la " +
      "Dino sur toile, photographies d'art en séries limitées.";
    expect(motsFrancais(ancien)).toEqual(
      expect.arrayContaining(["Découvrez", "univers", "artistique", "tableaux", "créés", "photographies", "séries"]),
    );
    expect(motsFrancais("Œuvres et échanges")).toEqual(["Œuvres", "et", "échanges"]);
    expect(motsFrancais("Guillaume Farré — Canvases and Photographs, la serie delle tele")).toEqual([]);
    expect(textesDe({ title: "Contact", openGraph: { title: "Toiles", images: [{ url: "/i.jpg", alt: "œuvre" }] } })).toEqual(
      ["Contact", "Toiles", "œuvre"],
    );
  });

  it.each(TRADUCTIONS)("$adresse ne porte aucun mot français", async (adresse) => {
    const textes = textesDe(await metadonneesDe(adresse));
    expect(textes.length).toBeGreaterThanOrEqual(6);
    expect(textes.flatMap((texte) => motsFrancais(texte).map((mot) => `${mot} ← ${texte}`))).toEqual([]);
  });

  it.each(ADRESSES)("$adresse déclare la langue de sa carte de partage", async (adresse) => {
    const carte = (await metadonneesDe(adresse)).openGraph as CarteDePartage;
    expect(carte.locale).toBe(LOCALES_OPEN_GRAPH[adresse.langue]);
    expect(carte.alternateLocale).toEqual(
      LANGUES.filter((langue) => langue !== adresse.langue).map((langue) => LOCALES_OPEN_GRAPH[langue]),
    );
  });

  it.each(ADRESSES)("$adresse dit la même chose dans ses trois descriptions", async (adresse) => {
    const metadonnees = await metadonneesDe(adresse);
    const carte = metadonnees.openGraph as CarteDePartage;
    const twitter = metadonnees.twitter as CarteDePartage;
    expect(typeof metadonnees.description === "string" && metadonnees.description.length > 0).toBe(true);
    expect(typeof carte.description === "string" && carte.description.length > 0).toBe(true);
    expect(twitter.description).toBe(carte.description);
    expect(twitter.title).toBe(carte.title);
  });
});
