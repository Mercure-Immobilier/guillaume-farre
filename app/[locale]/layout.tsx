import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { routing } from '@/i18n/routing';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import AdminWrapper from '@/components/admin/AdminWrapper';
import ClientShell from '@/components/ClientShell';
import { VERSIONS_DU_GABARIT } from '@/lib/adresses-de-page';
import { carteTwitter } from '@/lib/carte-twitter';
import { autresLocalesOpenGraph, IMAGE_DU_SITE, localeOpenGraph, NOM_DU_SITE } from '@/lib/metadonnees-de-page';
import "./globals.css";

// SEO - Décisions audit 2025-01-20. Les textes suivent la langue de la page (messages, meta.site) : les pages qui ne
// déclarent pas les leurs les héritent. La carte de partage n'a pas d'adresse : le gabarit ignore le chemin de la page.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const langue = (routing.locales as readonly string[]).includes(locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: langue, namespace: "meta.site" });
  const openGraph = {
    type: "website" as const,
    locale: localeOpenGraph(langue),
    alternateLocale: autresLocalesOpenGraph(langue),
    siteName: NOM_DU_SITE,
    title: t("ogTitle"),
    description: t("description"),
    images: [{ ...IMAGE_DU_SITE, alt: t("ogAlt") }],
  };
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://guillaumefarre.com'),
    title: {
      default: NOM_DU_SITE,
      template: `%s | ${NOM_DU_SITE}`,
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    icons: {
      icon: "/favicon.svg",
    },
    authors: [{ name: NOM_DU_SITE }],
    creator: NOM_DU_SITE,
    publisher: NOM_DU_SITE,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph,
    twitter: carteTwitter(openGraph),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Aucun canonical ici : chaque page déclare le sien (lib/adresses-de-page.ts). Celui de la racine, hérité par toutes,
    // désignait l'accueil comme l'original de chacune.
    alternates: {
      languages: { ...VERSIONS_DU_GABARIT },
    },
    verification: {
      // Lalou: Codes a remplacer avec vrais codes depuis Google/Bing Search Console
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
      other: {
        bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  // VIP visitors get a stripped-down layout (no footer, no overlays)
  const cookieStore = await cookies();
  const isVipVisitor = !!cookieStore.get('gf_vip') && !cookieStore.get('gf_auth')?.value;
  const isPreLaunch = process.env.SITE_MODE === 'pre-launch';

  return (
    <html lang={locale}>
      <head>
        <StructuredData type="organization" />
        <StructuredData type="website" />
      </head>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
            <AdminWrapper>
              <ClientShell isVipVisitor={isVipVisitor}>
                {children}
              </ClientShell>
              {!isVipVisitor && !isPreLaunch && <Footer />}
            </AdminWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
