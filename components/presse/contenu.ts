import {
  formaterDatePresse,
  NOM_DE_LA_LANGUE,
  versionsPourLangue,
  type ArticlePresse,
  type LanguePresse,
} from "@/lib/presse";
import type { LibellesPresse } from "./libelles";

/** Guillemets posés autour d'un extrait, dans l'usage de la langue citée */
const GUILLEMETS: Record<LanguePresse, [string, string]> = {
  fr: ["«\u00a0", "\u00a0»"],
  it: ["«", "»"],
  en: ["“", "”"],
  zh: ["“", "”"],
};

/**
 * Espaces insécables de la typographie française, posées à l'affichage pour qu'aucune ligne ne
 * commence par « ? » ou « » » : seule la nature des espaces change, le texte relevé reste intact.
 */
export function insecables(langue: LanguePresse, texte: string): string {
  if (langue !== "fr") return texte;
  return texte
    .replace(/ ([?!:;»])/g, "\u00a0$1")
    .replace(/« /g, "«\u00a0")
    .replace(/ ([–—])(?=[,.;:)])/g, "\u00a0$1")
    .replace(/([–—]) (?=\p{L})/gu, "$1\u00a0");
}

/** Tout lien de la page ouvre le magazine dans un nouvel onglet, sans lui transmettre la page d'origine */
export const LIEN_EXTERNE = { target: "_blank", rel: "noopener noreferrer" } as const;

export interface LienVersion {
  href: string;
  langue: LanguePresse;
  /** Texte visible du lien */
  texte: string;
  /** Nom lu par les lecteurs d'écran */
  nomAccessible: string;
}

/** Contenu affiché par une carte, calculé pour la langue de la page */
export interface ContenuCarte {
  media: string;
  titre: string;
  /** Langue du titre et de l'extrait quand elle diffère de celle de la page */
  langueCitee: LanguePresse | null;
  citation: { langue: LanguePresse; texte: string; source: string } | null;
  dateIso: string;
  dateLisible: string;
  /** Auteur, puis pages imprimées, déjà rédigés */
  mentions: string[];
  /** Lien qui couvre la carte ; absent pour une parution seulement imprimée */
  lien: LienVersion | null;
  /** Versions de l'article dans les autres langues ; absent quand il n'en existe qu'une */
  autresLangues: { libelle: string; liens: LienVersion[] } | null;
  toile: { src: string; alt: string };
}

export function contenuDeCarte(article: ArticlePresse, locale: string, libelles: LibellesPresse): ContenuCarte {
  const { principale, autres } = versionsPourLangue(article, locale);
  const titre = principale
    ? insecables(principale.langue, principale.titre)
    : article.numero
      ? libelles.numero(article.numero)
      : article.media;
  const invitation = principale?.langue === locale ? libelles.lire : principale ? libelles.lireEn(principale.langue) : "";
  const [ouvrant, fermant] = principale ? GUILLEMETS[principale.langue] : ["", ""];

  return {
    media: article.media,
    titre,
    langueCitee: principale && principale.langue !== locale ? principale.langue : null,
    citation:
      principale?.extrait != null
        ? {
            langue: principale.langue,
            texte: `${ouvrant}${insecables(principale.langue, principale.extrait)}${fermant}`,
            source: principale.url,
          }
        : null,
    dateIso: article.date,
    dateLisible: formaterDatePresse(article.date, locale),
    mentions: [
      article.auteur ? libelles.par(article.auteur) : null,
      article.pages ? `${libelles.imprime}, ${libelles.pages(article.pages)}` : null,
    ].filter((mention): mention is string => mention !== null),
    lien: principale
      ? {
          href: principale.url,
          langue: principale.langue,
          texte: invitation,
          nomAccessible: libelles.nomDuLien(invitation, titre),
        }
      : null,
    autresLangues:
      autres.length > 0
        ? {
            libelle: libelles.autresLangues,
            liens: autres.map((version) => ({
              href: version.url,
              langue: version.langue,
              texte: NOM_DE_LA_LANGUE[version.langue],
              nomAccessible: `${NOM_DE_LA_LANGUE[version.langue]} (${libelles.nouvelOnglet})`,
            })),
          }
        : null,
    toile: { src: article.toile.src, alt: libelles.altToile(article.toile.nom) },
  };
}
