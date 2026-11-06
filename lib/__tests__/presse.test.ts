import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  ARTICLES_PRESSE,
  articlesParDate,
  formaterDatePresse,
  versionsPourLangue,
  type ArticlePresse,
} from "../presse";
import { FILTRE_TOILE } from "../toiles-filter";

const LANGUES_DU_SITE = ["fr", "en", "it"] as const;
const racine = path.resolve(__dirname, "../..");

function article(id: string): ArticlePresse {
  const trouve = ARTICLES_PRESSE.find((a) => a.id === id);
  if (!trouve) throw new Error(`article ${id} absent de lib/presse.ts`);
  return trouve;
}

describe("articles de presse", () => {
  it("porte des identifiants uniques et des dates au format AAAA-MM ou AAAA-MM-JJ", () => {
    const ids = ARTICLES_PRESSE.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const a of ARTICLES_PRESSE) {
      expect(a.date).toMatch(/^\d{4}-\d{2}(-\d{2})?$/);
    }
  });

  it("donne à chaque article un lien en https ou, à défaut, ses pages imprimées", () => {
    for (const a of ARTICLES_PRESSE) {
      for (const version of a.versions) {
        expect(new URL(version.url).protocol).toBe("https:");
      }
      expect(a.versions.length > 0 || a.pages !== null).toBe(true);
    }
  });

  it("illustre chaque article par une toile présente dans public/images/toiles", () => {
    for (const a of ARTICLES_PRESSE) {
      expect(a.toile.src).toMatch(/^\/images\/toiles\/[\w-]+\.jpg$/);
      expect(existsSync(path.join(racine, "public", a.toile.src))).toBe(true);
    }
    expect(ARTICLES_PRESSE.map((a) => a.toile.nom)).toEqual(["Traces", "Biarritz", "Cavalino"]);
  });

  it("garde les extraits tels que publiés, les guillemets restant à l'affichage", () => {
    for (const a of ARTICLES_PRESSE) {
      for (const version of a.versions) {
        if (version.extrait === null) continue;
        expect(version.extrait).toBe(version.extrait.trim());
        expect(version.extrait).not.toMatch(/^[«“"]/);
      }
    }
  });
});

describe("QCEG MAG", () => {
  const qceg = article("qceg-2026-10");

  it.each(LANGUES_DU_SITE)("offre un extrait sur la page %s", (locale) => {
    const { principale } = versionsPourLangue(qceg, locale);
    expect(principale?.extrait?.length ?? 0).toBeGreaterThan(80);
  });

  it("ouvre la version de la langue de la page, les autres en liens secondaires", () => {
    const fr = versionsPourLangue(qceg, "fr");
    expect(fr.principale?.langue).toBe("fr");
    expect(fr.principale?.url).toContain("qcegmag.com/fr/");
    expect(fr.principale?.extrait).toMatch(/^Et si la véritable richesse d’un voyage/);
    expect(fr.autres.map((v) => v.langue)).toEqual(["en", "zh"]);

    const en = versionsPourLangue(qceg, "en");
    expect(en.principale?.langue).toBe("en");
    expect(en.principale?.extrait).toMatch(/^What if the most meaningful part of a journey were not its destination/);
    expect(en.autres.map((v) => v.langue)).toEqual(["fr", "zh"]);
  });

  it("renvoie la page italienne vers la version anglaise tant que le magazine n'en publie pas en italien", () => {
    const it_ = versionsPourLangue(qceg, "it");
    expect(qceg.versions.some((v) => v.langue === "it")).toBe(false);
    expect(it_.principale?.langue).toBe("en");
    expect(it_.autres.map((v) => v.langue)).toEqual(["fr", "zh"]);
  });
});

describe("Sud Ouest", () => {
  const sudOuest = article("sud-ouest-2026-06");

  it("n'affiche que la première partie du titre", () => {
    expect(sudOuest.versions[0].titre).toBe("Au festival Wheels and Waves, à Biarritz");
    expect(sudOuest.versions[0].titre).not.toMatch(/pneus/);
  });

  it.each(LANGUES_DU_SITE)("cite le premier paragraphe en français sur la page %s", (locale) => {
    const { principale, autres } = versionsPourLangue(sudOuest, locale);
    expect(principale?.langue).toBe("fr");
    expect(principale?.extrait).toMatch(/^Allongé sur sa toile posée au sol, Guillaume Farré/);
    expect(autres).toEqual([]);
  });
});

describe("ENZO", () => {
  it("reste une mention imprimée, sans lien ni extrait", () => {
    const enzo = article("enzo-32");
    expect(enzo.versions).toEqual([]);
    expect(enzo.pages).toBe("68-69");
    expect(versionsPourLangue(enzo, "fr").principale).toBeNull();
  });
});

describe("rangement et dates", () => {
  it("range du plus récent au plus ancien, une date au mois valant le premier du mois", () => {
    const toile = { src: "/images/toiles/1.jpg", nom: "Essai", largeur: 1, hauteur: 1 };
    const base = { media: "M", numero: null, auteur: null, pages: "1", toile, versions: [] };
    const essai: ArticlePresse[] = [
      { ...base, id: "a", date: "2026-04" },
      { ...base, id: "b", date: "2026-10-22" },
      { ...base, id: "c", date: "2026-04-02" },
    ];
    expect(articlesParDate(essai).map((a) => a.id)).toEqual(["b", "c", "a"]);
    expect(essai.map((a) => a.id)).toEqual(["a", "b", "c"]);
    expect(articlesParDate()[0].id).toBe("qceg-2026-10");
  });

  it("écrit la date avec le jour quand il est connu, le mois seul sinon", () => {
    expect(formaterDatePresse("2026-10-22", "fr")).toBe("22 octobre 2026");
    expect(formaterDatePresse("2026-04", "fr")).toBe("avril 2026");
    expect(formaterDatePresse("2026-06-06", "en")).toBe("June 6, 2026");
    expect(formaterDatePresse("2026-10-22", "it")).toBe("22 ottobre 2026");
  });
});

describe("filtre des toiles", () => {
  it.each(["components/AmericanFrame.tsx", "components/toiles/ToileLightbox.tsx"])(
    "reste celui que %s applique",
    (fichier) => {
      const source = readFileSync(path.join(racine, fichier), "utf8");
      const filtres = [...source.matchAll(/filter:\s*'((?:saturate|contrast|brightness)[^']*)'/g)].map((m) => m[1]);
      expect(filtres.length).toBeGreaterThan(0);
      for (const filtre of filtres) expect(filtre).toBe(FILTRE_TOILE);
    },
  );
});
