import type { Content } from './types';
import { site } from './site';
import { sections } from './sections';
import { hero } from './hero';
import { rows as numberRows } from './numbers';
import { items as workItems } from './work';
import { intro as sourceIntro, rows as sourceRows } from './source';
import { cards as nowCards } from './now';
import { heading, links, colophon, backToTop } from './contact';

export const content = {
  site,
  sections,
  hero,
  numbers: { rows: numberRows },
  work: { items: workItems },
  source: { intro: sourceIntro, rows: sourceRows },
  now: { cards: nowCards },
  contact: { heading, links, colophon, backToTop },
} satisfies Content;

export type { Content } from './types';
export * from './types';
