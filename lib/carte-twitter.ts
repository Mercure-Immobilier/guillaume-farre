import type { Metadata } from "next";

/**
 * Carte Twitter (X) tirée de l'openGraph d'une page.
 *
 * Next ne fusionne pas les blocs de métadonnées : une page qui déclare son openGraph sans déclarer sa carte Twitter
 * hérite de la carte générale de app/[locale]/layout.tsx, si bien que le partage sur X montrait le titre général du
 * site au lieu de celui de la page. Tirée du même objet, la carte reprend le titre, la description et l'image de
 * l'openGraph, dans la langue de la page.
 */
interface ImageDePartage {
  url: string;
  alt?: string;
}

interface OpenGraphDePage {
  title: string;
  description: string;
  images?: ImageDePartage[];
}

export function carteTwitter(openGraph: OpenGraphDePage): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: openGraph.title,
    description: openGraph.description,
    ...(openGraph.images && { images: openGraph.images.map(({ url, alt }) => ({ url, alt })) }),
  };
}
