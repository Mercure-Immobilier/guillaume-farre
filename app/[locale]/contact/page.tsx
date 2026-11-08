import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { IMAGE_DU_SITE, metadonneesDePage } from "@/lib/metadonnees-de-page";
import Navigation from "@/components/navigation/Navigation";
import ContactContent from "@/components/pages/ContactContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return metadonneesDePage(locale, "/contact", {
    titre: t("title"),
    description: t("description"),
    titreDePartage: t("ogTitle"),
    descriptionDePartage: t("ogDescription"),
    image: { ...IMAGE_DU_SITE, alt: t("ogAlt") },
  });
}

/**
 * Page Contact avec textes éditables en mode admin
 * Accès mode édition : ?admin=true
 *
 * @author Lalou
 * @date 2025-12-31
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ContactContent />
    </main>
  );
}
