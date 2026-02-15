import { MetadataRoute } from 'next';
import { i18n } from '@/i18n/config';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const routes = ['', '/create', '/join'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add root URL (redirects to default lang)
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  });

  // Add localized URLs
  i18n.locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemap;
}
