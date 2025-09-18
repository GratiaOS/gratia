import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.gratia.space';
  const pages = [
    '',
    '/manifesto',
    '/protocols',
    '/protocols/splinters-gift',
    '/join',
    '/contribute',
  ];
  const now = new Date().toISOString();

  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.6,
  }));
}
