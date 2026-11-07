import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { carteTwitter } from "@/lib/carte-twitter";
import Navigation from "@/components/navigation/Navigation";
import AtelierContent from "@/components/pages/AtelierContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.atelier" });
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

export default function AtelierPage() {
  return (
    <main>
      <Navigation />
      <AtelierContent />
    </main>
  );
}
