import type { Metadata } from "next";

/**
 * Adresse canonique et versions linguistiques d'une page publique.
 *
 * Next ne fusionne pas les blocs de métadonnées : une page qui déclare son bloc alternates remplace en entier celui
 * de app/[locale]/layout.tsx. Une page qui déclare son canonical redonne donc ses versions linguistiques. Les adresses
 * restent relatives : le metadataBase du gabarit les complète avec l'origine que reprend le plan du site.
 */

/** Versions linguistiques déclarées par le gabarit, reprises telles quelles par les pages qui déclarent leur canonical */
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

/** Bloc alternates d'une page : sa propre adresse pour canonical, avec ses versions linguistiques */
export function alternatesDePage(langue: string, chemin: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: adresseDePage(langue, chemin),
    languages: { ...VERSIONS_DU_GABARIT },
  };
}
