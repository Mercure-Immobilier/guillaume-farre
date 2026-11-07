/**
 * Pages légales : le texte français servi reste celui de la production, mot pour mot ; les versions anglaise et
 * italienne gardent la structure de la française (sections, blocs, listes, liens, passages en gras), toutes ses
 * références juridiques et ses coordonnées, puis disent en tête que la version française fait foi.
 *
 * Les témoins de lib/__tests__/temoins/pages-legales sont le texte de <main> relevé sur guillaumefarre.com le
 * 7 novembre 2026, avant la sortie des textes hors des pages, privé de l'en-tête du site.
 */
import fs from "node:fs";
import path from "node:path";
import { NextIntlClientProvider } from "next-intl";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import CGVPage, { generateMetadata as metaCgv } from "@/app/[locale]/cgv/page";
import MentionsLegalesPage, { generateMetadata as metaMentions } from "@/app/[locale]/mentions-legales/page";
import PolitiquePage, { generateMetadata as metaPolitique } from "@/app/[locale]/politique-de-confidentialite/page";
import RetoursPage, { generateMetadata as metaRetours } from "@/app/[locale]/retours-echanges/page";
import { CGV, MENTIONS_LEGALES, POLITIQUE_DE_CONFIDENTIALITE, RETOURS_ECHANGES, versionDe } from "@/lib/pages-legales";
import type { Bloc, DocumentLegal, Morceau, PageRetours, Texte } from "@/lib/pages-legales/types";

vi.mock("@/components/navigation/Navigation", () => ({
  default: () => createElement("nav", { "data-en-tete-du-site": "" }),
}));

type Page = (p: { params: Promise<{ locale: string }> }) => Promise<ReactElement>;
type Meta = (p: { params: Promise<{ locale: string }> }) => Promise<{ title?: unknown }>;

const PAGES: { nom: string; chemin: string; page: Page; meta: Meta }[] = [
  { nom: "cgv", chemin: "/cgv", page: CGVPage, meta: metaCgv },
  { nom: "mentions-legales", chemin: "/mentions-legales", page: MentionsLegalesPage, meta: metaMentions },
  { nom: "politique-de-confidentialite", chemin: "/politique-de-confidentialite", page: PolitiquePage, meta: metaPolitique },
  { nom: "retours-echanges", chemin: "/retours-echanges", page: RetoursPage, meta: metaRetours },
];
const TRADUCTIONS = ["en", "it"] as const;
const parametres = (locale: string) => ({ params: Promise.resolve({ locale }) });

/** Texte de <main> lu comme le relève texte-servi.py : chaque nœud de texte rogné, joints par une espace */
async function texteServi(page: Page, locale: string): Promise<string> {
  // Le Link de next-intl lit la langue dans le contexte que pose le gabarit du site
  const html = renderToStaticMarkup(createElement(NextIntlClientProvider, { locale, children: await page(parametres(locale)) }));
  const main = new DOMParser().parseFromString(html, "text/html").querySelector("main");
  if (!main) throw new Error("aucun élément main");
  const morceaux: string[] = [];
  const parcours = main.ownerDocument.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  for (let noeud = parcours.nextNode(); noeud; noeud = parcours.nextNode()) {
    const texte = (noeud.textContent ?? "").trim();
    if (texte) morceaux.push(texte);
  }
  return morceaux.join(" ").replace(/\s+/g, " ").trim();
}

const temoin = (nom: string) =>
  fs.readFileSync(path.join(__dirname, "temoins", "pages-legales", `fr-${nom}.txt`), "utf8").trim();

// Références juridiques, identifiants, codes postaux, adresses de sites et de courriel : identiques dans les trois langues
const INVARIANTS =
  /[LR]\d{3}-\d+|\b\d{5}\b|90\.03A|293 B|PCI|MEDICYS|OVH SAS|CNIL|gf_auth|[\w.]+@[\w.]+|https?:\/\/\S+|www\.[\w.]+/g;

/** Empreinte de structure d'un texte : nature de chaque morceau mis en forme, avec sa cible */
function formeDuTexte(texte: Texte): string[] {
  if (typeof texte === "string") return [];
  return texte.filter((m): m is Exclude<Morceau, string> => typeof m !== "string").map((m) => {
    if ("gras" in m) return "gras";
    if ("lien" in m) return `lien ${m.vers} ${m.langue ?? ""}`;
    if ("lienExterne" in m) return `externe ${m.vers}`;
    if ("courriel" in m) return `courriel ${m.courriel}`;
    return `code ${m.code}`;
  });
}

function formeDuBloc(bloc: Bloc): unknown {
  if ("paragraphe" in bloc) return { paragraphe: formeDuTexte(bloc.paragraphe) };
  if ("lignes" in bloc) return { lignes: bloc.lignes.map(formeDuTexte) };
  if ("liste" in bloc) return { liste: bloc.liste.map(formeDuTexte) };
  return { encadre: bloc.encadre.lignes.map(formeDuTexte) };
}

const formeDuDocument = (d: DocumentLegal) => d.sections.map((s) => s.blocs.map(formeDuBloc));
const formeDesRetours = (p: PageRetours) => ({
  delai: formeDuTexte(p.delai.texte),
  conditions: p.conditions.points.map(formeDuTexte),
  etapes: p.procedure.etapes.map((e) => formeDuTexte(e.texte)),
  exceptions: p.exceptions.points.map(formeDuTexte),
  garantie: formeDuTexte(p.garantie.texte),
});

describe("pages légales en français", () => {
  for (const { nom, page } of PAGES) {
    it(`${nom} : le texte servi est celui de la production, mot pour mot`, async () => {
      expect(await texteServi(page, "fr")).toBe(temoin(nom));
    });
  }

  it("témoin : un mot changé dans le texte français fait diverger le relevé", async () => {
    const original = CGV.fr.sections[0].titre;
    (CGV.fr.sections[0] as { titre: string }).titre = "1. Informations legales";
    try {
      expect(await texteServi(CGVPage, "fr")).not.toBe(temoin("cgv"));
    } finally {
      (CGV.fr.sections[0] as { titre: string }).titre = original;
    }
    expect(await texteServi(CGVPage, "fr")).toBe(temoin("cgv"));
  });
});

describe("pages légales traduites", () => {
  for (const { nom, chemin, page } of PAGES) {
    for (const langue of TRADUCTIONS) {
      it(`${nom} en ${langue} : servie dans sa langue, avec toutes les références de la version française`, async () => {
        const francais = await texteServi(page, "fr");
        const traduit = await texteServi(page, langue);
        expect(traduit).not.toContain(temoin(nom).slice(0, 40));
        const absents = [...new Set(francais.match(INVARIANTS) ?? [])].filter((ref) => !traduit.includes(ref));
        expect(absents).toEqual([]);
      });

      it(`${nom} en ${langue} : la phrase de tête renvoie à la version française, qui fait foi`, () => {
        const versions = nom === "retours-echanges" ? RETOURS_ECHANGES : { cgv: CGV, "mentions-legales": MENTIONS_LEGALES, "politique-de-confidentialite": POLITIQUE_DE_CONFIDENTIALITE }[nom];
        const avertissement = versions?.[langue].avertissement;
        expect(avertissement && formeDuTexte(avertissement)).toEqual([`lien ${chemin} fr`]);
        expect(versions?.fr.avertissement).toBeUndefined();
      });
    }
  }

  for (const [nom, versions] of Object.entries({ cgv: CGV, "mentions-legales": MENTIONS_LEGALES, "politique-de-confidentialite": POLITIQUE_DE_CONFIDENTIALITE })) {
    it(`${nom} : anglais et italien gardent les sections, blocs, listes, liens et gras du français`, () => {
      for (const langue of TRADUCTIONS) expect(formeDuDocument(versions[langue])).toEqual(formeDuDocument(versions.fr));
    });
  }

  it("retours-echanges : anglais et italien gardent les cartes, étapes, liens et gras du français", () => {
    for (const langue of TRADUCTIONS) expect(formeDesRetours(RETOURS_ECHANGES[langue])).toEqual(formeDesRetours(RETOURS_ECHANGES.fr));
  });
});

describe("titre de l'onglet", () => {
  for (const { nom, meta } of PAGES) {
    it(`${nom} : suit la langue de la page`, async () => {
      const titres = await Promise.all(["fr", "en", "it"].map(async (l) => (await meta(parametres(l))).title));
      expect(new Set(titres).size).toBe(3);
      expect(titres.every((t) => typeof t === "string" && t.length > 0)).toBe(true);
    });
  }

  it("une langue que le site ne sert pas reçoit la version française", () => {
    expect(versionDe(CGV, "de")).toBe(CGV.fr);
  });
});
