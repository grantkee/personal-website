import type { Site } from '@/content/types';

/**
 * A @graph of two linked nodes rather than two loose objects:
 * ProfilePage -> mainEntity -> Person. The employers are inlined on the
 * Person as `worksFor` and the Association as `memberOf`, so nothing here
 * needs a third node to resolve against.
 *
 * The links are what make this resolve as one entity. `sameAs` is the signal
 * that ties this page to the GitHub, LinkedIn, X, and forum accounts; without
 * it a search engine has four unconnected profiles and no reason to merge them.
 */
export function buildJsonLd(site: Site) {
  const personId = `${site.url}/#person`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profilepage`,
        url: `${site.url}/`,
        name: `${site.name} - ${site.jobTitle}, ${site.organization}`,
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
        sameAs: site.sameAs,
        knowsAbout: site.knowsAbout,
        worksFor: site.worksFor.map((org) => ({
          '@type': 'Organization',
          name: org.name,
          ...(org.parentOrganization
            ? { parentOrganization: { '@type': 'Organization', name: org.parentOrganization } }
            : {}),
        })),
        memberOf: { '@type': 'Organization', name: site.memberOf },
      },
    ],
  };
}
