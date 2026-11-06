import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navigation from "@/components/navigation/Navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CartePresse from "@/components/presse/CartePresse";
import { construireLibelles } from "@/components/presse/libelles";
import { articlesParDate } from "@/lib/presse";

/**
 * Page Presse : l'article le plus récent en vedette, les suivants en grille.
 * Les données vivent dans lib/presse.ts ; cette page ne fait que les présenter.
 */

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

export default async function PressePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "press" });
  const libelles = construireLibelles((cle, valeurs) => t(cle, valeurs));
  const [vedette, ...suivants] = articlesParDate();

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <header className="px-4 pb-14 pt-16 text-center sm:pb-20 sm:pt-24 md:pb-24 md:pt-28">
        <h1 className="text-4xl font-light tracking-wide text-foreground sm:text-6xl md:text-7xl">{t("title")}</h1>
      </header>
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8 lg:pb-40">
        {vedette && (
          <ScrollReveal>
            <CartePresse article={vedette} locale={locale} libelles={libelles} variante="vedette" />
          </ScrollReveal>
        )}
        {suivants.length > 0 && (
          <div className="mt-20 grid gap-16 sm:mt-28 md:grid-cols-2 md:gap-10 lg:mt-36 lg:gap-16">
            {suivants.map((article, rang) => (
              <ScrollReveal key={article.id} delay={rang * 0.12}>
                <CartePresse article={article} locale={locale} libelles={libelles} variante="grille" />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
