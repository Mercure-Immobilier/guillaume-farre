/**
 * Articles de presse consacrés à Guillaume Farré.
 *
 * Chaque entrée a été relevée sur la publication elle-même le 06/11/2026 :
 * - QCEG MAG : titre (og:title), auteur, date et premier paragraphe du corps, sur les pages
 *   anglaise, française et chinoise. La version italienne qu'annonce le magazine
 *   (qcegmag.com/it/articolo-arts-del-vivere-larte-di-lasciare-una-traccia-guillaume-farre.html)
 *   répondait 404 ce jour-là : elle n'est pas listée, la page italienne du site renvoie donc
 *   à la version anglaise, version par défaut du magazine. À ajouter dès qu'elle répondra ;
 * - Sud Ouest : auteur et date de la page de l'article, premier paragraphe relevé dans le
 *   navigateur (le site refuse les robots). Seule la première partie du titre est reprise,
 *   à la demande de Raoul le 06/11/2026 ;
 * - ENZO : numéro et pages d'après le fichier transmis par l'artiste
 *   (« 032ENZO_068_069_GUILLAUME_FARRE_YA », « ENZO_32_2026_04 ») ; parution papier, sans lien ni texte.
 *
 * Un extrait est une citation exacte : il se recopie sans retouche ni traduction, les guillemets
 * étant posés à l'affichage. Chaque carte montre une toile de Guillaume, les photos de presse
 * restant la propriété de leurs photographes.
 *
 * Ajouter un article : une entrée ici, la date au format AAAA-MM ou AAAA-MM-JJ.
 */

export type LanguePresse = "fr" | "en" | "it" | "zh";

/** Nom de chaque langue dans la langue elle-même, pour les liens vers les autres versions */
export const NOM_DE_LA_LANGUE: Record<LanguePresse, string> = {
  fr: "Français",
  en: "English",
  it: "Italiano",
  zh: "中文",
};

/** Version servie quand l'article n'existe pas dans la langue de la page */
export const LANGUE_DE_REPLI: LanguePresse = "en";

export interface VersionPresse {
  langue: LanguePresse;
  url: string;
  titre: string;
  /** Premier paragraphe du corps de l'article, tel qu'il est publié ; null quand aucun texte n'a été relevé */
  extrait: string | null;
}

export interface ToilePresse {
  /** Toile de Guillaume qui illustre la carte */
  src: string;
  nom: string;
  largeur: number;
  hauteur: number;
}

export interface ArticlePresse {
  id: string;
  media: string;
  /** Numéro de la publication, quand l'article a paru sur papier */
  numero: string | null;
  /** AAAA-MM-JJ, ou AAAA-MM quand seul le mois de parution est connu */
  date: string;
  auteur: string | null;
  /** Pages de l'édition imprimée, quand l'article a paru sur papier */
  pages: string | null;
  toile: ToilePresse;
  /** Versions en ligne de l'article, une par langue */
  versions: VersionPresse[];
}

export const ARTICLES_PRESSE: ArticlePresse[] = [
  {
    id: "qceg-2026-10",
    media: "QCEG MAG",
    numero: null,
    date: "2026-10-22",
    auteur: "Dawa Ma",
    pages: null,
    toile: { src: "/images/toiles/19.jpg", nom: "Traces", largeur: 971, hauteur: 1950 },
    versions: [
      {
        langue: "en",
        url: "https://qcegmag.com/living-arts-article-the-art-of-leaving-a-trace-guillaume-farre.html",
        titre: "The Art of Leaving a Trace: The Automotive Art of Guillaume Farré",
        extrait:
          "What if the most meaningful part of a journey were not its destination, but the traces we leave behind? For French contemporary artist Guillaume Farré, this question lies at the heart of an artistic practice that brings together automotive heritage, abstract expression and a deeply personal exploration of the human experience.",
      },
      {
        langue: "fr",
        url: "https://qcegmag.com/fr/article-arts-de-vivre-lart-de-laisser-une-empreinte-guillaume-farre.html",
        titre: "L’Art de laisser une empreinte : l’art automobile de Guillaume Farré",
        extrait:
          "Et si la véritable richesse d’un voyage ne résidait pas dans sa destination, mais dans les traces que nous laissons derrière nous ? Pour l’artiste contemporain français Guillaume Farré, cette interrogation constitue le fil conducteur d’une démarche artistique où se rencontrent patrimoine automobile, expression abstraite et réflexion profondément personnelle sur la condition humaine.",
      },
      {
        langue: "zh",
        url: "https://qcegmag.com/zh/%E7%94%9F%E6%B4%BB%E8%89%BA%E6%9C%AF%E6%96%87%E7%AB%A0-%E7%95%99%E4%B8%8B%E7%97%95%E8%BF%B9%E7%9A%84%E8%89%BA%E6%9C%AF-guillaume-farre.html",
        titre: "留下痕迹的艺术：纪尧姆·法雷的汽车艺术",
        extrait:
          "如果一段旅程中最有意义的部分不是目的地，而是我们留下的痕迹，会怎样？对法国当代艺术家纪尧姆·法雷而言，这个问题正是他艺术实践的核心——它融合了汽车传承、抽象表现，以及对人类经验的深度个人探索。",
      },
    ],
  },
  {
    id: "sud-ouest-2026-06",
    media: "Sud Ouest",
    numero: null,
    date: "2026-06-06",
    auteur: "Stéphane Vacchiani",
    pages: null,
    toile: { src: "/images/toiles/8.jpg", nom: "Biarritz", largeur: 1153, hauteur: 1154 },
    versions: [
      {
        langue: "fr",
        url: "https://www.sudouest.fr/culture/au-festival-wheels-and-waves-a-biarritz-guillaume-farre-laisse-sa-trace-de-pneus-29339456.php",
        titre: "Au festival Wheels and Waves, à Biarritz",
        extrait:
          "Allongé sur sa toile posée au sol, Guillaume Farré donne l’impression de nager sur son œuvre. Bleu comme l’océan qui embrasse Biarritz – la ville de son garage-atelier –, le tableau de près de 6 mètres réunit « des méduses, ici un poisson ».",
      },
    ],
  },
  {
    id: "enzo-32",
    media: "ENZO",
    numero: "32",
    date: "2026-04",
    auteur: null,
    pages: "68-69",
    toile: { src: "/images/toiles/11.jpg", nom: "Cavalino", largeur: 978, hauteur: 1952 },
    versions: [],
  },
];

/** Articles du plus récent au plus ancien ; une date au mois se range au premier jour du mois. */
export function articlesParDate(articles: ArticlePresse[] = ARTICLES_PRESSE): ArticlePresse[] {
  const cle = (date: string) => (date.length === 7 ? `${date}-01` : date);
  return [...articles].sort((a, b) => cle(b.date).localeCompare(cle(a.date)));
}

/**
 * Version à ouvrir depuis une page du site : celle de sa langue, à défaut la version anglaise,
 * à défaut la seule publiée. Les autres versions deviennent des liens secondaires.
 */
export function versionsPourLangue(
  article: ArticlePresse,
  locale: string,
): { principale: VersionPresse | null; autres: VersionPresse[] } {
  const principale =
    article.versions.find((version) => version.langue === locale) ??
    article.versions.find((version) => version.langue === LANGUE_DE_REPLI) ??
    article.versions[0] ??
    null;
  return { principale, autres: article.versions.filter((version) => version !== principale) };
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
