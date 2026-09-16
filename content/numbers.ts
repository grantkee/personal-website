import type { StatRow } from './types';

/**
 * Seven rows, sequenced to answer one question at a time:
 * is it real -> who secures it -> who builds it -> what is fixed ->
 * what got consolidated -> what is controlled -> who approves the money.
 *
 * `proof` links a phrase inside the explanation. It never links the numeral --
 * a 36px display numeral carrying a 2px underline looks like a rendering bug.
 */
export const rows: StatRow[] = [
  {
    value: 'Q4 2026',
    explanation:
      'Targeted mainnet launch for Telcoin Network. The testnet has been live through coordinated fork upgrades, a faucet, and bridge integration, and is producing blocks today.',
    proof: { label: 'producing blocks today', href: 'https://telscan.xyz/' },
  },
  {
    value: 'GSMA',
    explanation:
      'Membership of the GSMA gates the validator set by protocol design, with no other route in. Mobile network operators are validating the live testnet now.',
  },
  {
    value: '1 → 8',
    explanation:
      'Engineering organization, from one person to eight. Senior engineers across Solidity, Rust and async Rust, Solana, protocol, backend, and front end, with contractors on defined scopes.',
  },
  {
    value: '100B',
    explanation:
      'Fixed TEL supply cap, preserved exactly through the upgrade from a two-decimal token to an eighteen-decimal one. Telcoin Network holds canonical supply, so no other network can mint without an equivalent amount locked on the Layer 1. The cap is checkable at the contract.',
    proof: {
      label: 'checkable at the contract',
      href: 'https://etherscan.io/token/0x7E13B43065380aCdeC1c2d138c579cbBbafA0731',
    },
  },
  {
    value: '3 → 1',
    explanation:
      'TEL reached Ethereum in 2017 and travelled to Polygon PoS and Base over native bridges, leaving three separate representations. The standardized token holds one address on all three.',
    proof: { label: 'one address on all three', href: 'https://tel3.telcoin.network/' },
  },
  {
    value: 'Zero',
    explanation:
      'Production contracts deployed from a single key. Every one ships through a multisig safe under distributed hardware custody, and is owned by that safe from its first transaction.',
  },
  {
    value: 'TELIP-Y3',
    explanation:
      'The operating budget for mainnet launch, written up in public, debated in public, and approved by token-holder governance before a line of it was spent.',
    proof: {
      label: 'approved by token-holder governance',
      href: 'https://forum.telcoin.org/t/telip-y3-tel-allocation-for-mainnet-launch-establishing-the-telecom-blockchain-standard/830',
    },
  },
];
