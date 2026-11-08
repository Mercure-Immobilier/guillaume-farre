import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { carteTwitter } from "@/lib/carte-twitter";
import Navigation from "@/components/navigation/Navigation";
import HistoireContent from "@/components/pages/HistoireContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.histoire" });
  const openGraph = {
    title: t("ogTitle"),
    description: t("ogDescription"),
  };
  return {
    title: t("title"),
    description: t("description"),
    openGraph,
    twitter: carteTwitter(openGraph),
  };
}

/**
 * Page Histoire avec textes éditables en mode admin
 * Accès mode édition : ?admin=true
 *
 * @author Lalou
 * @date 2025-11-30
 */
export default function HistoirePage() {
  return (
    <main>
      <Navigation />
      <HistoireContent />
    </main>
  );
}
