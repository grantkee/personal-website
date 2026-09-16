/* ============================================================================
   Content types.

   Content is typed data, never JSX. Three deliberate omissions keep expansion
   cheap -- the backlog holds roughly 25 more items, all of which are additions
   to `work.items` or `now.cards`, and none of which should touch a component:

   1. No `index: '01'` field. Section numbers and work-item numbers derive from
      array position, so adding or reordering renumbers everything for free.
      (This is why tsconfig sets noUncheckedIndexedAccess.)
   2. No nav array. The nav is `sections.filter(s => !s.hiddenFromNav)`, so one
      edit adds a section, its nav entry, its scroll-spy target and its number.
   3. No markup in strings. Emphasis is structural -- `lead` against `detail`,
      `label` against `body` -- which keeps dangerouslySetInnerHTML out of the
      content path entirely.
   ========================================================================= */

export type Href = `https://${string}` | `mailto:${string}` | `#${string}`;

/**
 * A link is evidence, never navigation: each one attaches to the claim it
 * proves. `label` is the visible text and must describe the target, not the
 * act of clicking -- never "Learn more".
 *
 * Rule that outranks all of this: never link a claim the target does not
 * support. A forum homepage linked to prove a specific number is worse than no
 * link, because a diligence reader follows it, finds nothing, and revises their
 * read of the entire page.
 */
export interface Proof {
  label: string;
  href: Href;
}

export interface Section {
  /** Anchor id. Also the scroll-spy target and the nav href fragment. */
  id: string;
  /** Rail heading and nav label. */
  label: string;
  /** Kept out of the nav pill but still numbered and still a scroll target. */
  hiddenFromNav?: boolean;
}

export interface MetaCell {
  label: string;
  body: string;
  /** Rendered as an "as of" stamp. Only for claims that go stale. */
  asOf?: string;
}

export interface Hero {
  name: string;
  title: string;
  lede: string;
  meta: MetaCell[];
  avatar: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

/**
 * A ledger row. `proof` links a phrase inside the explanation and never the
 * numeral -- a 36px display numeral carrying a 2px underline looks broken.
 */
export interface StatRow {
  value: string;
  explanation: string;
  proof?: Proof;
}

export interface WorkItem {
  title: string;
  kicker: string;
  /** Plain-language claim. Carries the article on its own. */
  lead: string;
  /** Technical detail beneath the lead. */
  detail: string;
  tags: string[];
  /**
   * Normally one. The security article carries two -- a competition page and a
   * published report -- because that is where a skeptical reader pushes
   * hardest. An array rather than a single `href` so the second one does not
   * need a component change, and so each link can carry its own label.
   */
  proof?: Proof[];
}

export interface LabeledRow {
  label: string;
  body?: string;
  /** Flush-left list of linked names. This is what turns assertion into evidence. */
  links?: Proof[];
}

export interface Card {
  title: string;
  body: string;
  proof?: Proof;
}

export interface ContactLink {
  label: string;
  /** Displayed text. Must match where the href actually goes. */
  value: string;
  href: Href;
}

export interface Site {
  /** No trailing slash. Feeds metadataBase, the sitemap, and the JSON-LD @id. */
  url: `https://${string}`;
  domain: string;
  name: string;
  jobTitle: string;
  organization: string;
  organizationShort: string;
  parentOrganization: string;
  description: string;
  ogImage: string;
  /** Entity-resolution signal for JSON-LD `sameAs`. */
  sameAs: Href[];
  knowsAbout: string[];
}

export interface Content {
  site: Site;
  sections: Section[];
  hero: Hero;
  numbers: { intro?: string; rows: StatRow[] };
  work: { items: WorkItem[] };
  source: { intro: string; rows: LabeledRow[] };
  now: { cards: Card[] };
  contact: {
    heading: string;
    links: ContactLink[];
    colophon: string;
    backToTop: string;
  };
}
