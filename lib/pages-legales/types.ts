import type { routing } from "@/i18n/routing";

/**
 * Textes des pages légales, rangés par langue hors des composants qui les présentent.
 *
 * Un texte est une suite de morceaux : texte simple, passage en gras, lien vers une page du site, lien externe,
 * adresse électronique ou code. Une simple chaîne vaut un seul morceau de texte simple. Les composants de
 * components/pages-legales reproduisent le balisage que portaient les pages avant que leurs textes en sortent.
 */

export type Langue = (typeof routing.locales)[number];

export type Morceau =
  | string
  | { gras: string }
  /** Page du site ; langue donnée quand le lien mène à une autre version que celle de la page */
  | { lien: string; vers: string; langue?: Langue }
  | { lienExterne: string; vers: string }
  | { courriel: string }
  | { code: string };

export type Texte = string | readonly Morceau[];

export type Bloc =
  | { paragraphe: Texte }
  /** Lignes d'un même paragraphe, séparées par un retour à la ligne (adresses, coordonnées) */
  | { lignes: readonly Texte[] }
  | { liste: readonly Texte[] }
  /** Encadré titré, celui du formulaire type de rétractation */
  | { encadre: { titre: string; lignes: readonly Texte[] } };

export interface Section {
  titre: string;
  blocs: readonly Bloc[];
}

export interface DocumentLegal {
  /** Titre de la page, repris par l'onglet */
  titre: string;
  /** Description de la page pour les moteurs de recherche puis les cartes de partage, dans la langue de la version */
  description: string;
  /** Versions anglaise et italienne : phrase de tête disant que la version française fait foi */
  avertissement?: Texte;
  sections: readonly Section[];
  miseAJour: { libelle: string; date: string };
}

/** Page Retours et échanges, présentée en cartes : délai, conditions, étapes, exceptions, garantie, contact */
export interface PageRetours {
  titre: string;
  /** Description de la page pour les moteurs de recherche puis les cartes de partage, dans la langue de la version */
  description: string;
  avertissement?: Texte;
  delai: { titre: string; texte: Texte };
  conditions: { titre: string; points: readonly Texte[] };
  procedure: { titre: string; etapes: readonly { titre: string; texte: Texte }[] };
  exceptions: { titre: string; points: readonly Texte[] };
  garantie: { titre: string; texte: Texte; precision: string };
  contact: { titre: string; texte: string; ecrire: string; faq: string };
}

export type Versions<T> = Readonly<Record<Langue, T>>;
