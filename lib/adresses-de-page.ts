import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/**
 * Adresse canonique et versions linguistiques d'une page publique.
 *
 * Next ne fusionne pas les blocs de métadonnées : une page qui déclare son bloc alternates remplace en entier celui
 * de app/[locale]/layout.tsx. Une page qui déclare son canonical redonne donc ses versions linguistiques. Les adresses
 * restent relatives : le metadataBase du gabarit les complète avec l'origine que reprend le plan du site.
 */

/**
 * Versions linguistiques déclarées par le gabarit, celles de l'accueil. Elles ne valent que pour les pages hors du
 * plan du site qui ne déclarent pas les leurs.
 */
export const VERSIONS_DU_GABARIT = {
  "fr-FR": "/fr",
  "en-US": "/en",
  "it-IT": "/it",
  "x-default": "/fr",
} as const;

/** Adresse d'une page dans une langue : « /fr » pour l'accueil, « /en/galerie » pour la galerie */
export function adresseDePage(langue: string, chemin: string): string {
  return `/${langue}${chemin}`;
}

/**
 * Bloc alternates d'une page : sa propre adresse pour canonical, avec l'adresse de la même page dans chaque langue.
 * x-default désigne la version française, langue par défaut du site.
 */
export function alternatesDePage(langue: string, chemin: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: adresseDePage(langue, chemin),
    languages: {
      ...Object.fromEntries(routing.locales.map((version) => [version, adresseDePage(version, chemin)])),
      "x-default": adresseDePage(routing.defaultLocale, chemin),
    },
  };
}
