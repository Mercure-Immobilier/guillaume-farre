import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { carteTwitter } from "@/lib/carte-twitter";
import Navigation from "@/components/navigation/Navigation";
import ContactContent from "@/components/pages/ContactContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  const openGraph = {
    title: t("ogTitle"),
    description: t("ogDescription"),
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: t("ogAlt") }],
  };
  return {
    title: t("title"),
    description: t("description"),
    openGraph,
    twitter: carteTwitter(openGraph),
  };
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
