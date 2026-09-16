import type { Section } from './types';

/**
 * Order is the contract. Section numbers are the array index, zero-padded, so
 * the hero is 00 and Contact is 05 -- exactly as the artboard numbers them.
 * Adding a section here adds its nav entry, its scroll-spy target, its rail
 * numeral, and renumbers everything after it. Nothing else to edit.
 */
export const sections: Section[] = [
  { id: 'overview', label: 'Index', hiddenFromNav: true },
  { id: 'numbers', label: 'At a glance' },
  { id: 'work', label: 'Selected work' },
  { id: 'source', label: 'Open source' },
  { id: 'now', label: 'Now' },
  { id: 'contact', label: 'Contact' },
];
