import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { adresseDePage, alternatesDePage } from "@/lib/adresses-de-page";
import { carteTwitter } from "@/lib/carte-twitter";

/**
 * Métadonnées d'une page publique dans sa langue : titre, description, adresses, carte de partage (Open Graph) puis
 * carte Twitter tirée de la même carte.
 *
 * Le bloc openGraph d'une page remplace en entier celui du gabarit app/[locale]/layout.tsx : il redonne donc le nom
 * du site, le type puis la langue de la page (og:locale), que perdaient les pages dotées de leur propre carte.
 */

export const NOM_DU_SITE = "Guillaume Farré";

/** Image de partage du site, que reprennent les pages sans image propre */
export const IMAGE_DU_SITE = { url: "/images/og-image.jpg", width: 1200, height: 630 } as const;

/** Langue d'une page au format d'Open Graph */
const LOCALES_OPEN_GRAPH: Readonly<Record<string, string>> = { fr: "fr_FR", en: "en_US", it: "it_IT" };

export function localeOpenGraph(langue: string): string {
  return LOCALES_OPEN_GRAPH[langue] ?? LOCALES_OPEN_GRAPH[routing.defaultLocale];
}

/** Langues des autres versions de la page (og:locale:alternate) */
export function autresLocalesOpenGraph(langue: string): string[] {
  return routing.locales.filter((version) => version !== langue).map(localeOpenGraph);
}

export interface ImageDePartage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface TextesDePage {
  /** Titre de l'onglet, que complète le gabarit ; l'accueil n'en donne pas et garde le titre du site */
  titre?: string;
  /** Description de la page, qui peut développer celle de la carte de partage */
  description: string;
  titreDePartage: string;
  descriptionDePartage: string;
  image: ImageDePartage;
}

export function metadonneesDePage(langue: string, chemin: string, textes: TextesDePage): Metadata {
  const openGraph = {
    type: "website" as const,
    siteName: NOM_DU_SITE,
    locale: localeOpenGraph(langue),
    alternateLocale: autresLocalesOpenGraph(langue),
    url: adresseDePage(langue, chemin),
    title: textes.titreDePartage,
    description: textes.descriptionDePartage,
    images: [textes.image],
  };
  return {
    ...(textes.titre !== undefined && { title: textes.titre }),
    description: textes.description,
    alternates: alternatesDePage(langue, chemin),
    openGraph,
    twitter: carteTwitter(openGraph),
  };
}
