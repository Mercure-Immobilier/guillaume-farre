import { describe, expect, it } from "vitest";
import { ARTICLES_PRESSE, articlesParDate, formaterDatePresse, type ArticlePresse } from "../presse";

describe("articles de presse", () => {
  it("porte des identifiants uniques et des dates au format AAAA-MM ou AAAA-MM-JJ", () => {
    const ids = ARTICLES_PRESSE.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const article of ARTICLES_PRESSE) {
      expect(article.date).toMatch(/^\d{4}-\d{2}(-\d{2})?$/);
    }
  });

  it("donne à chaque article un lien en https ou, à défaut, ses pages imprimées", () => {
    for (const article of ARTICLES_PRESSE) {
      for (const lien of article.liens) {
        expect(new URL(lien.url).protocol).toBe("https:");
      }
      expect(article.liens.length > 0 || article.pages !== null).toBe(true);
    }
  });

  it("range du plus récent au plus ancien, une date au mois valant le premier du mois", () => {
    const essai: ArticlePresse[] = [
      { id: "a", media: "A", date: "2026-04", titre: null, auteur: null, pages: "1", liens: [] },
      { id: "b", media: "B", date: "2026-10-22", titre: null, auteur: null, pages: "1", liens: [] },
      { id: "c", media: "C", date: "2026-04-02", titre: null, auteur: null, pages: "1", liens: [] },
    ];
    expect(articlesParDate(essai).map((a) => a.id)).toEqual(["b", "c", "a"]);
    expect(essai.map((a) => a.id)).toEqual(["a", "b", "c"]);
  });

  it("écrit la date avec le jour quand il est connu, le mois seul sinon", () => {
    expect(formaterDatePresse("2026-10-22", "fr")).toBe("22 octobre 2026");
    expect(formaterDatePresse("2026-04", "fr")).toBe("avril 2026");
    expect(formaterDatePresse("2026-06-06", "en")).toBe("June 6, 2026");
  });
});
