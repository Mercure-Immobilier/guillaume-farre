/**
 * Articles de presse consacrés à Guillaume Farré.
 *
 * Chaque entrée a été relevée sur la publication elle-même le 06/11/2026 :
 * - QCEG MAG : métadonnées de la page anglaise (titre, auteur, date) ;
 * - Sud Ouest : titre, auteur et date de la page de l'article ;
 * - ENZO : numéro et pages d'après le fichier transmis par l'artiste
 *   (« 032ENZO_068_069_GUILLAUME_FARRE_YA », « ENZO_32_2026_04 ») ; parution papier, sans lien.
 *
 * Ajouter un article : une entrée ici, la date au format AAAA-MM ou AAAA-MM-JJ.
 */

export type LanguePresse = "fr" | "en" | "zh";

export interface LienPresse {
  langue: LanguePresse;
  url: string;
}

export interface ArticlePresse {
  id: string;
  media: string;
  /** AAAA-MM-JJ, ou AAAA-MM quand seul le mois de parution est connu */
  date: string;
  titre: string | null;
  auteur: string | null;
  /** Pages de l'édition imprimée, quand l'article a paru sur papier */
  pages: string | null;
  liens: LienPresse[];
}

export const ARTICLES_PRESSE: ArticlePresse[] = [
  {
    id: "qceg-2026-10",
    media: "QCEG MAG",
    date: "2026-10-22",
    titre: "The Art of Leaving a Trace: The Automotive Art of Guillaume Farré",
    auteur: "Dawa Ma",
    pages: null,
    liens: [
      { langue: "en", url: "https://qcegmag.com/living-arts-article-the-art-of-leaving-a-trace-guillaume-farre.html" },
      {
        langue: "zh",
        url: "https://qcegmag.com/zh/%E7%94%9F%E6%B4%BB%E8%89%BA%E6%9C%AF%E6%96%87%E7%AB%A0-%E7%95%99%E4%B8%8B%E7%97%95%E8%BF%B9%E7%9A%84%E8%89%BA%E6%9C%AF-guillaume-farre.html",
      },
    ],
  },
  {
    id: "sud-ouest-2026-06",
    media: "Sud Ouest",
    date: "2026-06-06",
    titre: "Au festival Wheels and Waves, à Biarritz, Guillaume Farré laisse sa trace de pneus",
    auteur: "Stéphane Vacchiani",
    pages: null,
    liens: [
      {
        langue: "fr",
        url: "https://www.sudouest.fr/culture/au-festival-wheels-and-waves-a-biarritz-guillaume-farre-laisse-sa-trace-de-pneus-29339456.php",
      },
    ],
  },
  {
    id: "enzo-32",
    media: "ENZO, n° 32",
    date: "2026-04",
    titre: null,
    auteur: null,
    pages: "68-69",
    liens: [],
  },
];

/** Articles du plus récent au plus ancien ; une date au mois se range au premier jour du mois. */
export function articlesParDate(articles: ArticlePresse[] = ARTICLES_PRESSE): ArticlePresse[] {
  const cle = (date: string) => (date.length === 7 ? `${date}-01` : date);
  return [...articles].sort((a, b) => cle(b.date).localeCompare(cle(a.date)));
}

/** Date lisible dans la langue de la page : jour connu → « 22 octobre 2026 », mois seul → « avril 2026 ». */
export function formaterDatePresse(date: string, locale: string): string {
  const [annee, mois, jour] = date.split("-").map(Number);
  const valeur = new Date(Date.UTC(annee, mois - 1, jour || 1));
  const options: Intl.DateTimeFormatOptions = jour
    ? { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
    : { month: "long", year: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat(locale, options).format(valeur);
}
