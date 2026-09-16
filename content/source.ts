import type { LabeledRow } from './types';

export const intro =
  'Owns the GitHub engineering infrastructure of the Telcoin Association — public repositories under MIT and Apache 2.0, governed for collaboration, redistribution, and downstream adoption.';

/**
 * The fifth row is the one that matters: it is where this section stops being
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
    body: 'Deployment utilities built for internal requirements went back into Safe Utils upstream, adding transaction simulation for anyone deploying the same way.',
    links: [
      { label: 'Recon-Fuzz/safe-utils #30', href: 'https://github.com/Recon-Fuzz/safe-utils/pull/30' },
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
        label: 'telcoin-explorer',
        href: 'https://github.com/Telcoin-Association/telcoin-explorer',
      },
      {
        label: 'forge-deploy-utils',
        href: 'https://github.com/Telcoin-Association/forge-deploy-utils',
      },
      { label: 'tn-docs', href: 'https://github.com/Telcoin-Association/tn-docs' },
    ],
  },
];
