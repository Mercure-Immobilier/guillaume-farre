import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { carteTwitter } from '@/lib/carte-twitter';
import { alternatesDePage } from '@/lib/adresses-de-page';
import Navigation from '@/components/navigation/Navigation';
import { GalerieContent } from '@/components/galerie/GalerieContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.galerie' });
  const openGraph = {
    title: t('ogTitle'),
    description: t('ogDescription'),
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: t('ogAlt') }],
  };
  return {
    title: t('title'),
    description: t('description'),
    alternates: alternatesDePage(locale, '/galerie'),
    openGraph,
    twitter: carteTwitter(openGraph),
  };
}

/**
 * Page Galerie — photographies avec prix et lightbox
 * Fond ivoire texture, grille responsive, cadres americains
 * @author Lalou
 */
export default function GaleriePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <GalerieContent />
      </div>
    </main>
  );
}
