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
 * La vedette se lit comme une double page dès 1024 pixels : la toile à gauche, le texte à droite.
 * En dessous, la toile passe au-dessus du texte, en paysage sur tablette pour rester large.
 * Les cartes de la grille posent toujours la toile au-dessus du texte.
 */
const DISPOSITIONS: Record<VariantePresse, Disposition> = {
  vedette: {
    carte: "lg:grid lg:grid-cols-12 lg:items-center lg:gap-16",
    image: "lg:col-span-7",
    texte: "mt-8 sm:mt-10 md:max-w-2xl lg:col-span-5 lg:mt-0",
    ratio: "aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5]",
    sizes: "(min-width: 1200px) 640px, (min-width: 1024px) 58vw, 100vw",
  },
  grille: {
    carte: "",
    image: "",
    texte: "mt-6 sm:mt-8",
    ratio: "aspect-[4/3]",
    sizes: "(min-width: 1200px) 540px, (min-width: 768px) 50vw, 100vw",
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
