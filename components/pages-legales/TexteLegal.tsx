import { Fragment } from "react";
import { Link } from "@/i18n/routing";
import type { Morceau, Texte } from "@/lib/pages-legales/types";

/** Classes des liens et des passages en gras, propres à chaque page */
export interface ClassesDeTexte {
  lien: string;
  gras?: string;
}

function MorceauLegal({ morceau, classes }: { morceau: Morceau; classes: ClassesDeTexte }) {
  if (typeof morceau === "string") return <>{morceau}</>;
  if ("gras" in morceau) return <strong className={classes.gras}>{morceau.gras}</strong>;
  if ("lien" in morceau) {
    return (
      <Link href={morceau.vers} locale={morceau.langue} className={classes.lien}>
        {morceau.lien}
      </Link>
    );
  }
  if ("lienExterne" in morceau) {
    return (
      <a href={morceau.vers} className={classes.lien} target="_blank" rel="noopener noreferrer">
        {morceau.lienExterne}
      </a>
    );
  }
  if ("courriel" in morceau) {
    return (
      <a href={`mailto:${morceau.courriel}`} className={classes.lien}>
        {morceau.courriel}
      </a>
    );
  }
  return <code>{morceau.code}</code>;
}

export default function TexteLegal({ texte, classes }: { texte: Texte; classes: ClassesDeTexte }) {
  if (typeof texte === "string") return <>{texte}</>;
  return (
    <>
      {texte.map((morceau, i) => (
        <MorceauLegal key={i} morceau={morceau} classes={classes} />
      ))}
    </>
  );
}

/** Lignes d'un même paragraphe, séparées par un retour à la ligne */
export function LignesLegales({ lignes, classes }: { lignes: readonly Texte[]; classes: ClassesDeTexte }) {
  return (
    <>
      {lignes.map((ligne, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <TexteLegal texte={ligne} classes={classes} />
        </Fragment>
      ))}
    </>
  );
}
