import type { WorkItem } from './types';

/**
 * Six articles. Six is the scroll ceiling before "Selected" stops meaning
 * anything. Numbers come from array position, so reordering renumbers.
 *
 * Each article is layered: `lead` is the plain-language claim and carries the
 * item on its own; `detail` is the technical answer for a reader who wants one.
 */
export const items: WorkItem[] = [
  {
    kicker: 'TEL upgrade & migration',
    title: 'Moved a live token onto its own Layer 1',
    lead: 'Architected and executed the TEL upgrade across Ethereum, Polygon PoS, and Base, landing the new contract at one address on every network.',
    detail:
      'A non-standard ERC-20 with two-decimal precision, deployed on Ethereum in 2017 and carried to Polygon PoS and Base over native bridges, became a single eighteen-decimal token holding total supply parity at 100 billion. CREATE3 with a mined salt put it at the same address on every chain. Migration runs in two phases, a time-bounded minting window and then a one-way reserve vault for the long tail, so a holder who arrives late still converts at parity. Authored the improvement proposal that carried the upgrade through decentralized governance, and answered questions on the record throughout its review.',
    tags: ['CREATE3', 'Two-phase migration', 'TelIP · TGIP', 'LayerZero OFT'],
    proof: [
      {
        label: 'the improvement proposal',
        href: 'https://forum.telcoin.org/t/telip-the-tel-token-upgrade/847',
      },
    ],
  },

  {
    kicker: 'Telcoin Network',
    title: 'Built a blockchain secured by mobile carriers',
    lead: 'Leads architecture and development of an EVM Layer 1 whose validator set is drawn from GSMA mobile network operators and from nowhere else.',
    detail:
      'Byzantine fault tolerant consensus paired with EVM execution, with the consensus layer kept agnostic to the execution environment so more than one can run against it and scale horizontally. Parallel fee lanes give the network a quality-of-service dimension rather than one undifferentiated gas market, and custom precompiles expose protocol operations to contracts directly. Directs protocol engineering across consensus, execution, networking, data availability, and validator infrastructure, alongside a block explorer built as an execution extension that reindexes chain data as blocks land.',
    tags: ['BFT consensus', 'EVM execution', 'Rust', 'Precompiles'],
    proof: [
      {
        label: 'the protocol repository',
        href: 'https://github.com/Telcoin-Association/telcoin-network',
      },
    ],
  },

  {
    kicker: 'Deployment architecture',
    title: 'Took single hardware keys out of the critical path',
    lead: 'Designed a multisignature deployment model around a specific failure: a developer leaves, and the organization has to export an EOA private key to keep control of its own contracts.',
    detail:
      'Led engineers to a standardized workflow on Safe multisig wallets and CREATE3. Contracts land at deterministic addresses across EVM networks and are owned by the safe from their first transaction, so ownership never has to be moved off an individual deployer afterward. Transactions are simulated and verified with Safe Utils before any signature is collected, and the tooling the team wrote for that requirement went back upstream to the project. Signature thresholds and signer distribution are designed so that no individual key holder can act alone.',
    tags: ['Safe multisig', 'CREATE3', 'Hardware custody', 'Deterministic deploys'],
    proof: [
      {
        label: 'the shared deployment utilities',
        href: 'https://github.com/Telcoin-Association/forge-deploy-utils',
      },
    ],
  },

  {
    kicker: 'Security program',
    title: 'Made adversaries part of the process',
    lead: 'Owns vulnerability discovery across competitive research, third-party audits, internal review, and continuous monitoring.',
    detail:
      'Ran a four-week open competition on Cantina with a $110,000 reward pool against the protocol and its contracts, and funded a dedicated researcher for the full duration alongside it. Audit and remediation cycles gate production: scope ships once its security milestone is met, and the schedule moves before the milestone does. Designed incident-response controls that sit behind an authority separate from deployment and are deliberately asymmetric — pausing is fast, restoring is not.',
    tags: ['Cantina', 'Spearbit', 'Trail of Bits', 'Hacken'],
    proof: [
      {
        label: 'the competition',
        href: 'https://cantina.xyz/competitions/26d5255b-6f68-46cf-be55-81dd565d9d16',
      },
      {
        label: 'a published report',
        href: 'https://github.com/Telcoin-Association/tel-v3/blob/main/audit/report-cantinacode-telcoin-V3-1025.pdf',
      },
    ],
  },

  {
    kicker: 'Omnichain Settlement Protocol',
    title: 'Built settlement that leaves mint authority with the issuer',
    lead: 'Directs a private network of signing nodes that monitors and attests cross-chain transfers across EVM networks and Solana.',
    detail:
      'The requirement comes from eUSD, a stablecoin issued by Telcoin Digital Asset Bank under a Nebraska digital asset depository charter, whose issuer is required to remain the only mint and burn authority. That rules out a standard lock-and-mint bridge, which puts exactly that authority into a bridge contract. Nodes observe both sides of a transfer and sign attestations the issuer’s own contracts act on, so the settlement path carries the message while the right to create and destroy supply stays where regulation requires it. The Solana side adds a Token-2022 peg stability vault: a flat one-to-one exchange between eUSD and USDC with no curve, so arbitrage closes a peg gap without paying the spread a bonding curve would impose.',
    tags: ['EVM · Solana', 'Attestation network', 'Token-2022', 'eUSD'],
    proof: [
      {
        label: 'reviewed by Trail of Bits',
        href: 'https://github.com/trailofbits/publications/blob/master/reviews/2026-06-telcoin-solanapegstabilityvault-securityreview.pdf',
      },
      { label: 'the issuing bank', href: 'https://bank.telco.in/' },
    ],
  },

  {
    kicker: 'Interoperability',
    title: 'Treated bridge selection as a security decision',
    lead: 'Owns cross-chain interoperability architecture. A bridge has no reversible exit once assets are in flight, so selection runs as a research process against fixed criteria rather than a vendor comparison.',
    detail:
      'Criteria cover the trust model, who controls the verifier set, where upgrade authority sits, the failure modes available to an attacker, and how the code has behaved under adversarial conditions. A first selection was reversed in December 2025 after public events changed the risk assessment. A later public event touching the chosen provider was run through the same criteria and did not change the answer, which is the point of holding criteria rather than headlines. The integration runs on LayerZero today, with a verifier mesh specified for client, infrastructure, and organizational diversity so that no single bug, outage, or compromised entity can verify a message on its own, and a native bridge adapter that lets Telcoin Network account for TEL originating on external networks.',
    tags: ['LayerZero', 'Native bridge adapter', 'Verifier mesh', 'Trust model review'],
    proof: [
      {
        label: 'the verifier mesh specification',
        href: 'https://github.com/Telcoin-Association/tel-v3/blob/main/docs/custom-dvn-mesh.md',
      },
    ],
  },
];
