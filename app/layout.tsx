import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Archivo } from 'next/font/google';
import { content } from '@/content';
import { buildJsonLd } from '@/lib/jsonLd';
import { Nav } from '@/components/Nav';
import { SkipLink } from '@/components/SkipLink';
import { RevealObserver } from '@/components/RevealObserver';
import '@/styles/globals.css';

const { site } = content;

/* Self-hosted at build time. This removes the render-blocking request to
   fonts.googleapis.com and the flash of unstyled text that the canvas
   runtime's document.fonts.ready handler existed to paper over. */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  /* Non-negotiable. Without it, Open Graph image URLs are emitted relative,
     LinkedIn drops the card entirely, and localhost:3000 leaks into the
     production sitemap. */
  metadataBase: new URL(site.url),
  title: `${site.name} - ${site.jobTitle}, ${site.organization}`,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  /* No `keywords`. Zero ranking value since 2009, and it reads as amateur to
     anyone who views source -- which, for this audience, is a real risk. */
  openGraph: {
    type: 'profile',
    firstName: 'Grant',
    lastName: 'Kee',
    username: 'grantkee',
    title: `${site.name} - ${site.jobTitle}, ${site.organization}`,
    description: site.description,
    url: site.url,
    siteName: site.domain,
    locale: 'en_US',
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name}, ${site.jobTitle}, ${site.organization}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} - ${site.jobTitle}, ${site.organization}`,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={archivo.className}>
      <body>
        {/* Runs before anything below it is parsed, so before first paint.
            The hiding rule for [data-reveal] is scoped to this class: without
            it, a JavaScript failure or a reader with JavaScript off would be
            left with 22 permanently invisible elements on a static page whose
            whole job is to be read. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-reveal')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(site)) }}
        />
        <SkipLink />
        <Nav sections={content.sections} />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
