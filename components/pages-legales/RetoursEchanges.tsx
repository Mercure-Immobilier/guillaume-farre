import Navigation from "@/components/navigation/Navigation";
import { Link } from "@/i18n/routing";
import type { PageRetours, Texte } from "@/lib/pages-legales/types";
import TexteLegal, { type ClassesDeTexte } from "./TexteLegal";

/**
 * Page Retours et échanges, présentée en cartes. Les classes reprennent celles que portait la page quand son
 * texte y était écrit en dur : le français servi garde ainsi son texte et son allure.
 */

const TEXTE: ClassesDeTexte = { lien: "text-primary hover:underline" };
// Dans les cartes de conditions, d'exceptions et de garantie, le gras ressort en couleur du texte principal
const TEXTE_DES_CARTES: ClassesDeTexte = { ...TEXTE, gras: "text-foreground" };
const TITRE_DE_SECTION = "text-2xl sm:text-3xl font-light mb-4 sm:mb-6";
const BOUTON = "inline-block px-8 sm:px-12 py-4 sm:py-5 font-light tracking-wide rounded-lg text-base sm:text-lg transition-all min-h-[48px]";

function CartePoints({ points, symbole, cadre }: { points: readonly Texte[]; symbole: string; cadre: string }) {
  return (
    <div className={`${cadre} rounded-xl p-4 sm:p-8 space-y-4`}>
      {points.map((point, i) => (
        <div key={i} className="flex items-start gap-3">
          <span className="text-2xl">{symbole}</span>
          <p className="text-muted-foreground">
            <TexteLegal texte={point} classes={TEXTE_DES_CARTES} />
          </p>
        </div>
      ))}
    </div>
  );
}

function EtapesDeRetour({ etapes }: { etapes: PageRetours["procedure"]["etapes"] }) {
  return (
    <div className="space-y-6">
      {etapes.map((etape, i) => (
        <div key={etape.titre} className="bg-muted/30 border border-border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">{i + 1}</span>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">{etape.titre}</h3>
              <p className="text-muted-foreground">
                <TexteLegal texte={etape.texte} classes={TEXTE} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CarteContact({ contact }: { contact: PageRetours["contact"] }) {
  return (
    <section className="bg-card border border-border rounded-xl p-4 sm:p-8 text-center">
      <h3 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6">{contact.titre}</h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">{contact.texte}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="mailto:contact@guillaumefarre.com" className={`${BOUTON} bg-black hover:bg-gray-900 text-white`}>
          📧 {contact.ecrire}
        </a>
        <Link href="/faq" className={`${BOUTON} border-2 border-border hover:border-primary text-foreground`}>
          📋 {contact.faq}
        </Link>
      </div>
    </section>
  );
}

export default function RetoursEchanges({ page }: { page: PageRetours }) {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-wide mb-8 sm:mb-12">{page.titre}</h1>
        {page.avertissement && (
          <p className="mb-8 border-l-2 border-border pl-4 text-sm italic text-muted-foreground">
            <TexteLegal texte={page.avertissement} classes={TEXTE} />
          </p>
        )}

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className={TITRE_DE_SECTION}>{page.delai.titre}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <TexteLegal texte={page.delai.texte} classes={TEXTE} />
            </p>
          </section>

          <section className="mb-12">
            <h2 className={TITRE_DE_SECTION}>{page.conditions.titre}</h2>
            <CartePoints points={page.conditions.points} symbole="✅" cadre="bg-card border border-border" />
          </section>

          <section className="mb-12">
            <h2 className={TITRE_DE_SECTION}>{page.procedure.titre}</h2>
            <EtapesDeRetour etapes={page.procedure.etapes} />
          </section>

          <section className="mb-12">
            <h2 className={TITRE_DE_SECTION}>{page.exceptions.titre}</h2>
            <CartePoints points={page.exceptions.points} symbole="❌" cadre="bg-red-500/5 border border-red-500/20" />
          </section>

          <section className="mb-12">
            <h2 className={TITRE_DE_SECTION}>{page.garantie.titre}</h2>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 sm:p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                <TexteLegal texte={page.garantie.texte} classes={TEXTE_DES_CARTES} />
              </p>
              <p className="text-sm text-muted-foreground mt-4">{page.garantie.precision}</p>
            </div>
          </section>

          <CarteContact contact={page.contact} />
        </div>
      </div>
    </main>
  );
}
