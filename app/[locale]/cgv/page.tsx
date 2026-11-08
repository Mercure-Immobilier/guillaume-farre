import type { Metadata } from "next";
import { alternatesDePage } from "@/lib/adresses-de-page";
import DocumentLegal, { HABILLAGE_GRIS } from "@/components/pages-legales/DocumentLegal";
import { CGV, versionDe } from "@/lib/pages-legales";

/** Conditions générales de vente : textes dans lib/pages-legales/cgv, une version par langue */

interface Parametres {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Parametres): Promise<Metadata> {
  const { locale } = await params;
  return { title: versionDe(CGV, locale).titre, alternates: alternatesDePage(locale, "/cgv") };
}

export default async function CGVPage({ params }: Parametres) {
  const { locale } = await params;
  return <DocumentLegal document={versionDe(CGV, locale)} habillage={HABILLAGE_GRIS} />;
}
