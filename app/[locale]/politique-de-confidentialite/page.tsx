import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DocumentLegal, { HABILLAGE_THEME } from "@/components/pages-legales/DocumentLegal";
import { POLITIQUE_DE_CONFIDENTIALITE, versionDe } from "@/lib/pages-legales";
import { IMAGE_DU_SITE, metadonneesDePage, NOM_DU_SITE } from "@/lib/metadonnees-de-page";

/** Politique de confidentialité : textes dans lib/pages-legales/politique-de-confidentialite, une version par langue */

interface Parametres {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Parametres): Promise<Metadata> {
  const { locale } = await params;
  const { titre, description } = versionDe(POLITIQUE_DE_CONFIDENTIALITE, locale);
  const t = await getTranslations({ locale, namespace: "meta.site" });
  return metadonneesDePage(locale, "/politique-de-confidentialite", {
    titre,
    description,
    titreDePartage: `${titre} | ${NOM_DU_SITE}`,
    descriptionDePartage: description,
    image: { ...IMAGE_DU_SITE, alt: t("ogAlt") },
  });
}

export default async function PolitiqueConfidentialitePage({ params }: Parametres) {
  const { locale } = await params;
  return <DocumentLegal document={versionDe(POLITIQUE_DE_CONFIDENTIALITE, locale)} habillage={HABILLAGE_THEME} />;
}
