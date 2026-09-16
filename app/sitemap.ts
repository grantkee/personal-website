import type { MetadataRoute } from 'next';
import { content } from '@/content';

/* Metadata routes are Route Handlers, and under output: 'export' a handler has
   to declare that it is static or the build refuses to collect it. */
export const dynamic = 'force-static';

/* Generated rather than committed to public/, so the domain comes from
   content.site and cannot drift from the canonical URL in the metadata. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${content.site.url}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
