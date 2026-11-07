// @vitest-environment node
/**
 * Une page qui déclare son openGraph déclare aussi sa carte Twitter : sans elle, la carte générale du gabarit
 * s'applique et le partage sur X montre le titre du site au lieu de celui de la page.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { carteTwitter } from "@/lib/carte-twitter";

const APP = path.resolve(__dirname, "../../app");

function fichiersDe(dossier: string): string[] {
  return fs.readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
    const chemin = path.join(dossier, entree.name);
    if (entree.isDirectory()) return fichiersDe(chemin);
    return /\.(ts|tsx)$/.test(entree.name) ? [chemin] : [];
  });
}

// Un fichier de métadonnées qui porte un openGraph sans porter de clé twitter. L'import de carte-twitter ne compte
// pas : il contient le mot sans déclarer la carte.
function openGraphSansCarte(source: string): boolean {
  return /\bopenGraph\b/.test(source) && !/\btwitter\s*[:,]/.test(source);
}

describe("carteTwitter", () => {
  it("reprend le titre, la description et l'image de l'openGraph", () => {
    const openGraph = {
      url: "/fr/presse",
      title: "Presse | Guillaume Farré",
      description: "Ce que la presse a écrit sur le travail de Guillaume Farré.",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Presse Guillaume Farré" }],
    };
    expect(carteTwitter(openGraph)).toEqual({
      card: "summary_large_image",
      title: "Presse | Guillaume Farré",
      description: "Ce que la presse a écrit sur le travail de Guillaume Farré.",
      images: [{ url: "/images/og-image.jpg", alt: "Presse Guillaume Farré" }],
    });
  });

  it("ne déclare aucune image quand l'openGraph n'en porte pas", () => {
    expect(carteTwitter({ title: "Atelier | Guillaume Farré", description: "Atelier" })).not.toHaveProperty("images");
  });
});

describe("cartes Twitter des pages", () => {
  const fichiers = fichiersDe(APP);

  it("témoin : le relevé lit les pages, dont celle de la presse", () => {
    expect(fichiers.some((f) => f.endsWith(path.join("presse", "page.tsx")))).toBe(true);
    expect(openGraphSansCarte("return { openGraph: { title } };")).toBe(true);
    expect(openGraphSansCarte('import { carteTwitter } from "@/lib/carte-twitter";\nreturn { openGraph };')).toBe(true);
    expect(openGraphSansCarte("return { openGraph, twitter: carteTwitter(openGraph) };")).toBe(false);
  });

  it("chaque fichier qui déclare un openGraph déclare sa carte Twitter", () => {
    const fautifs = fichiers
      .filter((f) => openGraphSansCarte(fs.readFileSync(f, "utf8")))
      .map((f) => path.relative(APP, f));
    expect(fautifs).toEqual([]);
  });
});
