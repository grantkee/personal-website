import type { Site } from './types';

export const site: Site = {
  url: 'https://grantkee.com',
  domain: 'grantkee.com',
  name: 'Grant Kee',
  jobTitle: 'Director of Blockchain',
  organization: 'Telcoin',
  worksFor: [
    { name: 'Telcoin Holdings' },
    { name: 'Telcoin Autonomous Operations', parentOrganization: 'Telcoin Association' },
  ],
  memberOf: 'Telcoin Association',
  description:
    'Director of Blockchain at Telcoin. Owns technology strategy and execution for the Telcoin Platform: leads the engineering organization building Telcoin Network, a Layer 1 validated by GSMA mobile network operators, and led the TEL token upgrade across Ethereum, Polygon PoS, and Base.',
  ogImage: '/og.png',

  /* sameAs is the entity-resolution signal: it is how a search engine decides
     that this page, the GitHub account, and the forum account are one person. */
  sameAs: [
    'https://github.com/grantkee',
    'https://www.linkedin.com/in/grantkee/',
    'https://x.com/9rantkee',
    'https://forum.telcoin.org/u/grantkee',
  ],

  knowsAbout: [
    'Blockchain protocol engineering',
    'Byzantine fault tolerant consensus',
    'EVM execution',
    'Smart contract security',
    'Cross-chain interoperability',
    'Stablecoin settlement',
    'Engineering leadership',
  ],
};
