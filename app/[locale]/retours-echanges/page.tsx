import type { Metadata } from "next";
import { alternatesDePage } from "@/lib/adresses-de-page";
import RetoursEchanges from "@/components/pages-legales/RetoursEchanges";
import { RETOURS_ECHANGES, versionDe } from "@/lib/pages-legales";

/** Retours et échanges : textes dans lib/pages-legales/retours-echanges, une version par langue */

interface Parametres {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Parametres): Promise<Metadata> {
  const { locale } = await params;
  return { title: versionDe(RETOURS_ECHANGES, locale).titre, alternates: alternatesDePage(locale, "/retours-echanges") };
}

export default async function RetoursPage({ params }: Parametres) {
  const { locale } = await params;
  return <RetoursEchanges page={versionDe(RETOURS_ECHANGES, locale)} />;
}
