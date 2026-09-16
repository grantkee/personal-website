import type { MetadataRoute } from 'next';
import { content } from '@/content';

/* Metadata routes are Route Handlers, and under output: 'export' a handler has
   to declare that it is static or the build refuses to collect it. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${content.site.url}/sitemap.xml`,
    host: content.site.url,
  };
}
