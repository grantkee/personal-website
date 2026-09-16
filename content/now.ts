import type { Card } from './types';

/**
 * Six cards. Six divides cleanly by three and by two, so the grid steps
 * 3 -> 2 -> 1 without ever leaving an orphan row and its dangling rule.
 */
export const cards: Card[] = [
  {
    title: 'Production readiness',
    body: 'Carrying the network from architecture through audit, remediation, and launch - where protocol decisions turn into operational ones.',
  },
  {
    title: 'Engineering organization',
    body: 'Recruiting and directing senior engineers across Solidity, Rust and async Rust, Solana, protocol, backend, and front end, and staying hands-on alongside them.',
  },
  {
    title: 'Governance infrastructure',
    body: 'Snapshot voting strategies that let distributed token holders vote on Association matters, custom Uniswap v4 hooks that register participants for governance, and a DeFi router. Zero-knowledge privacy and on-chain agentic identity are at prototype.',
  },
  {
    title: 'Block explorer',
    body: 'An execution extension on an observer node that reindexes chain data in real time as blocks land, so the network is legible to developers and to anyone auditing it from outside.',
    proof: [{ label: 'testnet explorer', href: 'https://telscan.xyz/' }],
  },
  {
    title: 'Ecosystem adoption',
    body: 'Evaluating prospective partners and their technical requirements, meeting industry counterparts, and onboarding mobile developers and applications onto the network.',
    proof: [
      {
        label: 'ecosystem update from MWC 2025',
        href: 'https://x.com/telcoin/status/1897692300165120002?t=65',
      },
      {
        label: 'digital cash demo at MWC 2025',
        href: 'https://x.com/telcoin/status/1899523704394043746',
      },
    ],
  },
  {
    title: 'Reporting in public',
    body: 'Protocol updates to a global community meeting every two weeks, live and unscripted, plus continuous written and verbal reporting to Association council members.',
    proof: [
      {
        label: 'TEL Token Upgrade Proposal',
        href: 'https://www.youtube.com/watch?v=QJcR-D24f_M&t=1335s',
      },
      {
        label: 'live community update',
        href: 'https://www.youtube.com/watch?v=QJcR-D24f_M',
      },
    ],
  },
];
