import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { IMAGE_DU_SITE, metadonneesDePage } from '@/lib/metadonnees-de-page';
import Navigation from '@/components/navigation/Navigation';
import { GalerieContent } from '@/components/galerie/GalerieContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.galerie' });
  return metadonneesDePage(locale, '/galerie', {
    titre: t('title'),
    description: t('description'),
    titreDePartage: t('ogTitle'),
    descriptionDePartage: t('ogDescription'),
    image: { ...IMAGE_DU_SITE, alt: t('ogAlt') },
  });
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
