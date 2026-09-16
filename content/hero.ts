import type { Hero } from './types';

export const hero: Hero = {
  name: 'Grant Kee',
  title: 'Director of Blockchain - Telcoin',

  /* The best sentence in the corpus. Left verbatim from the artboard. */
  lede: 'A settlement layer secured by mobile network operators, a token migrated onto it, and the engineering organization that ships both.',

  /* Four cells. Status leads: it answers the question the audience arrived
     with, and on a phone the first cell is the one that gets read. */
  meta: [
    {
      label: 'Status',
      body: 'Testnet live, validated by mobile network operators. Mainnet targeted Q4 2026.',
      asOf: 'September 2026',
    },
    {
      label: 'Mandate',
      body: 'Technology strategy and execution for the Telcoin Platform: development, deployment, security, and ongoing operation.',
    },
    {
      label: 'Stack owned',
      body: 'Blockchain infrastructure, on-chain contracts, off-chain reward systems, and the integrations mobile applications and developers build against.',
    },
    {
      label: 'Reports to',
      body: 'Council members of the nonprofit Telcoin Association, and a global community meeting held every two weeks. Holds a council seat representing validators and sits on the Treasury Council.',
    },
  ],
};
