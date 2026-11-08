import { MetadataRoute } from 'next';
import { getWorksFromMetadata } from '@/lib/works';

/**
 * Sitemap.xml pour Google Search Console
 * Pages publiques en FR/EN/IT + pages produit avec images
 *
 * @author Lalou
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://guillaumefarre.com';

  const locales = ['fr', 'en', 'it'];

  const pages: { path: string; changeFrequency: 'daily' | 'weekly' | 'monthly'; priority: number }[] = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/galerie', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/toiles', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/presse', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/cgv', changeFrequency: 'monthly', priority: 0.3 },
    { path: '/mentions-legales', changeFrequency: 'monthly', priority: 0.3 },
    { path: '/politique-de-confidentialite', changeFrequency: 'monthly', priority: 0.3 },
    { path: '/retours-echanges', changeFrequency: 'monthly', priority: 0.3 },
  ];

  const urls: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of pages) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr${page.path}`,
            en: `${baseUrl}/en${page.path}`,
            it: `${baseUrl}/it${page.path}`,
          },
        },
      });
    }
  }

  // Fiches d'œuvres : les identifiants que sert app/[locale]/galerie-item/[slug], tirés de la même source qu'elle.
  // Le plan du site les tirait des noms de data/photos.json (« etna », « at-work ») auxquels aucune fiche ne répond :
  // ses 48 adresses de fiches servaient la page introuvable jusqu'au 8 novembre 2026.
  const works = await getWorksFromMetadata();
  for (const work of works) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/galerie-item/${work.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr/galerie-item/${work.slug}`,
            en: `${baseUrl}/en/galerie-item/${work.slug}`,
            it: `${baseUrl}/it/galerie-item/${work.slug}`,
          },
        },
        images: work.images.map((image) => `${baseUrl}${image}`),
      });
    }
  }

  return urls;
}

// Lalou
