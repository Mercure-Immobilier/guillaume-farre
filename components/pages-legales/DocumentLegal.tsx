import Navigation from "@/components/navigation/Navigation";
import type { Bloc, DocumentLegal as Document } from "@/lib/pages-legales/types";
import TexteLegal, { type ClassesDeTexte, LignesLegales } from "./TexteLegal";

/**
 * Page légale en sections de texte suivi : CGV, mentions légales, politique de confidentialité.
 * Les classes reprennent celles que portaient ces pages quand leur texte y était écrit en dur : le français
 * servi garde ainsi son texte et son allure.
 */
export interface Habillage {
  conteneur: string;
  corps: string;
  avertissement: string;
  titreSection: string;
  texte: ClassesDeTexte;
  pied: string;
  texteDuPied: string;
}

/** CGV et mentions légales */
export const HABILLAGE_GRIS: Habillage = {
  conteneur: "container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl",
  corps: "prose prose-lg max-w-none space-y-6 text-gray-700",
  avertissement: "mb-8 border-l-2 border-gray-300 pl-4 text-sm italic text-gray-600",
  titreSection: "text-2xl font-bold text-gray-900 mb-4",
  texte: { lien: "text-blue-600 hover:underline" },
  pied: "border-t pt-6 mt-8",
  texteDuPied: "text-sm text-gray-600",
};

/** Politique de confidentialité */
export const HABILLAGE_THEME: Habillage = {
  conteneur: "container mx-auto px-4 py-12 max-w-4xl",
  corps: "prose prose-lg max-w-none space-y-6 text-muted-foreground",
  avertissement: "mb-8 border-l-2 border-border pl-4 text-sm italic text-muted-foreground",
  titreSection: "text-xl sm:text-2xl font-bold text-foreground mb-4",
  texte: { lien: "text-primary hover:underline" },
  pied: "border-t border-border pt-6 mt-8",
  texteDuPied: "text-sm text-muted-foreground",
};

function BlocLegal({ bloc, classes }: { bloc: Bloc; classes: ClassesDeTexte }) {
  if ("paragraphe" in bloc) {
    return (
      <p>
        <TexteLegal texte={bloc.paragraphe} classes={classes} />
      </p>
    );
  }
  if ("lignes" in bloc) {
    return (
      <p>
        <LignesLegales lignes={bloc.lignes} classes={classes} />
      </p>
    );
  }
  if ("liste" in bloc) {
    return (
      <ul className="list-disc pl-6 space-y-2">
        {bloc.liste.map((element, i) => (
          <li key={i}>
            <TexteLegal texte={element} classes={classes} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="bg-gray-50 p-4 border border-gray-300 mt-4">
      <h3 className="font-bold mb-2">{bloc.encadre.titre}</h3>
      <p className="text-sm">
        <LignesLegales lignes={bloc.encadre.lignes} classes={classes} />
      </p>
    </div>
  );
}

export default function DocumentLegal({ document, habillage }: { document: Document; habillage: Habillage }) {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className={habillage.conteneur}>
        <h1 className="text-2xl sm:text-4xl font-bold mb-8">{document.titre}</h1>
        {document.avertissement && (
          <p className={habillage.avertissement}>
            <TexteLegal texte={document.avertissement} classes={habillage.texte} />
          </p>
        )}

        <div className={habillage.corps}>
          {document.sections.map((section) => (
            <section key={section.titre}>
              <h2 className={habillage.titreSection}>{section.titre}</h2>
              {section.blocs.map((bloc, i) => (
                <BlocLegal key={i} bloc={bloc} classes={habillage.texte} />
              ))}
            </section>
          ))}

          <section className={habillage.pied}>
            <p className={habillage.texteDuPied}>
              <strong>{document.miseAJour.libelle}</strong> {document.miseAJour.date}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
