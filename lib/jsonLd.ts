import type { Site } from '@/content/types';

/**
 * A @graph of three linked nodes rather than three loose objects:
 * ProfilePage -> mainEntity -> Person -> worksFor -> Organization.
 *
 * The links are what make this resolve as one entity. `sameAs` is the signal
 * that ties this page to the GitHub, LinkedIn, X, and forum accounts; without
 * it a search engine has four unconnected profiles and no reason to merge them.
 */
export function buildJsonLd(site: Site) {
  const personId = `${site.url}/#person`;
  const orgId = `${site.url}/#organization`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profilepage`,
        url: `${site.url}/`,
        name: `${site.name} — ${site.jobTitle}, ${site.organization}`,
        description: site.description,
        inLanguage: 'en',
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        url: `${site.url}/`,
        jobTitle: site.jobTitle,
        description: site.description,
        image: `${site.url}/avatar.webp`,
        sameAs: site.sameAs,
        knowsAbout: site.knowsAbout,
        worksFor: { '@id': orgId },
      },
      {
        '@type': 'Organization',
        '@id': orgId,
        name: site.organization,
        alternateName: site.organizationShort,
        parentOrganization: {
          '@type': 'Organization',
          name: site.parentOrganization,
        },
      },
    ],
  };
}
