import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createTranslator, type AbstractIntlMessages } from "next-intl";
import { describe, expect, it } from "vitest";
import { contenuDeCarte, LIEN_EXTERNE } from "@/components/presse/contenu";
import { construireLibelles, type TraduirePresse } from "@/components/presse/libelles";
import messagesEn from "@/messages/en.json";
import messagesFr from "@/messages/fr.json";
import messagesIt from "@/messages/it.json";
import {
  ARTICLES_PRESSE,
  articlesParDate,
  formaterDatePresse,
  versionsPourLangue,
  type ArticlePresse,
} from "../presse";
import { FILTRE_TOILE } from "../toiles-filter";

const LANGUES_DU_SITE = ["fr", "en", "it"] as const;
type LangueDuSite = (typeof LANGUES_DU_SITE)[number];
const MESSAGES: Record<LangueDuSite, AbstractIntlMessages> = { fr: messagesFr, en: messagesEn, it: messagesIt };
const racine = path.resolve(__dirname, "../..");

function article(id: string): ArticlePresse {
  const trouve = ARTICLES_PRESSE.find((a) => a.id === id);
  if (!trouve) throw new Error(`article ${id} absent de lib/presse.ts`);
  return trouve;
}

/** Contenu d'une carte tel que la page l'affiche, avec les vrais textes de la langue demandée */
function carte(id: string, locale: LangueDuSite) {
  // Le traducteur typé de next-intl n'accepte pas de clé calculée : il se lit ici comme celui de la page
  const t = createTranslator({ locale, messages: MESSAGES[locale], namespace: "press" }) as unknown as TraduirePresse;
  return contenuDeCarte(article(id), locale, construireLibelles(t));
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

  it.each(LANGUES_DU_SITE)("n'écrit aucun sous-titre sous le titre de la page %s", (locale) => {
    const press = MESSAGES[locale].press as AbstractIntlMessages;
    expect(press).not.toHaveProperty("intro");
  });
});

describe("QCEG MAG", () => {
  const qceg = article("qceg-2026-10");

  it.each(LANGUES_DU_SITE)("offre un extrait sur la page %s", (locale) => {
    const { principale } = versionsPourLangue(qceg, locale);
    expect(principale?.extrait?.length ?? 0).toBeGreaterThan(80);
    expect(carte(qceg.id, locale).citation?.texte).toContain(principale?.extrait ?? "∅");
  });

  it("ouvre depuis la page française la version française, les autres en liens secondaires", () => {
    const { lien, citation, autresLangues } = carte(qceg.id, "fr");
    expect(lien?.href).toBe("https://qcegmag.com/fr/article-arts-de-vivre-lart-de-laisser-une-empreinte-guillaume-farre.html");
    expect(lien?.texte).toBe("Lire l'article");
    expect(lien?.nomAccessible).toBe(
      "Lire l'article : L’Art de laisser une empreinte : l’art automobile de Guillaume Farré (s'ouvre dans un nouvel onglet)",
    );
    expect(citation?.langue).toBe("fr");
    expect(citation?.texte).toMatch(/^«\u00a0Et si la véritable richesse d’un voyage/);
    expect(citation?.texte).toMatch(/condition humaine\.\u00a0»$/);
    expect(autresLangues?.liens.map((l) => [l.langue, l.texte])).toEqual([
      ["en", "English"],
      ["zh", "中文"],
    ]);
  });

  it("ouvre depuis la page anglaise la version anglaise", () => {
    const { lien, citation, langueCitee } = carte(qceg.id, "en");
    expect(lien?.href).toBe("https://qcegmag.com/living-arts-article-the-art-of-leaving-a-trace-guillaume-farre.html");
    expect(lien?.texte).toBe("Read the article");
    expect(langueCitee).toBeNull();
    expect(citation?.texte).toMatch(/^“What if the most meaningful part of a journey were not its destination/);
  });

  it("renvoie la page italienne vers la version anglaise tant que le magazine n'en publie pas en italien", () => {
    expect(qceg.versions.some((v) => v.langue === "it")).toBe(false);
    const { lien, citation, langueCitee, autresLangues } = carte(qceg.id, "it");
    expect(lien?.langue).toBe("en");
    expect(lien?.texte).toBe("Leggi l'articolo in inglese");
    expect(langueCitee).toBe("en");
    expect(citation?.langue).toBe("en");
    expect(autresLangues?.liens.map((l) => l.langue)).toEqual(["fr", "zh"]);
  });
});

describe("Sud Ouest", () => {
  const sudOuest = article("sud-ouest-2026-06");

  it.each(LANGUES_DU_SITE)("affiche le titre réduit à sa première partie sur la page %s", (locale) => {
    const { titre, lien } = carte(sudOuest.id, locale);
    expect(titre).toBe("Au festival Wheels and Waves, à Biarritz");
    expect(`${titre} ${lien?.nomAccessible}`).not.toMatch(/pneus/);
  });

  it.each(LANGUES_DU_SITE)("cite le premier paragraphe en français sur la page %s", (locale) => {
    const { lien, citation, autresLangues } = carte(sudOuest.id, locale);
    expect(citation?.langue).toBe("fr");
    expect(citation?.texte).toMatch(/^«\u00a0Allongé sur sa toile posée au sol, Guillaume Farré/);
    expect(lien?.href).toContain("www.sudouest.fr/culture/");
    expect(autresLangues).toBeNull();
  });

  it("signale aux pages anglaise et italienne que l'article est en français", () => {
    expect(carte(sudOuest.id, "fr").lien?.texte).toBe("Lire l'article");
    expect(carte(sudOuest.id, "en").lien?.texte).toBe("Read the article in French");
    expect(carte(sudOuest.id, "it").lien?.texte).toBe("Leggi l'articolo in francese");
  });
});

describe("ENZO", () => {
  it("reste une mention imprimée, sans lien ni extrait", () => {
    const enzo = article("enzo-32");
    expect(enzo.versions).toEqual([]);
    const fr = carte(enzo.id, "fr");
    expect(fr.lien).toBeNull();
    expect(fr.citation).toBeNull();
    expect(fr.autresLangues).toBeNull();
    expect(fr.titre).toBe("Numéro 32");
    expect(fr.mentions).toEqual(["Édition imprimée, pages 68-69"]);
    expect(carte(enzo.id, "en").titre).toBe("Issue 32");
    expect(carte(enzo.id, "it").mentions).toEqual(["Edizione cartacea, pagine 68-69"]);
  });
});

describe("cartes", () => {
  it.each(LANGUES_DU_SITE)("trouvent tous leurs textes dans messages/%s.json", (locale) => {
    for (const a of ARTICLES_PRESSE) {
      const texte = JSON.stringify(carte(a.id, locale));
      expect(texte).not.toMatch(/press\./);
    }
  });

  it("ouvrent chaque article dans un nouvel onglet, sans transmettre la page d'origine", () => {
    expect(LIEN_EXTERNE.target).toBe("_blank");
    expect(LIEN_EXTERNE.rel.split(" ")).toContain("noopener");
  });

  it("décrivent la toile qui illustre l'article", () => {
    expect(carte("sud-ouest-2026-06", "fr").toile).toEqual({
      src: "/images/toiles/8.jpg",
      alt: "« Biarritz », toile de Guillaume Farré",
    });
    expect(carte("qceg-2026-10", "en").toile.alt).toBe("“Traces”, a canvas by Guillaume Farré");
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
