import type { LabeledRow } from './types';

export const intro =
  'Owns the GitHub engineering infrastructure of the Telcoin Association - public repositories under MIT and Apache 2.0, governed for collaboration, redistribution, and downstream adoption.';

/**
 * The fourth row is the one that matters: it is where this section stops being
 * assertion and becomes evidence, for the cost of a single row.
 */
export const rows: LabeledRow[] = [
  {
    label: 'Governance',
    body: 'Issue triage and pull-request lifecycle, branch and development policy, contributor standards, README and SECURITY.md documentation.',
  },
  {
    label: 'Access',
    body: 'Organization membership, repository permissions, tokens, authentication, and least-privilege access to critical development infrastructure.',
  },
  {
    label: 'Quality gates',
    body: 'GitHub Actions CI/CD, automated testing, build and validation pipelines, code review, and vulnerability management inside the development lifecycle.',
  },
  {
    label: 'Contribution',
    body: 'Wrote the hardware-wallet and transaction-simulation extensions to Safe Utils, the tool behind every Telcoin deployment, then handed the work to an engineer on the team to clean up, review, and carry upstream as their first open-source pull requests. Leaders build leaders: the same coaching has taken at least three more engineers through upstream contributions of their own.',
    links: [
      {
        label: 'Telcoin-Association/safe-utils',
        href: 'https://github.com/Recon-Fuzz/safe-utils/compare/main...Telcoin-Association:safe-utils:main',
      },
      { label: 'Recon-Fuzz/safe-utils #30', href: 'https://github.com/Recon-Fuzz/safe-utils/pull/30' },
      { label: 'Recon-Fuzz/safe-utils #31', href: 'https://github.com/Recon-Fuzz/safe-utils/pull/31' },
    ],
  },
  {
    label: 'Repositories',
    links: [
      {
        label: 'telcoin-network',
        href: 'https://github.com/Telcoin-Association/telcoin-network',
      },
      { label: 'tn-contracts', href: 'https://github.com/Telcoin-Association/tn-contracts' },
      { label: 'tel-v3', href: 'https://github.com/Telcoin-Association/tel-v3' },
      {
        label: 'tn-block-explorer-indexer',
        href: 'https://github.com/Telcoin-Association/tn-block-explorer-indexer',
      },
      {
        label: 'forge-deploy-utils',
        href: 'https://github.com/Telcoin-Association/forge-deploy-utils',
      },
      { label: 'tn-docs', href: 'https://github.com/Telcoin-Association/tn-docs' },
    ],
  },
];
