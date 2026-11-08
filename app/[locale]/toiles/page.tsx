import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { IMAGE_DU_SITE, metadonneesDePage } from "@/lib/metadonnees-de-page";
import Navigation from "@/components/navigation/Navigation";
import ToilesContent from "@/components/toiles/ToilesContent";
import { TOILES } from "@/lib/toiles-data";
import { getAccessLevel } from "@/lib/access";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.toiles" });
  return metadonneesDePage(locale, "/toiles", {
    titre: t("title"),
    description: t("description"),
    titreDePartage: t("ogTitle"),
    descriptionDePartage: t("ogDescription"),
    image: { ...IMAGE_DU_SITE, alt: t("ogAlt") },
  });
}

/**
 * Page Toiles
 * Accessible a tous. Le contenu s'adapte au niveau d'acces :
 * - normal/hidden : pas de prix, CTA = formulaire d'interet
 * - secret (VIP) : prix affiches, CTA = reservation
 *
 * @author Lalou
 */
export default async function ToilesPage() {
  const accessLevel = await getAccessLevel();
  const isVip = accessLevel === 'secret';

  return (
    <main className="min-h-screen">
      <Navigation />
      <ToilesContent toiles={TOILES} showPrices={isVip} />
    </main>
  );
}
