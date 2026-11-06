import type { ArticlePresse } from "@/lib/presse";
import { contenuDeCarte } from "./contenu";
import ImageToile from "./ImageToile";
import TextePresse, { type VariantePresse } from "./TextePresse";
import type { LibellesPresse } from "./libelles";

interface Disposition {
  carte: string;
  image: string;
  texte: string;
  ratio: string;
  sizes: string;
}

/**
 * La vedette se lit comme une double page : la toile à gauche, le texte à droite dès 768 pixels.
 * Les cartes de la grille posent la toile au-dessus du texte.
 */
const DISPOSITIONS: Record<VariantePresse, Disposition> = {
  vedette: {
    carte: "md:grid md:grid-cols-12 md:items-center md:gap-10 lg:gap-16",
    image: "md:col-span-6 lg:col-span-7",
    texte: "mt-8 sm:mt-10 md:col-span-6 md:mt-0 lg:col-span-5",
    ratio: "aspect-[4/5]",
    sizes: "(min-width: 1152px) 620px, (min-width: 768px) 55vw, 100vw",
  },
  grille: {
    carte: "",
    image: "",
    texte: "mt-6 sm:mt-8",
    ratio: "aspect-[4/3]",
    sizes: "(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw",
  },
};

interface CartePresseProps {
  article: ArticlePresse;
  locale: string;
  libelles: LibellesPresse;
  variante: VariantePresse;
}

/** Carte d'un article : cliquable en entier quand l'article est en ligne, simple mention sinon */
export default function CartePresse({ article, locale, libelles, variante }: CartePresseProps) {
  const contenu = contenuDeCarte(article, locale, libelles);
  const disposition = DISPOSITIONS[variante];

  return (
    <article className={`group relative ${disposition.carte}`}>
      <div className={disposition.image}>
        <ImageToile
          src={contenu.toile.src}
          alt={contenu.toile.alt}
          ratio={disposition.ratio}
          sizes={disposition.sizes}
          prioritaire={variante === "vedette"}
          reactive={contenu.lien !== null}
        />
      </div>
      <div className={disposition.texte}>
        <TextePresse contenu={contenu} variante={variante} />
      </div>
    </article>
  );
}
