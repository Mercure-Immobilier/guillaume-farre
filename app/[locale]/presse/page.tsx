import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navigation from "@/components/navigation/Navigation";
import { articlesParDate, formaterDatePresse, type ArticlePresse, type LanguePresse } from "@/lib/presse";

/**
 * Page Presse : articles consacrés à Guillaume Farré, du plus récent au plus ancien.
 * Les données vivent dans lib/presse.ts ; cette page ne fait que les présenter.
 */

interface Libelles {
  lire: string;
  imprime: string;
  pages: (pages: string) => string;
  par: (auteur: string) => string;
  langue: Record<LanguePresse, string>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.press" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: t("ogAlt") }],
    },
  };
}

function LignePresse({ article, locale, libelles }: { article: ArticlePresse; locale: string; libelles: Libelles }) {
  const details = [
    formaterDatePresse(article.date, locale),
    article.auteur ? libelles.par(article.auteur) : null,
    article.pages ? `${libelles.imprime}, ${libelles.pages(article.pages)}` : null,
  ].filter(Boolean);

  return (
    <li className="py-8 sm:py-10">
      <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground font-light">{article.media}</p>
      {article.titre && (
        <h2 className="mt-3 text-xl sm:text-2xl font-light leading-snug text-foreground">{article.titre}</h2>
      )}
      <p className="mt-3 text-sm font-light text-muted-foreground">{details.join(" · ")}</p>
      {article.liens.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {article.liens.map((lien) => (
            <li key={lien.url}>
              <a
                href={lien.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:text-primary transition-colors"
              >
                {libelles.lire} ({libelles.langue[lien.langue]})
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default async function PressePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "press" });
  const libelles: Libelles = {
    lire: t("read"),
    imprime: t("print"),
    pages: (pages) => t("pages", { pages }),
    par: (author) => t("by", { author }),
    langue: { fr: t("lang.fr"), en: t("lang.en"), zh: t("lang.zh") },
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <section className="py-12 sm:py-24 md:py-32 border-b border-border">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-wide mb-6 sm:mb-8 text-foreground">
            {t("title")}
          </h1>
          <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">{t("intro")}</p>
        </div>
      </section>
      <section className="pb-16 sm:pb-24">
        <ol className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto divide-y divide-border">
          {articlesParDate().map((article) => (
            <LignePresse key={article.id} article={article} locale={locale} libelles={libelles} />
          ))}
        </ol>
      </section>
    </main>
  );
}
