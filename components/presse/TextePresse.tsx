import { LIEN_EXTERNE, type ContenuCarte, type LienVersion } from "./contenu";

export type VariantePresse = "vedette" | "grille";

const STYLES: Record<VariantePresse, { titre: string; extrait: string }> = {
  vedette: {
    titre: "mt-5 text-2xl leading-snug sm:text-3xl lg:text-4xl lg:leading-tight",
    extrait: "mt-6 text-base sm:text-lg lg:mt-8 lg:text-xl",
  },
  grille: {
    titre: "mt-4 text-xl leading-snug sm:text-2xl",
    extrait: "mt-5 text-base",
  },
};

/** Courbe des transitions de la carte ; la propriété arbitraire évite le conflit avec tailwindcss-animate */
const ACCELERATION = "motion-safe:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

/** Teinte du titre au survol ou au focus de la carte, coupée sous prefers-reduced-motion */
const TITRE_AU_SURVOL =
  "motion-safe:transition-colors motion-safe:duration-500 motion-safe:group-hover:text-primary motion-safe:group-focus-within:text-primary";

/** Le lien principal couvre toute la carte ; son contour de focus aussi */
const LIEN_ETIRE =
  "after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-offset-8 focus-visible:after:outline-primary";

/** Texte d'une carte : média, titre, extrait, date, invitation à lire, autres langues */
export default function TextePresse({ contenu, variante }: { contenu: ContenuCarte; variante: VariantePresse }) {
  const styles = STYLES[variante];
  return (
    <div>
      <p className="text-xs font-light uppercase tracking-[0.3em] text-muted-foreground">{contenu.media}</p>
      <h2
        lang={contenu.langueCitee ?? undefined}
        className={`${styles.titre} text-balance font-light tracking-wide text-foreground ${contenu.lien ? TITRE_AU_SURVOL : ""}`}
      >
        {contenu.titre}
      </h2>
      {contenu.citation && (
        <blockquote
          lang={contenu.citation.langue}
          cite={contenu.citation.source}
          className={`${styles.extrait} text-pretty font-light leading-relaxed text-foreground/80`}
        >
          <p>{contenu.citation.texte}</p>
        </blockquote>
      )}
      <p className="mt-6 text-sm font-light text-muted-foreground">
        <time dateTime={contenu.dateIso}>{contenu.dateLisible}</time>
        {contenu.mentions.map((mention) => (
          <span key={mention}> · {mention}</span>
        ))}
      </p>
      {contenu.lien && <LienPrincipal lien={contenu.lien} />}
      {contenu.autresLangues && <AutresLangues {...contenu.autresLangues} />}
    </div>
  );
}

function LienPrincipal({ lien }: { lien: LienVersion }) {
  return (
    <a
      href={lien.href}
      {...LIEN_EXTERNE}
      hrefLang={lien.langue}
      aria-label={lien.nomAccessible}
      className={`mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground ${LIEN_ETIRE}`}
    >
      <span
        className={`border-b border-foreground/30 pb-1 motion-safe:transition-colors motion-safe:duration-500 motion-safe:group-hover:border-primary ${ACCELERATION}`}
      >
        {lien.texte}
      </span>
      <span
        aria-hidden="true"
        className={`motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 ${ACCELERATION}`}
      >
        ↗
      </span>
    </a>
  );
}

/**
 * Rangée des autres langues, posée au-dessus du lien qui couvre la carte. Sa marge intérieure de
 * 12 pixels reste hors du lien étiré : un doigt posé à côté d'un lien de langue n'ouvre pas l'article
 * principal.
 */
const RANGEE_DES_LANGUES = "relative z-10 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 py-3";

/** Cible de 24 × 24 pixels au moins pour chaque lien de langue (règle 2.5.8 des WCAG 2.2) */
const CIBLE_DE_LANGUE = "inline-flex min-h-6 min-w-6 items-center justify-center px-1.5";

/** Les autres versions de l'article, chacune ouverte dans un nouvel onglet */
function AutresLangues({ libelle, liens }: { libelle: string; liens: LienVersion[] }) {
  return (
    <p className={`${RANGEE_DES_LANGUES} text-xs font-light text-muted-foreground`}>
      <span className="mr-1">{libelle}</span>
      {liens.map((lien) => (
        <a
          key={lien.href}
          href={lien.href}
          {...LIEN_EXTERNE}
          lang={lien.langue}
          hrefLang={lien.langue}
          aria-label={lien.nomAccessible}
          className={`${CIBLE_DE_LANGUE} underline decoration-border underline-offset-4 hover:text-foreground focus-visible:text-foreground`}
        >
          {lien.texte}
        </a>
      ))}
    </p>
  );
}
