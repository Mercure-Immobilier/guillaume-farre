import type { Metadata } from "next";
import { alternatesDePage } from "@/lib/adresses-de-page";
import DocumentLegal, { HABILLAGE_THEME } from "@/components/pages-legales/DocumentLegal";
import { POLITIQUE_DE_CONFIDENTIALITE, versionDe } from "@/lib/pages-legales";

/** Politique de confidentialité : textes dans lib/pages-legales/politique-de-confidentialite, une version par langue */

interface Parametres {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Parametres): Promise<Metadata> {
  const { locale } = await params;
  return { title: versionDe(POLITIQUE_DE_CONFIDENTIALITE, locale).titre, alternates: alternatesDePage(locale, "/politique-de-confidentialite") };
}

export default async function PolitiqueConfidentialitePage({ params }: Parametres) {
  const { locale } = await params;
  return <DocumentLegal document={versionDe(POLITIQUE_DE_CONFIDENTIALITE, locale)} habillage={HABILLAGE_THEME} />;
}
