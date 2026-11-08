import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DocumentLegal, { HABILLAGE_GRIS } from "@/components/pages-legales/DocumentLegal";
import { CGV, versionDe } from "@/lib/pages-legales";
import { IMAGE_DU_SITE, metadonneesDePage, NOM_DU_SITE } from "@/lib/metadonnees-de-page";

/** Conditions générales de vente : textes dans lib/pages-legales/cgv, une version par langue */

interface Parametres {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Parametres): Promise<Metadata> {
  const { locale } = await params;
  const { titre, description } = versionDe(CGV, locale);
  const t = await getTranslations({ locale, namespace: "meta.site" });
  return metadonneesDePage(locale, "/cgv", {
    titre,
    description,
    titreDePartage: `${titre} | ${NOM_DU_SITE}`,
    descriptionDePartage: description,
    image: { ...IMAGE_DU_SITE, alt: t("ogAlt") },
  });
}

export default async function CGVPage({ params }: Parametres) {
  const { locale } = await params;
  return <DocumentLegal document={versionDe(CGV, locale)} habillage={HABILLAGE_GRIS} />;
}
