import type { LanguePresse } from "@/lib/presse";

/** Textes de la page Presse, résolus côté serveur dans la langue de la page */
export interface LibellesPresse {
  /** « Lire l'article » quand l'article existe dans la langue de la page */
  lire: string;
  /** « Lire l'article en anglais » quand la page renvoie à une autre langue */
  lireEn: (langue: LanguePresse) => string;
  /** Nom accessible du lien principal : invitation, titre, ouverture dans un nouvel onglet */
  nomDuLien: (invitation: string, titre: string) => string;
  nouvelOnglet: string;
  autresLangues: string;
  imprime: string;
  pages: (pages: string) => string;
  par: (auteur: string) => string;
  numero: (numero: string) => string;
  altToile: (nom: string) => string;
}

/** Traducteur de l'espace de noms « press » (getTranslations côté page, createTranslator en test) */
export type TraduirePresse = (cle: string, valeurs?: Record<string, string>) => string;

export function construireLibelles(t: TraduirePresse): LibellesPresse {
  const langues: Record<LanguePresse, string> = {
    fr: t("lang.fr"),
    en: t("lang.en"),
    it: t("lang.it"),
    zh: t("lang.zh"),
  };
  return {
    lire: t("read"),
    lireEn: (langue) => t("readIn", { language: langues[langue] }),
    nomDuLien: (invitation, titre) => t("linkLabel", { cta: invitation, title: titre }),
    nouvelOnglet: t("newTab"),
    autresLangues: t("otherLanguages"),
    imprime: t("print"),
    pages: (pages) => t("pages", { pages }),
    par: (author) => t("by", { author }),
    numero: (issue) => t("issue", { issue }),
    altToile: (name) => t("canvasAlt", { name }),
  };
}
