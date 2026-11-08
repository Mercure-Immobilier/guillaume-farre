import type { Metadata } from "next";
import DocumentLegal, { HABILLAGE_GRIS } from "@/components/pages-legales/DocumentLegal";
import { MENTIONS_LEGALES, versionDe } from "@/lib/pages-legales";

/** Mentions légales : textes dans lib/pages-legales/mentions-legales, une version par langue */

interface Parametres {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Parametres): Promise<Metadata> {
  const { locale } = await params;
  return { title: versionDe(MENTIONS_LEGALES, locale).titre };
}

export default async function MentionsLegalesPage({ params }: Parametres) {
  const { locale } = await params;
  return <DocumentLegal document={versionDe(MENTIONS_LEGALES, locale)} habillage={HABILLAGE_GRIS} />;
}
